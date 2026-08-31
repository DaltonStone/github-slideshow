/**
 * Reference statlines for tests.
 *
 * The roster is currently all concept entries -- names, typings and evolution
 * links are real, stats are not authored yet. Tests that exist to pin down the
 * *rules* (damage scaling, the energy floor, hits-to-KO) still need concrete
 * numbers, so they use these instead of reaching into the roster.
 *
 * These are NOT roster data and must never be treated as such. They are the
 * shapes the rules have to behave sensibly for: a fast frail attacker and a
 * slow bulky one, both at a final-stage budget of 170.
 */

/** Fast, frail, physical. Final-stage budget. */
export const GLASS = { hp: 22, atk: 40, def: 20, spa: 22, spd: 19, spe: 47 };

/** Slow, bulky, physical. Final-stage budget. */
export const TANK = { hp: 35, atk: 38, def: 37, spa: 15, spd: 24, spe: 21 };

/** Balanced, special-leaning. Final-stage budget. */
export const SUPPORT = { hp: 29, atk: 24, def: 28, spa: 33, spd: 33, spe: 23 };

/** Basic-stage budget, 105. */
export const BASIC = { hp: 15, atk: 22, def: 13, spa: 15, spd: 13, spe: 27 };

export const FINAL_TOTAL = 170;
export const BASIC_TOTAL = 105;
