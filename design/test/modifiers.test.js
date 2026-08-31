import test from 'node:test';
import assert from 'node:assert/strict';

import * as M from '../lib/rules.js';
import * as X from '../lib/modifiers.js';
import { TANK, SUPPORT } from './fixtures.js';

// ---------------------------------------------------------------------------
// The decode
// ---------------------------------------------------------------------------

test('the number on an ability is the fraction it adds', () => {
  // Stated directly by the design: Aspect of Flame's ".25 SPD" is +25% SPD.
  assert.equal(X.statMultiplier(0.25), 1.25);
  assert.equal(X.statMultiplier(2), 3);
  assert.equal(X.statMultiplier(4), 5);
  assert.equal(X.statMultiplier(0), 1);
});

test('modifiers on the same stat add before they multiply', () => {
  assert.equal(X.statMultiplier([0.25, 0.25]), 1.5);
  assert.equal(X.statMultiplier([2, -1]), 2);
  assert.equal(X.statMultiplier([1, 1, 1]), 4);
});

test('an empty modifier list changes nothing', () => {
  assert.equal(X.statMultiplier([]), 1);
  assert.equal(X.statMultiplier(), 1);
});

// ---------------------------------------------------------------------------
// The floor -- the one place the stated rule breaks
// ---------------------------------------------------------------------------

test('the floor stops a modifier deleting a stat outright', () => {
  // 1 + (-1) is exactly 0, which would zero the stat. The floor catches it.
  assert.equal(X.statMultiplier(-1), X.MODIFIER_FLOOR);
  assert.equal(X.statMultiplier(-5), X.MODIFIER_FLOOR);
  assert.ok(X.MODIFIER_FLOOR > 0, 'a stat can never be reduced to nothing');
});

test('negatives above the floor behave normally', () => {
  assert.equal(X.statMultiplier(-0.25), 0.75);
  assert.equal(X.statMultiplier(-0.5), 0.5);
});

test('a modified stat never rounds away to zero', () => {
  assert.equal(X.modifyStat(1, -1), 1);
  assert.equal(X.modifyStat(2, -1), 1);
});

test('the floor matches the type chart floor, so the game has one convention', () => {
  assert.equal(X.MODIFIER_FLOOR, M.STACKING.table['-100']);
});

// ---------------------------------------------------------------------------
// Applying them
// ---------------------------------------------------------------------------

test('modifiers scale the fighting stats and never HP', () => {
  const stats = M.statsAt(TANK, 50);
  const out = X.modifyStats(stats, { def: 4 });
  assert.equal(out.hp, stats.hp, 'HP must not carry a modifier');
  assert.equal(out.def, Math.floor(stats.def * 5));
  assert.equal(out.atk, stats.atk, 'an unmodified stat is untouched');
});

test('putting a modifier on HP is rejected rather than ignored', () => {
  assert.throws(() => X.modifyStats(M.statsAt(TANK, 50), { hp: 1 }), M.SpecError);
});

test('bad modifiers are rejected', () => {
  assert.throws(() => X.statMultiplier('big'), M.SpecError);
  assert.throws(() => X.statMultiplier(NaN), M.SpecError);
  assert.throws(() => X.modifyStat(0, 1), M.SpecError);
});

test('modifiers are battle-only and do not touch stored stats', () => {
  const stats = M.statsAt(TANK, 50);
  const copy = { ...stats };
  X.modifyStats(stats, { def: 4, spe: -1 });
  assert.deepEqual(stats, copy, 'modifyStats must not mutate its input');
  assert.ok(M.mechanicsData.statModification.$scope.includes('Battle-only'));
});

// ---------------------------------------------------------------------------
// The three starter signatures, as written
// ---------------------------------------------------------------------------

test('Aspect of Flame stacks a quarter at a time', () => {
  // One per BURN applied to ANY creature. On a 2v2 field that is four sources.
  assert.equal(X.statMultiplier([0.25]), 1.25);
  assert.equal(X.statMultiplier([0.25, 0.25, 0.25, 0.25]), 2,
    'four burns doubles its speed');
});

test('Layered Stone erodes to nothing over exactly four super-effective hits', () => {
  const steps = [0, 1, 2, 3, 4, 5].map((h) => X.layeredStoneAfter(h));
  assert.deepEqual(steps, [4, 3, 2, 1, 0, 0]);
  assert.equal(X.statMultiplier(X.layeredStoneAfter(0)), 5);
  assert.equal(X.statMultiplier(X.layeredStoneAfter(4)), 1, 'stripped, not negative');
  assert.throws(() => X.layeredStoneAfter(-1), M.SpecError);
});

test('Layered Stone is strong but not an immunity', () => {
  const stats = M.statsAt(TANK, 50);
  const buffed = X.modifyStat(stats.def, 4);
  assert.ok(buffed / stats.def === 5);
  // it multiplies DEF by 5, but the damage formula's diminishing returns mean
  // that lands around a third of incoming damage, not a tenth
  assert.ok(buffed < 1000, 'sanity: still a real number an attacker can work against');
});

test('WATER terrain is defined now, but still nothing creates one', () => {
  // Moving Waters keys off WATER terrain. The terrain exists as a designed
  // effect; what is still missing is any move or ability that SETS it, so the
  // ability remains unreachable in play.
  const terrain = M.mechanicsData.terrain;
  assert.equal(terrain.status, 'proposed');
  assert.ok(terrain.terrains.some((x) => x.type === 'Water'), 'WATER terrain should exist');
  assert.ok(terrain.openRules.some((r) => r.toLowerCase().includes('who sets terrain')),
    'the gap that keeps Moving Waters dead should stay recorded');
});

// ---------------------------------------------------------------------------
// Swarm is gone
// ---------------------------------------------------------------------------

test('Colony and Royal are removed: many bodies are one HP pool', () => {
  assert.equal(M.abilityById('colony'), undefined);
  assert.equal(M.abilityById('royal'), undefined);
});

test('nothing in the design still refers to Swarm or to bodies-instead-of-HP', () => {
  for (const a of M.ABILITIES) {
    const text = `${a.name} ${a.effect}`.toLowerCase();
    assert.ok(!text.includes('swarm'), `${a.id} still mentions Swarm`);
    assert.ok(!text.includes('bodies'), `${a.id} still mentions bodies`);
  }
});

test('the multi-body creatures are still in the roster, just with normal HP', () => {
  // Stilta is five little guys and Pilliduns combine to do large things --
  // the concept survives, the parallel HP model does not.
  for (const name of ['Stilta', 'Pilliduns', 'VisBee']) {
    assert.ok(M.monByName(name), `${name} should still exist`);
  }
});
