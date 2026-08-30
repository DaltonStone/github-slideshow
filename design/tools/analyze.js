#!/usr/bin/env node
/**
 * Prints the type-chart balance analysis quoted in OPEN_QUESTIONS.md section 1,
 * plus the growth curve landmarks. Everything here is derived from data/ --
 * re-run it after any chart change and update the doc.
 *
 *   node design/tools/analyze.js
 */

import * as M from '../lib/rules.js';

const pad = (s, n) => String(s).padEnd(n);
const rule = (t) => console.log(`\n=== ${t} ===`);

// --- full chart -------------------------------------------------------------

rule('TYPE CHART (attacker rows, defender columns)');
const abbr = (t) => t.slice(0, 3);
console.log(pad('', 9) + M.TYPES.map((t) => pad(abbr(t), 5)).join(''));
for (const a of M.TYPES) {
  const cells = M.TYPES.map((d) => {
    const v = M.chartValue(a, d);
    return pad(v === 1 ? '.' : String(v), 5);
  });
  console.log(pad(a, 9) + cells.join(''));
}

// --- defensive --------------------------------------------------------------

rule('DEFENSIVE PROFILE (as a mono-type)');
console.log(pad('type', 9), pad('weak', 5), pad('resist', 7), pad('immune', 7), 'score');
const def = M.TYPES.map((d) => {
  const weak = M.TYPES.filter((a) => M.chartValue(a, d) === 2).length;
  const resist = M.TYPES.filter((a) => M.chartValue(a, d) === 0.5).length;
  const immune = M.TYPES.filter((a) => M.chartValue(a, d) === 0).length;
  return { d, weak, resist, immune, score: resist + 2 * immune - weak };
});
def.sort((x, y) => y.score - x.score).forEach((r) =>
  console.log(pad(r.d, 9), pad(r.weak, 5), pad(r.resist, 7), pad(r.immune, 7),
    (r.score > 0 ? '+' : '') + r.score));

// --- offensive --------------------------------------------------------------

rule('OFFENSIVE PROFILE');
console.log(pad('type', 9), pad('2x', 5), pad('0.5x', 7), pad('0x', 7), 'score');
const off = M.TYPES.map((a) => {
  const se = M.TYPES.filter((d) => M.chartValue(a, d) === 2).length;
  const ne = M.TYPES.filter((d) => M.chartValue(a, d) === 0.5).length;
  const im = M.TYPES.filter((d) => M.chartValue(a, d) === 0).length;
  return { a, se, ne, im, score: se - ne - 2 * im };
});
off.sort((x, y) => y.score - x.score).forEach((r) =>
  console.log(pad(r.a, 9), pad(r.se, 5), pad(r.ne, 7), pad(r.im, 7),
    (r.score > 0 ? '+' : '') + r.score));

// --- extremes of additive stacking -----------------------------------------

rule('ADDITIVE STACKING EXTREMES');
const pairs = [];
for (let i = 0; i < M.TYPES.length; i++) {
  for (let j = i + 1; j < M.TYPES.length; j++) pairs.push([M.TYPES[i], M.TYPES[j]]);
}
const combos = M.TYPES.length * pairs.length;
const spikes = [];
for (const a of M.TYPES) {
  for (const p of pairs) if (M.effectiveness(a, p) === 3) spikes.push(`${a} vs ${p.join('/')}`);
}
console.log(`3.0x pairings: ${spikes.length} of ${combos} attacker x dual-type combos ` +
  `(${((spikes.length / combos) * 100).toFixed(1)}%)`);
const byAttacker = {};
for (const s of spikes) {
  const a = s.split(' ')[0];
  byAttacker[a] = (byAttacker[a] || 0) + 1;
}
console.log('  by attacker:', Object.entries(byAttacker)
  .sort((x, y) => y[1] - x[1]).map(([k, v]) => `${k} ${v}`).join(', '));

const noWeakness = pairs.filter((p) =>
  Math.max(...M.TYPES.map((a) => M.effectiveness(a, p))) <= 1);
console.log(`dual types with no weakness at all: ${noWeakness.length ? noWeakness.map((p) => p.join('/')).join(', ') : 'none'}`);

// --- growth -----------------------------------------------------------------

rule('GROWTH CURVE');
console.log('multiplier on base by level:');
for (const l of [1, 17, 34, 50, 67, 84, 99]) {
  console.log(`  L${pad(l, 3)} stat x${(M.statAt(1000, l) / 1000).toFixed(2)}`);
}
const finals = M.MONS.filter((m) => m.engine.stage === 'final');
const topAtk = Math.max(...finals.map((m) => m.engine.stats.atk));
const topHp = Math.max(...finals.map((m) => m.engine.stats.hp));
console.log(`\nhighest final-stage ATK base in roster: ${topAtk} -> ${M.statAt(topAtk, 99)} at L99`);
console.log(`highest final-stage HP  base in roster: ${topHp} -> ${M.hpAt(topHp, 99)} at L99`);

// --- starter triangle -------------------------------------------------------

rule('STARTER TRIANGLE AT FINAL STAGE');
const starters = [1, 2, 3].map((id) => M.evolutionLine(id));
const trio = starters.map((line) => line[line.length - 1]);

for (const f of trio) {
  const t = M.typesOf(f);
  const m = M.matchups(t);
  const at = (v) => M.TYPES.filter((a) => m[a] === v);
  console.log(`\n${f.engine.name} (${t.join('/')})`);
  for (const v of [3, 2, 1.5, 1, 0.5, 0.25, 0]) {
    const list = at(v);
    if (list.length) console.log(`  ${pad(v + 'x', 6)} ${list.join(', ')}`);
  }
}

console.log('\nbest each can do to each, using only its own STAB types:');
let cyclic = true;
for (const a of trio) {
  for (const d of trio) {
    if (a === d) continue;
    const best = M.typesOf(a)
      .map((t) => [t, M.effectiveness(t, M.typesOf(d))])
      .sort((x, y) => y[1] - x[1])[0];
    console.log(`  ${pad(a.engine.name, 11)} -> ${pad(d.engine.name, 11)} ${best[1]}x via ${best[0]}`);
  }
}
// a clean cycle means each beats exactly one of the other two
for (const a of trio) {
  const beats = finals.filter((d) => d !== a &&
    Math.max(...M.typesOf(a).map((t) => M.effectiveness(t, M.typesOf(d)))) > 1).length;
  if (beats !== 1) cyclic = false;
}
console.log(`\n  cycle intact: ${cyclic ? 'yes' : 'NO -- see OPEN_QUESTIONS.md section 1.5'}`);

// --- roster -----------------------------------------------------------------

rule('ROSTER');
console.log(`mons: ${M.MONS.length} (${M.MONS.filter((m) => m.engine.stage === 'basic').length} base creatures, target 60+)`);
console.log(`abilities: ${M.ABILITIES.length} (target 50-60)`);
const noMoves = M.MONS.filter((m) => m.engine.learnset.length === 0).length;
console.log(`mons with no learnset yet: ${noMoves} of ${M.MONS.length}`);
for (const id of [1, 2, 3]) {
  console.log(`  line: ${M.evolutionLine(id).map((m) => `${m.engine.name} (${m.engine.total})`).join(' -> ')}`);
}
