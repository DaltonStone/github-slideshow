import test from 'node:test';
import assert from 'node:assert/strict';

import * as M from '../lib/rules.js';
import * as S from '../lib/status.js';
import { GLASS } from './fixtures.js';

const DOT = M.mechanicsData.damageOverTime;
const TERRAIN = M.mechanicsData.terrain;

// ---------------------------------------------------------------------------
// Damage over time
// ---------------------------------------------------------------------------

test('BURN ticks 5 at level 1 and 15 at level 40', () => {
  assert.equal(S.tickDamage('burn', 1), 5);
  assert.equal(S.tickDamage('burn', 40), 15);
});

test('BURN stops scaling at its cap, it does not keep rising to 99', () => {
  for (const l of [40, 60, 80, 99]) {
    assert.equal(S.tickDamage('burn', l), 15, `L${l}`);
  }
});

test('BURN rises monotonically up to the cap', () => {
  for (let l = 2; l <= 40; l++) {
    assert.ok(S.tickDamage('burn', l) >= S.tickDamage('burn', l - 1), `L${l}`);
  }
});

test('the DoT shape is general, not burn-specific', () => {
  // Every future damage-over-time effect uses the same curve: X per turn
  // scaling with level, for Y turns.
  for (const e of S.DOT_EFFECTS) {
    assert.ok(e.minDamage > 0 && e.maxDamage > e.minDamage, `${e.id} damage range`);
    assert.ok(e.minTurns >= 1 && e.maxTurns > e.minTurns, `${e.id} turn range`);
    assert.ok(e.capLevel > 1 && e.capLevel <= M.MAX_LEVEL, `${e.id} cap`);
  }
});

test('total damage is the tick times the duration', () => {
  assert.equal(S.totalDamage('burn', 40, 2), 30);
  assert.equal(S.totalDamage('burn', 40, 5), 75);
});

test('a duration outside the declared range is rejected', () => {
  assert.throws(() => S.totalDamage('burn', 40, 1), M.SpecError);
  assert.throws(() => S.totalDamage('burn', 40, 6), M.SpecError);
});

test('unknown effects and bad levels are rejected', () => {
  assert.throws(() => S.tickDamage('frostbite', 20), M.SpecError);
  assert.throws(() => S.tickDamage('burn', 0), M.SpecError);
  assert.throws(() => S.tickDamage('burn', 100), M.SpecError);
});

test('the duration roll swings the outcome more than the level scaling does', () => {
  // 2 turns vs 5 turns is a 2.5x difference at every level. Worth knowing:
  // the coin flip matters more than 39 levels of growth.
  for (const l of [1, 20, 40, 99]) {
    const r = S.damageRange('burn', l);
    assert.equal(r.max / r.min, 2.5, `L${l}`);
  }
});

test('a long BURN can kill a frail creature outright at low level', () => {
  // This is the finding, pinned so a retune has to face it: at L1 a 5-turn
  // burn is more than a frail creature's whole health bar.
  const hp = M.hpAt(GLASS.hp, 1);
  assert.ok(S.damageRange('burn', 1).max > hp,
    `a 5-turn burn is ${S.damageRange('burn', 1).max} against ${hp} HP`);
});

test('BURN falls off relative to HP once past its cap', () => {
  // Damage stops at L40 while HP keeps growing, so burn is an early- and
  // mid-game threat by construction.
  const share = (l) => S.damageRange('burn', l).max / M.hpAt(GLASS.hp, l);
  assert.ok(share(99) < share(40) / 2, 'burn should matter much less at 99 than at 40');
});

test('BURN has an owner ability and an immunity, and both already existed', () => {
  assert.ok(M.abilityById('aspect-of-flame').effect.includes('BURN'));
  assert.ok(M.abilityById('fireproof').effect.toLowerCase().includes('burn'));
});

// ---------------------------------------------------------------------------
// Terrain
// ---------------------------------------------------------------------------

test('there is exactly one terrain per type, with none missing or doubled', () => {
  const c = S.terrainCoverage();
  assert.deepEqual(c.missing, [], 'every type needs a terrain');
  assert.deepEqual(c.duplicated, [], 'no type may have two');
  assert.equal(S.TERRAINS.length, M.TYPES.length);
});

test('every terrain names the need it answers and what it grants', () => {
  for (const t of S.TERRAINS) {
    assert.ok(t.id && t.name && t.need && t.grants && t.kind, `${t.type} terrain underspecified`);
    assert.ok(M.TYPES.includes(t.type));
  }
});

test('each terrain patches the flaw its own type statement names', () => {
  // The design principle: Fire is frail so its terrain gives bulk; Steel is
  // slow so its terrain gives speed. Spot-check the two clearest.
  assert.equal(S.terrainFor('Fire').kind, 'resistance');
  assert.equal(S.terrainFor('Steel').kind, 'speed');
  assert.equal(S.terrainFor('Earth').kind, 'damage');
  assert.equal(S.terrainFor('Dark').kind, 'recovery');
});

test('terrains do not all grant the same thing', () => {
  const kinds = new Set(S.TERRAINS.map((t) => t.kind));
  assert.ok(kinds.size >= 5, `only ${kinds.size} distinct kinds across ten terrains`);
});

test('only one terrain stands at a time', () => {
  assert.equal(TERRAIN.activeAtOnce, 1);
});

test('a terrain buffs its own type only', () => {
  assert.equal(S.benefitsFrom('ashfield', 'Fire'), true);
  assert.equal(S.benefitsFrom('ashfield', ['Fire', 'Phantom']), true);
  assert.equal(S.benefitsFrom('ashfield', 'Water'), false);
  assert.throws(() => S.benefitsFrom('nowhere', 'Fire'), M.SpecError);
});

test('WATER terrain exists now, so Moving Waters is no longer unreachable', () => {
  const water = S.terrainFor('Water');
  assert.ok(water, 'Moving Waters keys off this');
  assert.equal(water.id, 'tide');
});

test('terrain records that nothing yet creates one', () => {
  assert.equal(TERRAIN.status, 'proposed');
  assert.ok(TERRAIN.openRules.some((r) => r.toLowerCase().includes('who sets terrain')),
    'the biggest gap should be written down');
});
