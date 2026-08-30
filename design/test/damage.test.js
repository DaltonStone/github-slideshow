import test from 'node:test';
import assert from 'node:assert/strict';

import * as M from '../lib/rules.js';
import { damage, explain, effectiveAttack, hitsToKO, TUNING } from '../lib/damage.js';

const base = {
  power: 60, atk: 99, def: 91,
  moveType: 'Normal', attackerTypes: 'Normal', defenderTypes: 'Water',
};

// --- the constraints the formula was chosen to satisfy ----------------------

test('damage scales with stats, so battles do not lengthen with level', () => {
  // HP grows ~6.6x over L1..L99 while other stats grow ~3.97x. Damage must
  // track the stats, not stay flat, or high-level battles drag.
  const atk = (l) => M.statAt(40, l);
  const def = (l) => M.statAt(37, l);
  const lo = effectiveAttack(atk(1), def(1));
  const hi = effectiveAttack(atk(99), def(99));
  const growth = hi / lo;
  assert.ok(growth > 3.5 && growth < 4.5,
    `damage grew x${growth.toFixed(2)} across the level range; expected ~3.95`);
});

test('level never enters the formula except through stats', () => {
  // Same stats, any level: identical damage. There is no level parameter.
  const a = damage(base);
  const b = damage({ ...base });
  assert.equal(a, b);
  assert.ok(!Object.keys(base).includes('level'));
});

test('the core is never negative, even when DEF hugely outweighs ATK', () => {
  // This is why the difference form was rejected.
  assert.ok(effectiveAttack(1, 10000) > 0);
  assert.ok(damage({ ...base, atk: 1, def: 10000 }) >= TUNING.MIN_DAMAGE);
});

test('DEF has diminishing returns rather than a cliff', () => {
  const at = (d) => effectiveAttack(100, d);
  const firstHundred = at(50) - at(150);
  const secondHundred = at(150) - at(250);
  assert.ok(firstHundred > secondHundred,
    'each point of DEF should buy less than the last');
});

test('more ATK always helps and more DEF always helps', () => {
  assert.ok(effectiveAttack(120, 90) > effectiveAttack(100, 90));
  assert.ok(damage({ ...base, def: 200 }) < damage({ ...base, def: 50 }));
});

// --- multipliers ------------------------------------------------------------

test('damage is proportional to power', () => {
  const one = damage({ ...base, power: 40 });
  const two = damage({ ...base, power: 80 });
  assert.ok(Math.abs(two / one - 2) < 0.05, `${one} -> ${two} is not proportional`);
});

test('STAB and effectiveness both multiply in', () => {
  const plain = explain({ ...base, moveType: 'Normal', attackerTypes: 'Water' });
  assert.equal(plain.stab, 1);
  assert.equal(plain.effectiveness, 1);

  const stabbed = explain({ ...base, moveType: 'Water', attackerTypes: 'Water' });
  assert.equal(stabbed.stab, 1.5);

  const superEff = explain({ ...base, moveType: 'Earth', attackerTypes: 'Earth', defenderTypes: 'Water' });
  assert.equal(superEff.effectiveness, 2);
});

test('an immune defender takes exactly zero, not the minimum', () => {
  assert.equal(damage({ ...base, moveType: 'Normal', attackerTypes: 'Normal', defenderTypes: 'Phantom' }), 0);
  assert.equal(damage({ ...base, moveType: 'Psychic', attackerTypes: 'Psychic', defenderTypes: ['Normal', 'Dragon'] }), 0);
});

test('a resisted hit still does at least the minimum', () => {
  const d = damage({ ...base, power: 1, atk: 1, def: 9999, moveType: 'Steel', attackerTypes: 'Steel', defenderTypes: ['Fire', 'Water'] });
  assert.equal(d, TUNING.MIN_DAMAGE);
});

test('the modifier parameter carries ability effects', () => {
  const plain = damage(base);
  const slowBurn = damage({ ...base, modifier: 1.2 });   // Slow Burn
  assert.ok(slowBurn > plain);
  assert.ok(Math.abs(slowBurn / plain - 1.2) < 0.05);
});

test('crits apply the tuning multiplier', () => {
  const plain = damage(base);
  const crit = damage({ ...base, crit: true });
  assert.ok(Math.abs(crit / plain - TUNING.CRIT) < 0.05);
});

test('damage is always a whole number', () => {
  for (const power of [10, 33, 47, 60, 120]) {
    assert.ok(Number.isInteger(damage({ ...base, power })));
  }
});

test('bad inputs are rejected rather than silently producing nonsense', () => {
  assert.throws(() => damage({ ...base, power: 0 }), M.SpecError);
  assert.throws(() => damage({ ...base, atk: 0 }), M.SpecError);
  assert.throws(() => damage({ ...base, def: -5 }), M.SpecError);
});

// --- the modifier stack, kept visible --------------------------------------

test('explain reports the full multiplier stack', () => {
  // Kindling (1.5) x mono STAB (1.5) x 3.0x effectiveness = 6.75x.
  // This is the cliff flagged in OPEN_QUESTIONS.md section 2. The test does not
  // assert it is acceptable -- it asserts it stays measurable.
  const e = explain({
    ...base, power: 60,
    moveType: 'Fire', attackerTypes: 'Fire', defenderTypes: ['Earth', 'Steel'],
    modifier: 1.5,
  });
  assert.equal(e.effectiveness, 3);
  assert.equal(e.stab, 1.5);
  assert.equal(e.multiplierStack, 6.75);
});

test('explain agrees with damage', () => {
  assert.equal(explain(base).damage, damage(base));
});

// --- against the real roster ------------------------------------------------

test('a final-stage attacker needs several hits, not one, on a comparable tank', () => {
  const attacker = M.statsAt(M.monById(5).engine.stats, 50);  // Pyrelash
  const defender = M.statsAt(M.monById(9).engine.stats, 50);  // Terrabulk
  const d = damage({
    power: 60, atk: attacker.atk, def: defender.def,
    moveType: 'Normal', attackerTypes: 'Fire', defenderTypes: 'Earth',
  });
  const hits = hitsToKO(defender.hp, d);
  assert.ok(hits >= 3 && hits <= 6, `neutral hit took ${hits} to KO; expected 3-6`);
});

test('with type advantage neutralised, the tank out-lasts the glass cannon', () => {
  // Both sides use a Normal move, so neither STAB nor the chart applies and the
  // comparison is purely bulk vs frailty. (Using their own types instead would
  // just measure Fire-beats-Earth, which is the chart's job, not the formula's.)
  const glass = M.statsAt(M.monById(5).engine.stats, 50);  // Pyrelash
  const tank = M.statsAt(M.monById(9).engine.stats, 50);   // Terrabulk
  const neutral = { power: 60, moveType: 'Normal' };
  const intoTank = damage({ ...neutral, atk: glass.atk, def: tank.def, attackerTypes: 'Fire', defenderTypes: 'Earth' });
  const intoGlass = damage({ ...neutral, atk: tank.atk, def: glass.def, attackerTypes: 'Earth', defenderTypes: 'Fire' });
  assert.ok(hitsToKO(glass.hp, intoGlass) < hitsToKO(tank.hp, intoTank),
    `glass cannon survived ${hitsToKO(glass.hp, intoGlass)} hits, tank survived ${hitsToKO(tank.hp, intoTank)}`);
});

test('a type advantage can overturn a bulk advantage', () => {
  // The flip side: Fire beats Earth, so the frail attacker wins that matchup
  // outright. This is the chart doing its job and is worth pinning down.
  const glass = M.statsAt(M.monById(5).engine.stats, 50);
  const tank = M.statsAt(M.monById(9).engine.stats, 50);
  const intoTank = damage({ power: 60, atk: glass.atk, def: tank.def, moveType: 'Fire', attackerTypes: 'Fire', defenderTypes: 'Earth' });
  const intoGlass = damage({ power: 60, atk: tank.atk, def: glass.def, moveType: 'Earth', attackerTypes: 'Earth', defenderTypes: 'Fire' });
  assert.ok(hitsToKO(tank.hp, intoTank) < hitsToKO(glass.hp, intoGlass),
    'Fire beats Earth, so the frail Fire attacker should win this one');
});

test('no starter one-shots another starter at equal level', () => {
  for (const a of [1, 2, 3]) {
    for (const b of [1, 2, 3]) {
      if (a === b) continue;
      const A = M.monById(a), B = M.monById(b);
      const as = M.statsAt(A.engine.stats, 15), bs = M.statsAt(B.engine.stats, 15);
      const d = damage({
        power: 60, atk: as.atk, def: bs.def,
        moveType: A.engine.type1, attackerTypes: A.engine.type1, defenderTypes: B.engine.type1,
      });
      assert.ok(d < bs.hp,
        `${A.engine.name} one-shots ${B.engine.name} (${d} vs ${bs.hp} HP)`);
    }
  }
});

test('hitsToKO handles the immune case', () => {
  assert.equal(hitsToKO(100, 0), Infinity);
});
