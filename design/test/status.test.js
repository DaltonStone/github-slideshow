import test from 'node:test';
import assert from 'node:assert/strict';

import * as M from '../lib/rules.js';
import * as S from '../lib/status.js';
import { GLASS, BASIC } from './fixtures.js';
import { damage } from '../lib/damage.js';

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
  assert.equal(S.totalDamage('burn', 40, 3), 45);
  assert.equal(S.totalDamage('burn', 40, 4), 60);
});

test('a duration outside the declared range is rejected', () => {
  assert.throws(() => S.totalDamage('burn', 40, 2), M.SpecError);
  assert.throws(() => S.totalDamage('burn', 40, 5), M.SpecError);
});

test('unknown effects and bad levels are rejected', () => {
  assert.throws(() => S.tickDamage('frostbite', 20), M.SpecError);
  assert.throws(() => S.tickDamage('burn', 0), M.SpecError);
  assert.throws(() => S.tickDamage('burn', 100), M.SpecError);
});

test('the duration roll no longer outweighs the level scaling', () => {
  // At 2-5 turns the roll swung the result 2.5x at every level, against 3x
  // across the entire level range -- a coin flip mattering more than 39 levels.
  // Narrowed to 3-4, the roll is 1.33x and the level curve leads again.
  for (const l of [1, 20, 40, 99]) {
    const r = S.damageRange('burn', l);
    assert.ok(r.max / r.min < 1.5, `L${l} swings x${(r.max / r.min).toFixed(2)}`);
  }
  const levelGrowth = S.tickDamage('burn', 40) / S.tickDamage('burn', 1);
  const rollSwing = S.damageRange('burn', 40).max / S.damageRange('burn', 40).min;
  assert.ok(levelGrowth > rollSwing, 'levelling should matter more than the roll');
});

test('a full BURN is worth a couple of ordinary hits, not a kill', () => {
  // The useful measure is not a share of HP -- at low level everything is a
  // large share of a small bar -- but how a burn compares to just attacking.
  // At 2-5 turns the longest burn was 109% of a frail creature's health at L1;
  // at 3-4 it lands between one and three ordinary hits at every level.
  for (const l of [1, 10, 20, 40, 60, 99]) {
    const atk = M.statsAt(BASIC, l);
    const def = M.statsAt(GLASS, l);
    const oneHit = damage({
      power: 60, atk: atk.atk, def: def.def,
      moveType: 'Fire', attackerTypes: 'Fire', defenderTypes: 'Normal',
    });
    const worst = S.damageRange('burn', l).max / oneHit;
    assert.ok(worst > 1, `L${l}: a whole burn is worth less than one hit (${worst.toFixed(1)}x)`);
    assert.ok(worst < 3, `L${l}: a whole burn is worth ${worst.toFixed(1)} hits, too many for a 30% proc`);
  }
});

test('BURN never takes a full health bar on its own', () => {
  for (const l of [1, 20, 40, 99]) {
    const share = S.damageRange('burn', l).max / M.hpAt(GLASS.hp, l);
    assert.ok(share < 1, `L${l}: a burn alone is ${Math.round(share * 100)}% of max HP`);
  }
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
