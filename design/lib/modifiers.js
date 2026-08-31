/**
 * In-battle stat modifiers.
 *
 * Abilities and moves apply MODIFIERS to a stat for the duration of a battle.
 * They are multipliers, not permanent stat changes -- a creature's stored stats
 * are never touched, and everything clears when the battle ends.
 *
 *   multiplier = max(FLOOR, 1 + sum of active modifiers on that stat)
 *
 * So the number written on an ability is the fraction it adds:
 *
 *   +0.25  ->  x1.25   Aspect of Flame, per BURN applied      (+25% SPD)
 *   +2     ->  x3.00   Moving Waters in WATER terrain         (+200% SPD)
 *   +4     ->  x5.00   Layered Stone at battle start          (+400% DEF)
 *   -1     ->  x0.25   floored; the plain rule would give 0
 *
 * THE FLOOR IS PROPOSED. The stated rule gives -1 a multiplier of exactly zero,
 * which would delete a stat outright. 0.25 matches the type chart's floor, so
 * the worst case is a quarter of the stat rather than none of it. The other
 * plausible shape for negatives is 1/(1+|sum|), which halves at -1 instead.
 */

import { mechanicsData, SpecError } from './rules.js';

const MOD = mechanicsData.statModification;

export const MODIFIER_FLOOR = MOD.floor;

/** The multiplier a stat is under, given every modifier currently on it. */
export function statMultiplier(modifiers = []) {
  const list = Array.isArray(modifiers) ? modifiers : [modifiers];
  let sum = 0;
  for (const m of list) {
    if (typeof m !== 'number' || Number.isNaN(m)) {
      throw new SpecError(`a stat modifier must be a number, got ${m}`);
    }
    sum += m;
  }
  return Math.max(MODIFIER_FLOOR, 1 + sum);
}

/** One stat with its modifiers applied. Never rounds below 1. */
export function modifyStat(value, modifiers = []) {
  if (value <= 0) throw new SpecError(`stat must be positive, got ${value}`);
  return Math.max(1, Math.floor(value * statMultiplier(modifiers)));
}

/**
 * A whole statline under a map of modifiers, e.g. { spe: [0.25, 0.25], def: 4 }.
 * HP is never modified -- modifiers are battle-only and should not move a
 * health bar mid-fight.
 */
export function modifyStats(stats, byStat = {}) {
  const out = { hp: stats.hp };
  for (const k of ['atk', 'def', 'spa', 'spd', 'spe']) {
    out[k] = modifyStat(stats[k], byStat[k] ?? []);
  }
  if ('hp' in byStat) {
    throw new SpecError('HP cannot carry a stat modifier');
  }
  return out;
}

/**
 * Layered Stone erodes: it starts at +4 and loses 1 per super-effective hit
 * taken, so four of them strip it entirely.
 */
export function layeredStoneAfter(superEffectiveHits) {
  if (superEffectiveHits < 0) throw new SpecError('hits cannot be negative');
  return Math.max(0, 4 - superEffectiveHits);
}
