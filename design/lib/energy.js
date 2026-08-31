/**
 * MONS energy.
 *
 * *** PROPOSED. The design states that energy exists, persists between
 * battles, and degrades stats / accuracy / move cost as it falls. The tiers and
 * numbers here are a first cut. ***
 *
 * Energy persisting between battles is the decision that shapes this: the unit
 * of play stops being a battle and becomes a run of them. The question during a
 * fight is no longer "can I win this" but "can I win this cheaply enough to
 * still win the next five".
 *
 * Two consequences the model is built around:
 *
 *   1. THE FLOOR IS MANDATORY. Falling energy lowering stats *and* accuracy
 *      *and* raising move cost is a positive feedback loop into losing. With
 *      persistence it is worse -- a bad fight taxes the rest of the run. So
 *      penalties stop deepening at Exhausted; Empty is no worse, it just cannot
 *      fight.
 *   2. ROTATION IS THE VERB. Benched mons recover a little per battle, so the
 *      intended answer to a tiring team is to rotate it rather than to spend
 *      items.
 */

import { mechanicsData, SpecError } from './rules.js';

const ENERGY = mechanicsData.energy;

export const MAX_ENERGY = ENERGY.max;
export const TIERS = ENERGY.tiers;

/** The tier a mon is in, from its current energy. */
export function tierFor(current, max = MAX_ENERGY) {
  if (typeof current !== 'number' || Number.isNaN(current)) {
    throw new SpecError(`energy must be a number, got ${current}`);
  }
  if (max <= 0) throw new SpecError(`max energy must be positive, got ${max}`);
  if (current <= 0) return TIERS.find((t) => t.id === 'empty');

  const fraction = Math.min(current, max) / max;
  // tiers are ordered high to low; the first whose floor we clear is ours
  return TIERS.find((t) => t.aboveFraction >= 0 && fraction > t.aboveFraction)
      ?? TIERS.find((t) => t.id === 'exhausted');
}

/**
 * Energy at zero KNOCKS THE MON OUT. Energy is a second health bar, not a soft
 * debuff -- which is what makes the Exhausted tier dangerous rather than merely
 * inconvenient.
 */
export const isKnockedOut = (current, max = MAX_ENERGY) => tierFor(current, max).knockedOut === true;

/** Can this mon take the field at all? False only once it is knocked out. */
export const canBattle = (current, max = MAX_ENERGY) => !isKnockedOut(current, max);

/**
 * Every stat scaled by the energy tier. HP is left alone -- energy should make
 * a mon fight worse, not shrink its health bar mid-run.
 */
export function applyEnergy(stats, current, max = MAX_ENERGY) {
  const m = tierFor(current, max).statMultiplier;
  return {
    hp: stats.hp,
    atk: Math.max(1, Math.floor(stats.atk * m)),
    def: Math.max(1, Math.floor(stats.def * m)),
    spa: Math.max(1, Math.floor(stats.spa * m)),
    spd: Math.max(1, Math.floor(stats.spd * m)),
    spe: Math.max(1, Math.floor(stats.spe * m)),
  };
}

/** Accuracy multiplier at the current energy. */
export const accuracyAt = (current, max = MAX_ENERGY) => tierFor(current, max).accuracyMultiplier;

/** What one move actually costs at the current energy. */
export function moveCost(baseCost, current, max = MAX_ENERGY) {
  if (baseCost < 0) throw new SpecError(`move cost cannot be negative, got ${baseCost}`);
  return Math.ceil(baseCost * tierFor(current, max).moveCostMultiplier);
}

/**
 * Energy after one turn: the per-turn drain plus the cost of the move used.
 * Never below zero.
 */
export function spendTurn(current, baseCost = ENERGY.defaultMoveCost, max = MAX_ENERGY) {
  const spent = ENERGY.drainPerTurn + moveCost(baseCost, current, max);
  return Math.max(0, current - spent);
}

/** Energy a benched mon gets back after a battle it sat out. */
/** What a mon does when every move is out of stamina. */
export const STRUGGLE = mechanicsData.struggle;

/** Recoil a Struggle deals back to its user, from the damage it dealt. */
export function struggleRecoil(damageDealt) {
  if (damageDealt < 0) throw new SpecError(`damage cannot be negative, got ${damageDealt}`);
  return Math.max(1, Math.floor(damageDealt * STRUGGLE.recoilFractionOfDamageDealt));
}

export function benchRecover(current, max = MAX_ENERGY) {
  return Math.min(max, current + ENERGY.restoration.benchRegenPerBattle);
}

/**
 * Turns until this mon is knocked out by exhaustion, using a move of the given
 * base cost every turn. Since energy hitting zero is a KO, this is a countdown
 * to death, not to a rest.
 */
export function turnsUntilKO(current, baseCost = ENERGY.defaultMoveCost, max = MAX_ENERGY) {
  let e = current;
  let turns = 0;
  while (e > 0 && turns < 1000) {
    e = spendTurn(e, baseCost, max);
    turns += 1;
  }
  return turns;
}
