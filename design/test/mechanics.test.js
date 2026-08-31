import test from 'node:test';
import assert from 'node:assert/strict';

import * as M from '../lib/rules.js';
import { critChance, expectedDamage, damage, TUNING } from '../lib/damage.js';

const CRIT = M.mechanicsData.crit;

// ---------------------------------------------------------------------------
// Crit chance (SPEC.md section 4.2)
// ---------------------------------------------------------------------------

test('crit chance is 5% at level 1 and 15% at level 60', () => {
  assert.equal(critChance(1), 0.05);
  assert.equal(critChance(60), 0.15);
});

test('crit chance stops climbing at the cap, it does not keep rising to 99', () => {
  for (const l of [60, 70, 85, 99]) {
    assert.equal(critChance(l), CRIT.maxChance, `L${l}`);
  }
});

test('crit chance rises monotonically up to the cap', () => {
  for (let l = 2; l <= CRIT.capLevel; l++) {
    assert.ok(critChance(l) > critChance(l - 1), `L${l} did not beat L${l - 1}`);
  }
});

test('crit chance is never outside 0..1, however large the bonus', () => {
  assert.equal(critChance(50, 5), 1);
  assert.equal(critChance(50, -5), 0);
  for (const l of [1, 30, 60, 99]) {
    const c = critChance(l);
    assert.ok(c >= 0 && c <= 1);
  }
});

test('move and ability bonuses add to the chance', () => {
  assert.ok(Math.abs(critChance(30, 0.1) - (critChance(30) + 0.1)) < 1e-9);
});

test('bad levels are rejected', () => {
  for (const bad of [0, 100, 1.5, '30', null]) {
    assert.throws(() => critChance(bad), M.SpecError);
  }
});

test('chance and damage are separate knobs', () => {
  // The design says moves and abilities modify crit chance OR crit damage.
  // Changing one must not move the other.
  const before = critChance(40);
  const old = TUNING.CRIT;
  TUNING.CRIT = 2.5;
  assert.equal(critChance(40), before);
  TUNING.CRIT = old;
});

test('expected damage sits between a clean hit and a crit', () => {
  const o = {
    power: 60, atk: 99, def: 91,
    moveType: 'Fire', attackerTypes: 'Fire', defenderTypes: 'Earth',
  };
  const plain = damage({ ...o, crit: false });
  const crit = damage({ ...o, crit: true });
  const exp = expectedDamage(o, 50);
  assert.ok(exp > plain && exp < crit,
    `expected ${exp} should sit between ${plain} and ${crit}`);
});

test('expected damage rises with level even at fixed stats, because crit chance does', () => {
  const o = {
    power: 60, atk: 99, def: 91,
    moveType: 'Fire', attackerTypes: 'Fire', defenderTypes: 'Earth',
  };
  assert.ok(expectedDamage(o, 60) > expectedDamage(o, 1));
});

// ---------------------------------------------------------------------------
// Move delivery (SPEC.md section 9.1)
// ---------------------------------------------------------------------------

test('there are six delivery classes, three contact and three not', () => {
  assert.equal(M.DELIVERY.length, 6);
  assert.equal(M.DELIVERY.filter((d) => d.contact).length, 3);
  assert.equal(M.DELIVERY.filter((d) => !d.contact).length, 3);
});

test('the delivery classes are the ones the design names', () => {
  assert.deepEqual(M.DELIVERY.map((d) => d.id).sort(),
    ['body', 'kick', 'punch', 'ranged', 'trap', 'voice']);
});

test('contact is decided by the delivery class and nowhere else', () => {
  assert.equal(M.makesContact('punch'), true);
  assert.equal(M.makesContact('kick'), true);
  assert.equal(M.makesContact('body'), true);
  assert.equal(M.makesContact('ranged'), false);
  assert.equal(M.makesContact('voice'), false);
  assert.equal(M.makesContact('trap'), false);
});

test('an unknown delivery class is rejected rather than assumed non-contact', () => {
  assert.throws(() => M.makesContact('headbutt'), M.SpecError);
  assert.throws(() => M.makesContact(undefined), M.SpecError);
});

test('every delivery class has a unique id and a note explaining it', () => {
  const ids = M.DELIVERY.map((d) => d.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const d of M.DELIVERY) {
    assert.ok(d.name && d.note, `${d.id} is underspecified`);
    assert.equal(typeof d.contact, 'boolean');
  }
});

test('Thorns keys off contact, so the ability and the classes cannot disagree', () => {
  const thorns = M.abilityById('thorns');
  assert.ok(thorns.effect.toLowerCase().includes('contact'));
  // there is at least one class it fires on and one it does not
  assert.ok(M.DELIVERY.some((d) => d.contact));
  assert.ok(M.DELIVERY.some((d) => !d.contact));
});

// ---------------------------------------------------------------------------
// Height and weight (SPEC.md section 9.2)
// ---------------------------------------------------------------------------

test('every mon declares a positive height and weight', () => {
  for (const m of M.MONS) {
    const { height, weight, name } = { ...m.engine };
    assert.ok(typeof height === 'number' && height > 0, `${name} height: ${height}`);
    assert.ok(typeof weight === 'number' && weight > 0, `${name} weight: ${weight}`);
  }
});

test('size is plausible: nothing is a millimetre tall or heavier than a whale', () => {
  for (const m of M.MONS) {
    assert.ok(m.engine.height >= 0.05 && m.engine.height <= 30, m.engine.name);
    assert.ok(m.engine.weight >= 0.1 && m.engine.weight <= 20000, m.engine.name);
  }
});

test('a mon never shrinks when it evolves', () => {
  for (const m of M.MONS) {
    if (!m.engine.evolvesInto) continue;
    const next = M.monById(m.engine.evolvesInto.id);
    assert.ok(next.engine.height >= m.engine.height,
      `${m.engine.name} -> ${next.engine.name} gets shorter`);
    assert.ok(next.engine.weight >= m.engine.weight,
      `${m.engine.name} -> ${next.engine.name} gets lighter`);
  }
});

test('the weight-ratio cap keeps size-based damage bounded', () => {
  // Terrabulk is ~91x Emberkit's weight. Without a cap a weight-ratio term
  // would be an unbounded multiplier.
  const heaviest = Math.max(...M.MONS.map((m) => m.engine.weight));
  const lightest = Math.min(...M.MONS.map((m) => m.engine.weight));
  const raw = heaviest / lightest;
  assert.ok(raw > M.mechanicsData.size.weightRatioCap,
    'the cap is only meaningful if the roster can exceed it');
  assert.ok(M.mechanicsData.size.weightRatioCap <= 10, 'cap should stay modest');
});

// ---------------------------------------------------------------------------
// Systems that are declared but not designed
// ---------------------------------------------------------------------------

test('energy and affection declare that they are unspecified, and say what blocks them', () => {
  for (const key of ['energy', 'affection']) {
    const sys = M.mechanicsData[key];
    assert.equal(sys.status, 'unspecified', `${key} claims to be specified`);
    assert.ok(sys.blockedOn && sys.blockedOn.length > 20,
      `${key} is unspecified but does not say what it is waiting on`);
  }
});

test('nothing claims to be specified without real values', () => {
  for (const [key, sys] of Object.entries(M.mechanicsData)) {
    if (typeof sys !== 'object' || sys === null || !sys.status) continue;
    if (sys.status !== 'specified') continue;
    const hasNull = JSON.stringify(sys).includes(':null');
    assert.ok(!hasNull, `${key} is marked specified but still holds null values`);
  }
});
