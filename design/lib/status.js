/**
 * Damage over time, and terrain.
 *
 * The DoT shape is the design's: X damage per turn scaling with level, for Y
 * turns. BURN is the first instance and every future DoT uses the same curve.
 *
 * Terrain is PROPOSED. The principle -- one terrain per type, each granting
 * what that type most needs -- is the design's; the ten specific buffs are a
 * first cut read straight off each type's stated weakness.
 */

import { mechanicsData, TYPES, SpecError, MIN_LEVEL, MAX_LEVEL } from './rules.js';

const DOT = mechanicsData.damageOverTime;
const TERRAIN = mechanicsData.terrain;

export const DOT_EFFECTS = DOT.effects;
export const TERRAINS = TERRAIN.terrains;

const effect = (id) => {
  const e = DOT_EFFECTS.find((x) => x.id === id);
  if (!e) throw new SpecError(`unknown damage-over-time effect: ${id}`);
  return e;
};

/**
 * Damage one tick of a DoT deals at a level.
 *
 * Scales linearly from minDamage at L1 to maxDamage at capLevel, then flat --
 * BURN caps at 40, so the last 59 levels buy no extra burn.
 */
export function tickDamage(id, level) {
  if (!Number.isInteger(level) || level < MIN_LEVEL || level > MAX_LEVEL) {
    throw new SpecError(`level must be an integer in ${MIN_LEVEL}..${MAX_LEVEL}, got ${level}`);
  }
  const e = effect(id);
  const capped = Math.min(level, e.capLevel);
  const t = (capped - MIN_LEVEL) / (e.capLevel - MIN_LEVEL);
  return Math.round(e.minDamage + (e.maxDamage - e.minDamage) * t);
}

/** Total damage over the whole duration, for a given number of turns. */
export function totalDamage(id, level, turns) {
  const e = effect(id);
  if (turns < e.minTurns || turns > e.maxTurns) {
    throw new SpecError(`${id} lasts ${e.minTurns}-${e.maxTurns} turns, got ${turns}`);
  }
  return tickDamage(id, level) * turns;
}

/** The shortest and longest a DoT can run at a level. */
export function damageRange(id, level) {
  const e = effect(id);
  const tick = tickDamage(id, level);
  return { tick, min: tick * e.minTurns, max: tick * e.maxTurns };
}

// ---------------------------------------------------------------------------
// Terrain
// ---------------------------------------------------------------------------

/** The terrain belonging to a type. Every type has exactly one. */
export function terrainFor(type) {
  const t = TERRAINS.find((x) => x.type === type);
  if (!t) throw new SpecError(`no terrain for type: ${type}`);
  return t;
}

/** Does this creature benefit from the standing terrain? */
export function benefitsFrom(terrainId, creatureTypes) {
  const t = TERRAINS.find((x) => x.id === terrainId);
  if (!t) throw new SpecError(`unknown terrain: ${terrainId}`);
  if (!TERRAIN.buffsOnlyItsOwnType) return true;
  const types = Array.isArray(creatureTypes) ? creatureTypes : [creatureTypes];
  return types.includes(t.type);
}

/** Every type has a terrain, and no two terrains share a type. */
export function terrainCoverage() {
  const covered = TERRAINS.map((t) => t.type);
  return {
    covered,
    missing: TYPES.filter((t) => !covered.includes(t)),
    duplicated: covered.filter((t, i) => covered.indexOf(t) !== i),
  };
}
