import test from 'node:test';
import assert from 'node:assert/strict';

import * as M from '../lib/rules.js';
import * as E from '../lib/energy.js';

const ENERGY = M.mechanicsData.energy;

// ---------------------------------------------------------------------------
// Tiers
// ---------------------------------------------------------------------------

test('tier boundaries land where the table says', () => {
  const cases = [
    [100, 'fresh'], [61, 'fresh'], [60, 'worn'], [31, 'worn'],
    [30, 'spent'], [11, 'spent'], [10, 'exhausted'], [1, 'exhausted'], [0, 'empty'],
  ];
  for (const [energy, id] of cases) {
    assert.equal(E.tierFor(energy).id, id, `energy ${energy}`);
  }
});

test('nothing improves as energy falls', () => {
  let prevStat = Infinity, prevAcc = Infinity, prevCost = 0;
  for (let e = 100; e >= 0; e--) {
    const t = E.tierFor(e);
    assert.ok(t.statMultiplier <= prevStat, `stats went up at ${e}`);
    assert.ok(t.accuracyMultiplier <= prevAcc, `accuracy went up at ${e}`);
    assert.ok(t.moveCostMultiplier >= prevCost, `cost went down at ${e}`);
    prevStat = t.statMultiplier; prevAcc = t.accuracyMultiplier; prevCost = t.moveCostMultiplier;
  }
});

// ---------------------------------------------------------------------------
// The floor -- the whole point of the model
// ---------------------------------------------------------------------------

test('penalties stop deepening at Exhausted: Empty is no worse', () => {
  // Falling energy lowers stats AND accuracy AND raises cost. That is a
  // feedback loop into losing, and with persistence it taxes the whole run.
  // The floor is what stops it running away.
  const exhausted = E.tierFor(5);
  const empty = E.tierFor(0);
  assert.equal(empty.statMultiplier, exhausted.statMultiplier);
  assert.equal(empty.accuracyMultiplier, exhausted.accuracyMultiplier);
  assert.equal(empty.moveCostMultiplier, exhausted.moveCostMultiplier);
});

test('the worst multipliers are bounded, not open-ended', () => {
  const worst = E.TIERS.reduce((a, t) => Math.min(a, t.statMultiplier), 1);
  assert.ok(worst >= 0.5, `stats bottom out at x${worst}, which is past a floor`);
  const dearest = E.TIERS.reduce((a, t) => Math.max(a, t.moveCostMultiplier), 1);
  assert.ok(dearest <= 2, `move cost tops out at x${dearest}, which is past a floor`);
});

test('energy cannot make a stat vanish', () => {
  const tiny = { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 };
  const drained = E.applyEnergy(tiny, 1);
  for (const k of ['atk', 'def', 'spa', 'spd', 'spe']) {
    assert.ok(drained[k] >= 1, `${k} fell to ${drained[k]}`);
  }
});

// ---------------------------------------------------------------------------
// Applying it
// ---------------------------------------------------------------------------

test('energy scales the fighting stats but never HP', () => {
  const stats = M.statsAt(M.monById(9).engine.stats, 50);
  const drained = E.applyEnergy(stats, 5);
  assert.equal(drained.hp, stats.hp, 'HP must not shrink mid-run');
  for (const k of ['atk', 'def', 'spa', 'spd', 'spe']) {
    assert.ok(drained[k] < stats[k], `${k} should drop when exhausted`);
  }
});

test('a fresh mon is unmodified', () => {
  const stats = M.statsAt(M.monById(5).engine.stats, 50);
  assert.deepEqual(E.applyEnergy(stats, 100), stats);
});

test('only Empty stops a mon fighting', () => {
  for (const e of [100, 60, 30, 10, 1]) assert.equal(E.canBattle(e), true, `energy ${e}`);
  assert.equal(E.canBattle(0), false);
});

test('move cost rises as energy falls, and rounds up', () => {
  assert.equal(E.moveCost(3, 100), 3);
  assert.equal(E.moveCost(3, 5), Math.ceil(3 * 1.5));
  assert.ok(E.moveCost(10, 5) > E.moveCost(10, 100));
  assert.throws(() => E.moveCost(-1, 50), M.SpecError);
});

// ---------------------------------------------------------------------------
// Spending it down
// ---------------------------------------------------------------------------

test('a turn costs the per-turn drain plus the move', () => {
  assert.equal(E.spendTurn(100, 3), 100 - ENERGY.drainPerTurn - 3);
});

test('energy never goes negative', () => {
  let e = 4;
  for (let i = 0; i < 20; i++) e = E.spendTurn(e, 3);
  assert.equal(e, 0);
});

test('a full mon gets a run of battles, not one', () => {
  const turns = E.turnsRemaining(100, ENERGY.defaultMoveCost);
  assert.ok(turns >= 12 && turns <= 30,
    `${turns} turns from full; expected enough for several battles but not endless`);
});

test('less energy means fewer turns, monotonically', () => {
  let prev = 0;
  for (const e of [10, 25, 50, 75, 100]) {
    const t = E.turnsRemaining(e);
    assert.ok(t >= prev, `${e} energy gave ${t} turns, less than a lower start`);
    prev = t;
  }
});

test('turnsRemaining always terminates, even at the cost floor', () => {
  // The cost multiplier is capped, so drain per turn cannot fall to zero.
  assert.ok(E.turnsRemaining(100, 0) < 1000, 'a zero-cost move must still drain per-turn');
});

test('benched mons recover, and never past full', () => {
  assert.equal(E.benchRecover(50), 50 + ENERGY.restoration.benchRegenPerBattle);
  assert.equal(E.benchRecover(E.MAX_ENERGY), E.MAX_ENERGY);
  assert.equal(E.benchRecover(E.MAX_ENERGY - 1), E.MAX_ENERGY);
});

test('rotation beats attrition: benching recovers slower than fighting drains', () => {
  // If the bench refilled faster than a fight emptied, energy would never bind.
  const drainPerTurn = ENERGY.drainPerTurn + ENERGY.defaultMoveCost;
  assert.ok(ENERGY.restoration.benchRegenPerBattle < drainPerTurn * 3,
    'bench recovery is too generous for energy to be a real constraint');
});

test('bad inputs are rejected', () => {
  assert.throws(() => E.tierFor('50'), M.SpecError);
  assert.throws(() => E.tierFor(NaN), M.SpecError);
  assert.throws(() => E.tierFor(50, 0), M.SpecError);
});

// ---------------------------------------------------------------------------
// Persistence, and the proxy rule
// ---------------------------------------------------------------------------

test('energy and stamina both persist between battles', () => {
  assert.equal(ENERGY.persistsBetweenBattles, true);
  assert.equal(M.mechanicsData.stamina.persistsBetweenBattles, true);
});

test('stamina and energy are different axes, not the same one twice', () => {
  const stamina = M.mechanicsData.stamina;
  assert.equal(stamina.perMove, true, 'stamina limits which move');
  assert.ok(ENERGY.max > 0 && !ENERGY.perMove, 'energy is a single pool for the mon');
});

test('a proxy blocks every attack, with no delivery class getting past it', () => {
  const proxy = M.mechanicsData.proxy;
  assert.equal(proxy.blocksAllAttacks, true);
  // Voice was a candidate for reaching past a proxy. It does not.
  assert.ok(proxy.$blocksNote.includes('Voice'),
    'the rule should say explicitly that Voice does not bypass');
  for (const d of M.DELIVERY) {
    assert.ok(proxy.blocksAllAttacks, `${d.id} must not bypass a proxy`);
  }
});

test('the proxy rule records what it does not yet settle', () => {
  const proxy = M.mechanicsData.proxy;
  assert.ok(Array.isArray(proxy.openRules) && proxy.openRules.length >= 3,
    'an absolute rule with this much reach needs its edge cases written down');
});
