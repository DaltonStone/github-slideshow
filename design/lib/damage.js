/**
 * MONS damage formula.
 *
 * *** PROVISIONAL. This is the one part of the system SPEC.md does not state. ***
 *
 * Everything in rules.js is the spec written out. This file is a proposal:
 * a formula chosen to satisfy the constraints the spec *does* impose, kept in
 * its own module with its constants exposed so it can be retuned or replaced
 * without touching anything else.
 *
 * ---------------------------------------------------------------------------
 * THE CONSTRAINTS
 *
 *   1. Level is not a term (SPEC.md section 5). It acts only through stats.
 *   2. Base stats are small; a stat is ~3.97x base at L99.
 *   3. HP additionally gains a flat +L, so HP grows ~6.6x over the level range
 *      while other stats grow ~3.97x.
 *
 * WHY THIS SHAPE
 *
 * Constraint 3 is the one that decides it. If damage does not grow with the
 * stats, battles get longer and longer as levels rise.
 *
 *   ATK / DEF (ratio)        -- damage grows x1.00 as both sides scale.
 *                               Flat damage against 6.6x HP: a L99 battle
 *                               takes ~6x as many turns as a L1 one. Rejected.
 *   ATK - DEF/2 (difference) -- grows x3.95. Correct scaling, but goes negative
 *                               whenever DEF > 2*ATK and needs an arbitrary
 *                               floor bolted on. Rejected.
 *   ATK^2 / (ATK + DEF)      -- grows x3.95, is never negative or zero, and
 *                               gives DEF smooth diminishing returns.
 *                               Adopted.
 *
 * So:
 *
 *   base   = Power * ATK^2 / (ATK + DEF) / SCALE
 *   damage = base * STAB * effectiveness * (ability and other modifiers)
 *
 * SCALE = 100 was tuned against the actual roster: at L50 a final-stage
 * attacker needs 3 STAB hits to drop a final-stage tank, and the tank needs 2
 * to drop the frail one. Frail-and-fast wins on tempo, bulky wins on attrition.
 *
 * OPEN: see OPEN_QUESTIONS.md section 2. Notably the modifier stack -- Kindling
 * (1.5) x STAB (1.5) x 3.0x effectiveness is 6.75x before this formula does
 * anything, which is a bigger cliff than the additive type rule was adopted to
 * avoid. `explain()` below reports the stack so it stays visible.
 */

import { effectiveness, stab, mechanicsData, SpecError, MIN_LEVEL, MAX_LEVEL } from './rules.js';

const CRIT = mechanicsData.crit;

/** Tunable constants. Change these, not the shape of the formula. */
export const TUNING = {
  /** Divisor on raw damage. Lower = faster battles. */
  SCALE: 100,
  /** Damage is never less than this, so nothing is perfectly safe. */
  MIN_DAMAGE: 1,
  /** Crit damage multiplier. PROVISIONAL -- the design gives crit *chance*, not damage. */
  CRIT: CRIT.damageMultiplier,
};

/**
 * Chance of a critical hit at a level, before any move or ability modifier.
 *
 * Rises linearly from baseChance at L1 to maxChance at capLevel, then stays
 * flat -- levels run to 99 but crit stops climbing at 60.
 *
 * @param {number} level
 * @param {number} [bonus=0] flat addition from moves or abilities, e.g. 0.1
 * @returns {number} a probability in 0..1
 */
export function critChance(level, bonus = 0) {
  if (!Number.isInteger(level) || level < MIN_LEVEL || level > MAX_LEVEL) {
    throw new SpecError(`level must be an integer in ${MIN_LEVEL}..${MAX_LEVEL}, got ${level}`);
  }
  const capped = Math.min(level, CRIT.capLevel);
  const t = (capped - MIN_LEVEL) / (CRIT.capLevel - MIN_LEVEL);
  const chance = CRIT.baseChance + (CRIT.maxChance - CRIT.baseChance) * t;
  return Math.min(1, Math.max(0, chance + bonus));
}

/**
 * Damage averaged over the crit roll -- what a hit is actually worth before
 * you know the outcome. Use this for comparisons; `damage` is one instance.
 */
export function expectedDamage(o, level, critBonus = 0) {
  const p = critChance(level, critBonus);
  return damage({ ...o, crit: false }) * (1 - p) + damage({ ...o, crit: true }) * p;
}

/**
 * The stat-vs-stat core, before any multiplier.
 * Quadratic in ATK over (ATK + DEF): scales with level, never negative,
 * diminishing returns on DEF.
 */
export function effectiveAttack(atk, def) {
  if (atk <= 0) throw new SpecError(`ATK must be positive, got ${atk}`);
  if (def <= 0) throw new SpecError(`DEF must be positive, got ${def}`);
  return (atk * atk) / (atk + def);
}

/**
 * Full damage for one hit.
 *
 * @param {object} o
 * @param {number} o.power        move power
 * @param {number} o.atk          attacker's ATK or SpA, already at level
 * @param {number} o.def          defender's DEF or SpD, already at level
 * @param {string} o.moveType
 * @param {string|string[]} o.attackerTypes
 * @param {string|string[]} o.defenderTypes
 * @param {number} [o.modifier=1] everything else multiplied in (abilities,
 *                                weather, Slow Burn's +20%, ...)
 * @param {boolean} [o.crit=false]
 * @returns {number} integer damage, floored at MIN_DAMAGE unless immune
 */
export function damage({
  power, atk, def, moveType, attackerTypes, defenderTypes, modifier = 1, crit = false,
}) {
  if (power <= 0) throw new SpecError(`power must be positive, got ${power}`);

  const eff = effectiveness(moveType, defenderTypes);
  if (eff === 0) return 0; // immunity is absolute; no floor applies

  const raw = (power * effectiveAttack(atk, def)) / TUNING.SCALE;
  const total = raw
    * stab(moveType, attackerTypes)
    * eff
    * modifier
    * (crit ? TUNING.CRIT : 1);

  return Math.max(TUNING.MIN_DAMAGE, Math.floor(total));
}

/**
 * Same calculation, with every step reported. Use this in tools and tests --
 * it is what makes the modifier stack visible instead of buried.
 */
export function explain(o) {
  const eff = effectiveness(o.moveType, o.defenderTypes);
  const st = stab(o.moveType, o.attackerTypes);
  const mod = o.modifier ?? 1;
  const critMult = o.crit ? TUNING.CRIT : 1;
  return {
    effectiveAttack: effectiveAttack(o.atk, o.def),
    raw: (o.power * effectiveAttack(o.atk, o.def)) / TUNING.SCALE,
    stab: st,
    effectiveness: eff,
    modifier: mod,
    crit: critMult,
    /** Everything multiplied on top of the raw number. Watch this figure. */
    multiplierStack: st * eff * mod * critMult,
    damage: damage(o),
  };
}

/** Hits to KO, given full HP. Infinity if the move cannot damage at all. */
export function hitsToKO(hp, dmg) {
  return dmg <= 0 ? Infinity : Math.ceil(hp / dmg);
}
