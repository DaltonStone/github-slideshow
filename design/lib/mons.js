'use strict';

/**
 * MONS reference implementation.
 *
 * This is the executable half of the design spec: every rule here is stated in
 * ../SPEC.md, and nothing here invents a rule the spec does not state. In
 * particular there is deliberately no damage() function -- the spec fixes the
 * multipliers but not the core damage expression (SPEC.md section 11).
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

const readJson = (name) =>
  JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), 'utf8'));

const typeData = readJson('types.json');
const abilityData = readJson('abilities.json');
const monData = readJson('mons.json');

const TYPES = typeData.types;
const CHART = typeData.chart;
const STACKING = typeData.stacking;
const STAB = typeData.stab;

/** Base stat totals by evolution stage (SPEC.md section 5). */
const STAGE_TOTALS = { basic: 105, evolved: 135, final: 170 };

const MIN_LEVEL = 1;
const MAX_LEVEL = 99;

/** Growth divisor: a stat is exactly 2x base at L34 and 3x at L67. */
const GROWTH_DIVISOR = 33;

class SpecError extends Error {}

const assertType = (t) => {
  if (!TYPES.includes(t)) throw new SpecError(`unknown type: ${t}`);
  return t;
};

const assertLevel = (level) => {
  if (!Number.isInteger(level) || level < MIN_LEVEL || level > MAX_LEVEL) {
    throw new SpecError(`level must be an integer in ${MIN_LEVEL}..${MAX_LEVEL}, got ${level}`);
  }
  return level;
};

// ---------------------------------------------------------------------------
// Stats (SPEC.md section 5)
// ---------------------------------------------------------------------------

/**
 * Non-HP stat at a level. Level is not a term in the damage formula; it acts
 * only by moving this number.
 */
function statAt(base, level) {
  assertLevel(level);
  return base + Math.floor((base * (level - 1)) / GROWTH_DIVISOR);
}

/** HP at a level: the standard curve plus a flat +L. */
function hpAt(base, level) {
  return statAt(base, level) + level;
}

/** Every stat of a mon at a level, HP handled by its own curve. */
function statsAt(stats, level) {
  return {
    hp: hpAt(stats.hp, level),
    atk: statAt(stats.atk, level),
    def: statAt(stats.def, level),
    spa: statAt(stats.spa, level),
    spd: statAt(stats.spd, level),
    spe: statAt(stats.spe, level),
  };
}

// ---------------------------------------------------------------------------
// Type effectiveness (SPEC.md sections 2-3)
// ---------------------------------------------------------------------------

/** Raw chart lookup for a single attacker/defender pair. Unlisted pairs are 1. */
function chartValue(attackType, defendType) {
  assertType(attackType);
  assertType(defendType);
  const row = CHART[attackType] || {};
  return Object.prototype.hasOwnProperty.call(row, defendType) ? row[defendType] : 1;
}

/** The percentage a single defending type contributes to the additive sum. */
function contribution(chartVal) {
  const pct = STACKING.contribution[String(chartVal)];
  if (pct === undefined) throw new SpecError(`no contribution defined for chart value ${chartVal}`);
  return pct;
}

/**
 * Type effectiveness of a move against a defender of one or two types, using
 * additive stacking.
 *
 * Immunity on either defending type short-circuits to 0 and cannot be
 * cancelled by a weakness on the other type. The summed percentage is clamped
 * at the floor before lookup, so future resistance sources cannot stack a
 * defender past 0.25x.
 *
 * @param {string} attackType
 * @param {string|string[]} defendTypes - one type, or [type1, type2]
 * @returns {number} 0, 0.25, 0.5, 1, 1.5, 2 or 3
 */
function effectiveness(attackType, defendTypes) {
  const defenders = (Array.isArray(defendTypes) ? defendTypes : [defendTypes]).filter(Boolean);
  if (defenders.length === 0 || defenders.length > 2) {
    throw new SpecError(`a defender has one or two types, got ${defenders.length}`);
  }

  const values = defenders.map((d) => chartValue(attackType, d));
  if (values.some((v) => v === 0)) return STACKING.immunityMultiplier;

  let sum = values.reduce((acc, v) => acc + contribution(v), 0);
  if (sum < STACKING.floorPercent) sum = STACKING.floorPercent;

  const multiplier = STACKING.table[String(sum)];
  if (multiplier === undefined) throw new SpecError(`no multiplier defined for sum ${sum}%`);
  return multiplier;
}

/** The full attacker-row of effectiveness against every single type. */
function coverage(attackType) {
  return Object.fromEntries(TYPES.map((d) => [d, effectiveness(attackType, d)]));
}

/** How every attacking type fares against a given defender. */
function matchups(defendTypes) {
  return Object.fromEntries(TYPES.map((a) => [a, effectiveness(a, defendTypes)]));
}

// ---------------------------------------------------------------------------
// STAB (SPEC.md section 4)
// ---------------------------------------------------------------------------

/**
 * Same-type attack bonus for a user of the given type(s) using a move of
 * moveType. Mono-types get 1.5x on their one type; dual-types get 1.25x on
 * either of theirs.
 */
function stab(moveType, userTypes) {
  const types = (Array.isArray(userTypes) ? userTypes : [userTypes]).filter(Boolean);
  if (types.length === 0 || types.length > 2) {
    throw new SpecError(`a user has one or two types, got ${types.length}`);
  }
  assertType(moveType);
  types.forEach(assertType);

  if (!types.includes(moveType)) return 1;
  return types.length === 1 ? STAB.mono : STAB.dual;
}

/** Everything the spec says multiplies a hit, combined. */
function attackMultiplier(moveType, userTypes, defendTypes) {
  return stab(moveType, userTypes) * effectiveness(moveType, defendTypes);
}

// ---------------------------------------------------------------------------
// Roster access
// ---------------------------------------------------------------------------

const MONS = monData.mons;
const ABILITIES = abilityData.abilities;

const monById = (id) => MONS.find((m) => m.engine.id === id);
const monByName = (name) =>
  MONS.find((m) => m.engine.name.toLowerCase() === String(name).toLowerCase());
const abilityById = (id) => ABILITIES.find((a) => a.id === id);

/** The declared types of a mon, as an array of one or two. */
const typesOf = (mon) => [mon.engine.type1, mon.engine.type2].filter(Boolean);

/** Walk an evolution line from any member of it, first stage first. */
function evolutionLine(idOrName) {
  let mon = typeof idOrName === 'number' ? monById(idOrName) : monByName(idOrName);
  if (!mon) throw new SpecError(`no such mon: ${idOrName}`);

  while (mon.engine.evolvesFrom) {
    const prev = monById(mon.engine.evolvesFrom.id);
    if (!prev) break;
    mon = prev;
  }

  const line = [mon];
  while (line[line.length - 1].engine.evolvesInto) {
    const next = monById(line[line.length - 1].engine.evolvesInto.id);
    if (!next || line.includes(next)) break;
    line.push(next);
  }
  return line;
}

module.exports = {
  TYPES,
  CHART,
  STACKING,
  STAB,
  STAGE_TOTALS,
  MIN_LEVEL,
  MAX_LEVEL,
  GROWTH_DIVISOR,
  SpecError,
  MONS,
  ABILITIES,
  typeData,
  abilityData,
  monData,
  statAt,
  hpAt,
  statsAt,
  chartValue,
  effectiveness,
  coverage,
  matchups,
  stab,
  attackMultiplier,
  monById,
  monByName,
  abilityById,
  typesOf,
  evolutionLine,
};
