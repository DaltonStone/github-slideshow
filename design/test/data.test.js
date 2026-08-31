import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import * as M from '../lib/rules.js';

const here = dirname(fileURLToPath(import.meta.url));
const SPEC = readFileSync(join(here, '..', 'SPEC.md'), 'utf8');

// ---------------------------------------------------------------------------
// types.json
// ---------------------------------------------------------------------------

test('there are exactly ten types and they are unique', () => {
  assert.equal(M.TYPES.length, 10);
  assert.equal(new Set(M.TYPES).size, 10);
});

test('every type belongs to exactly one origin', () => {
  const seen = new Map();
  for (const [origin, types] of Object.entries(M.typeData.origins)) {
    for (const t of types) {
      assert.ok(M.TYPES.includes(t), `origin ${origin} names unknown type ${t}`);
      assert.ok(!seen.has(t), `${t} is in both ${seen.get(t)} and ${origin}`);
      seen.set(t, origin);
    }
  }
  for (const t of M.TYPES) {
    assert.ok(seen.has(t), `${t} has no origin`);
  }
});

test('the stacking table covers every sum the chart can produce', () => {
  const seen = new Set();
  for (const atk of M.TYPES) {
    for (const d1 of M.TYPES) {
      for (const d2 of M.TYPES) {
        const vals = [M.chartValue(atk, d1), M.chartValue(atk, d2)];
        if (vals.includes(0)) continue;
        seen.add(vals.reduce((a, v) => a + M.STACKING.contribution[String(v)], 0));
      }
    }
  }
  for (const sum of seen) {
    assert.ok(M.STACKING.table[String(sum)] !== undefined, `no multiplier for ${sum}%`);
  }
});

test('the stacking table has no unreachable rows', () => {
  const reachable = new Set([200, 100, 50, 0, -50, -100]);
  for (const key of Object.keys(M.STACKING.table)) {
    assert.ok(reachable.has(Number(key)), `${key}% is not reachable by two types`);
  }
});

test('the floor is the lowest entry in the table', () => {
  const sums = Object.keys(M.STACKING.table).map(Number);
  assert.equal(Math.min(...sums), M.STACKING.floorPercent);
});

test('STAB values match the spec', () => {
  assert.equal(M.STAB.mono, 1.5);
  assert.equal(M.STAB.dual, 1.25);
});

// ---------------------------------------------------------------------------
// abilities.json
// ---------------------------------------------------------------------------

test('ability ids are unique and kebab-case', () => {
  const ids = M.ABILITIES.map((a) => a.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) {
    assert.match(id, /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/, `bad id: ${id}`);
  }
});

test('every ability has a name, a category and a non-empty effect', () => {
  const categories = new Set([
    'signature', 'stat-bump', 'immunity', 'absorb', 'tempo', 'survival', 'hook', 'chaos',
  ]);
  for (const a of M.ABILITIES) {
    assert.ok(a.name, `${a.id} has no name`);
    assert.ok(categories.has(a.category), `${a.id} has unknown category ${a.category}`);
    assert.ok(a.effect && a.effect.trim().length > 0, `${a.id} has no effect text`);
  }
});

test('signature abilities name a real type', () => {
  for (const a of M.ABILITIES.filter((x) => x.category === 'signature')) {
    assert.ok(M.TYPES.includes(a.signatureType), `${a.id}: ${a.signatureType}`);
  }
});

test('the three starter signatures exist', () => {
  for (const id of ['kindling', 'tidewater', 'bedrock']) {
    assert.ok(M.abilityById(id), `missing signature ${id}`);
  }
});

test('conflictsWith only names real abilities and is symmetric', () => {
  for (const a of M.ABILITIES) {
    for (const other of a.conflictsWith || []) {
      const o = M.abilityById(other);
      assert.ok(o, `${a.id} conflicts with unknown ${other}`);
      assert.ok((o.conflictsWith || []).includes(a.id),
        `${a.id} -> ${other} conflict is not declared in both directions`);
    }
  }
});

test('every ability name in the data appears in the spec prose', () => {
  for (const a of M.ABILITIES) {
    assert.ok(SPEC.includes(a.name), `${a.name} is in the data but not in SPEC.md`);
  }
});

// ---------------------------------------------------------------------------
// mons.json -- tab 1, engine
// ---------------------------------------------------------------------------

const STAT_KEYS = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];

test('mon ids are unique positive integers', () => {
  const ids = M.MONS.map((m) => m.engine.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.ok(Number.isInteger(id) && id > 0, `bad id ${id}`);
});

test('mon names are unique and non-empty', () => {
  const names = M.MONS.map((m) => m.engine.name);
  assert.equal(new Set(names).size, names.length);
  for (const n of names) assert.ok(n && n.trim().length > 0);
});

test('every mon has a valid primary type, and a distinct secondary if any', () => {
  for (const m of M.MONS) {
    const e = m.engine;
    assert.ok(M.TYPES.includes(e.type1), `${e.name}: bad type1 ${e.type1}`);
    if (e.type2 !== null) {
      assert.ok(M.TYPES.includes(e.type2), `${e.name}: bad type2 ${e.type2}`);
      assert.notEqual(e.type2, e.type1, `${e.name} is dual-typed with the same type twice`);
    }
  }
});

test('a mon origin matches the origin of its primary type', () => {
  const originOf = {};
  for (const [origin, types] of Object.entries(M.typeData.origins)) {
    for (const t of types) originOf[t] = origin;
  }
  for (const m of M.MONS) {
    assert.equal(m.engine.origin, originOf[m.engine.type1],
      `${m.engine.name} is ${m.engine.origin} but ${m.engine.type1} is ${originOf[m.engine.type1]}`);
  }
});

test('every mon has all six stats as positive integers', () => {
  for (const m of M.MONS) {
    for (const k of STAT_KEYS) {
      const v = m.engine.stats[k];
      assert.ok(Number.isInteger(v) && v > 0, `${m.engine.name}.${k} = ${v}`);
    }
  }
});

test('the declared total equals the sum of the six stats', () => {
  for (const m of M.MONS) {
    const sum = STAT_KEYS.reduce((a, k) => a + m.engine.stats[k], 0);
    assert.equal(sum, m.engine.total, `${m.engine.name}: stats sum to ${sum}, total says ${m.engine.total}`);
  }
});

test('the total matches the fixed budget for the evolution stage', () => {
  for (const m of M.MONS) {
    const expected = M.STAGE_TOTALS[m.engine.stage];
    assert.ok(expected !== undefined, `${m.engine.name}: unknown stage ${m.engine.stage}`);
    assert.equal(m.engine.total, expected,
      `${m.engine.name} is ${m.engine.stage} so its total must be ${expected}`);
  }
});

test('ability pools hold 3 to 5 real, non-repeated abilities', () => {
  for (const m of M.MONS) {
    const pool = m.engine.abilityPool;
    assert.ok(pool.length >= 3 && pool.length <= 5,
      `${m.engine.name} has ${pool.length} abilities, must be 3-5`);
    assert.equal(new Set(pool).size, pool.length, `${m.engine.name} repeats an ability`);
    for (const id of pool) {
      assert.ok(M.abilityById(id), `${m.engine.name} has unknown ability ${id}`);
    }
  }
});

test('no ability pool offers both halves of a contradictory pair', () => {
  for (const m of M.MONS) {
    for (const id of m.engine.abilityPool) {
      for (const other of M.abilityById(id).conflictsWith || []) {
        assert.ok(!m.engine.abilityPool.includes(other),
          `${m.engine.name} offers both ${id} and ${other}`);
      }
    }
  }
});

test('a mon only carries a signature ability for a type it actually has', () => {
  for (const m of M.MONS) {
    for (const id of m.engine.abilityPool) {
      const a = M.abilityById(id);
      if (a.category !== 'signature') continue;
      assert.ok(M.typesOf(m).includes(a.signatureType),
        `${m.engine.name} has ${a.name} but is not ${a.signatureType}`);
    }
  }
});

test('learnsets are declared, and any empty one says why', () => {
  for (const m of M.MONS) {
    assert.ok(Array.isArray(m.engine.learnset), `${m.engine.name} has no learnset array`);
    if (m.engine.learnset.length === 0) {
      assert.ok(m.engine.learnsetStatus, `${m.engine.name} has an empty learnset and no status note`);
    }
  }
});

// ---------------------------------------------------------------------------
// mons.json -- evolution graph
// ---------------------------------------------------------------------------

test('evolution links point at real mons and agree in both directions', () => {
  for (const m of M.MONS) {
    const into = m.engine.evolvesInto;
    if (into) {
      const next = M.monById(into.id);
      assert.ok(next, `${m.engine.name} evolves into unknown id ${into.id}`);
      assert.deepEqual(
        { id: m.engine.id, method: into.method, level: into.level },
        { id: next.engine.evolvesFrom.id, method: next.engine.evolvesFrom.method, level: next.engine.evolvesFrom.level },
        `${m.engine.name} -> ${next.engine.name} link disagrees with the reverse link`);
    }
    const from = m.engine.evolvesFrom;
    if (from) {
      const prev = M.monById(from.id);
      assert.ok(prev, `${m.engine.name} evolves from unknown id ${from.id}`);
      assert.equal(prev.engine.evolvesInto.id, m.engine.id);
    }
  }
});

test('evolution levels are inside the level range and strictly increasing along a line', () => {
  for (const m of M.MONS) {
    const into = m.engine.evolvesInto;
    if (!into || into.method !== 'level') continue;
    assert.ok(into.level >= M.MIN_LEVEL && into.level <= M.MAX_LEVEL,
      `${m.engine.name} evolves at L${into.level}`);
    const from = m.engine.evolvesFrom;
    if (from && from.method === 'level') {
      assert.ok(into.level > from.level,
        `${m.engine.name} evolves into something at L${into.level} but came from L${from.level}`);
    }
  }
});

test('stages advance along an evolution line', () => {
  const order = { basic: 0, evolved: 1, final: 2 };
  for (const m of M.MONS) {
    const into = m.engine.evolvesInto;
    if (!into) continue;
    const next = M.monById(into.id);
    assert.equal(order[next.engine.stage], order[m.engine.stage] + 1,
      `${m.engine.name} (${m.engine.stage}) -> ${next.engine.name} (${next.engine.stage})`);
  }
});

test('a final-stage mon evolves into nothing, and a basic one comes from nothing', () => {
  for (const m of M.MONS) {
    if (m.engine.stage === 'final') assert.equal(m.engine.evolvesInto, null, m.engine.name);
    if (m.engine.stage === 'basic') assert.equal(m.engine.evolvesFrom, null, m.engine.name);
  }
});

test('every stat is non-decreasing across an evolution', () => {
  for (const m of M.MONS) {
    if (!m.engine.evolvesInto) continue;
    const next = M.monById(m.engine.evolvesInto.id);
    for (const k of STAT_KEYS) {
      assert.ok(next.engine.stats[k] >= m.engine.stats[k],
        `${m.engine.name} -> ${next.engine.name}: ${k} drops from ${m.engine.stats[k]} to ${next.engine.stats[k]}`);
    }
  }
});

test('an evolution keeps its primary type and never loses a type', () => {
  // A line's identity is its first type; a second type may be gained on
  // evolving (all three starters gain one at final stage) but nothing is ever
  // dropped or swapped out from under the player.
  for (const m of M.MONS) {
    if (!m.engine.evolvesInto) continue;
    const next = M.monById(m.engine.evolvesInto.id);
    assert.equal(next.engine.type1, m.engine.type1,
      `${m.engine.name} -> ${next.engine.name} changes its primary type`);
    for (const t of M.typesOf(m)) {
      assert.ok(M.typesOf(next).includes(t),
        `${next.engine.name} lost the ${t} type it had as ${m.engine.name}`);
    }
  }
});

test('only a final stage is dual-typed', () => {
  for (const m of M.MONS) {
    if (m.engine.type2 === null) continue;
    assert.equal(m.engine.stage, 'final',
      `${m.engine.name} is dual-typed at the ${m.engine.stage} stage`);
  }
});

test('a dual-typed final stage really does trade STAB for coverage', () => {
  for (const m of M.MONS.filter((x) => x.engine.type2)) {
    const types = M.typesOf(m);
    assert.equal(M.stab(types[0], types), 1.25);
    assert.equal(M.stab(types[1], types), 1.25);
    // strictly worse on its original type than its own pre-evolution was
    const prev = M.monById(m.engine.evolvesFrom.id);
    assert.ok(M.stab(types[0], types) < M.stab(types[0], M.typesOf(prev)),
      `${m.engine.name} should lose peak STAB on ${types[0]} in exchange for coverage`);
  }
});

test('an evolution never loses an ability from its pool', () => {
  for (const m of M.MONS) {
    if (!m.engine.evolvesInto) continue;
    const next = M.monById(m.engine.evolvesInto.id);
    for (const id of m.engine.abilityPool) {
      assert.ok(next.engine.abilityPool.includes(id),
        `${next.engine.name} lost ${id} from ${m.engine.name}'s pool`);
    }
  }
});

test('the three starter lines each resolve to three stages', () => {
  for (const name of ['Emberkit', 'Rillet', 'Loambit']) {
    const line = M.evolutionLine(name);
    assert.equal(line.length, 3, `${name}'s line has ${line.length} stages`);
    assert.deepEqual(line.map((m) => m.engine.stage), ['basic', 'evolved', 'final']);
  }
});

test('the starters sit on the elemental cycle', () => {
  const starters = [1, 2, 3].map((id) => M.monById(id));
  assert.deepEqual(starters.map((m) => m.engine.type1), ['Fire', 'Water', 'Earth']);
  // each starter beats exactly one of the others and loses to exactly one
  for (const a of starters) {
    const others = starters.filter((m) => m !== a);
    const beats = others.filter((b) => M.effectiveness(a.engine.type1, b.engine.type1) === 2);
    const losesTo = others.filter((b) => M.effectiveness(b.engine.type1, a.engine.type1) === 2);
    assert.equal(beats.length, 1, `${a.engine.name} beats ${beats.length} of the others`);
    assert.equal(losesTo.length, 1, `${a.engine.name} loses to ${losesTo.length} of the others`);
  }
});

test('the three starters have the identical base total', () => {
  const totals = [1, 2, 3].map((id) => M.monById(id).engine.total);
  assert.deepEqual(totals, [105, 105, 105]);
});

test('each starter is shaped like its type default', () => {
  const fire = M.monById(1).engine.stats;   // fast physical, frail
  assert.ok(fire.spe > fire.hp && fire.spe > fire.def, 'Fire starter is not fast');
  assert.ok(fire.atk > fire.spa, 'Fire starter is not physical');

  const water = M.monById(2).engine.stats;  // balanced, special-leaning
  assert.ok(water.spa > water.atk, 'Water starter is not special-leaning');

  const earth = M.monById(3).engine.stats;  // bulky slow physical
  assert.ok(earth.atk > earth.spa, 'Earth starter is not physical');
  assert.ok(earth.def > earth.spe, 'Earth starter is not bulky and slow');
});

// ---------------------------------------------------------------------------
// mons.json -- tab 2 (dex) and tab 3 (misc)
// ---------------------------------------------------------------------------

test('no mon has more than seven dex entries', () => {
  for (const m of M.MONS) {
    assert.ok(m.dex.entries.length <= 7,
      `${m.engine.name} has ${m.dex.entries.length} dex entries, max is 7`);
  }
});

test('dex entry thresholds are declared, ascending and drawn from the catch ladder', () => {
  const ladder = M.monData.catchThresholds;
  assert.deepEqual([...ladder].sort((a, b) => a - b), ladder, 'catchThresholds is not ascending');
  for (const m of M.MONS) {
    let prev = 0;
    for (const e of m.dex.entries) {
      assert.ok(ladder.includes(e.threshold),
        `${m.engine.name}: threshold ${e.threshold} is not on the catch ladder`);
      assert.ok(e.threshold > prev, `${m.engine.name}: thresholds are not ascending`);
      prev = e.threshold;
      assert.ok(e.text && e.text.trim().length > 0, `${m.engine.name}: empty dex entry`);
    }
  }
});

test('the first dex entry unlocks on the first catch', () => {
  for (const m of M.MONS) {
    if (m.dex.entries.length === 0) continue;
    assert.equal(m.dex.entries[0].threshold, 1,
      `${m.engine.name}'s first entry needs ${m.dex.entries[0].threshold} catches`);
  }
});

test('every mon fills in the rest of the dex tab', () => {
  for (const m of M.MONS) {
    assert.ok(m.dex.whereFound, `${m.engine.name} has no whereFound`);
    assert.ok(m.dex.evolutionNotes, `${m.engine.name} has no evolutionNotes`);
    const od = m.dex.originDetail;
    assert.ok(od && od.value, `${m.engine.name} has no originDetail`);
    assert.ok(['birth-group', 'material', 'manifest-condition'].includes(od.kind),
      `${m.engine.name}: originDetail.kind is ${od.kind}`);
  }
});

test('origin detail kind matches the mon origin', () => {
  const expected = { Natural: 'birth-group', Made: 'material', Spirit: 'manifest-condition' };
  for (const m of M.MONS) {
    assert.equal(m.dex.originDetail.kind, expected[m.engine.origin],
      `${m.engine.name} is ${m.engine.origin} so originDetail.kind should be ${expected[m.engine.origin]}`);
  }
});

test('gender ratios sum to 1 where present, and castes are the alternative', () => {
  for (const m of M.MONS) {
    const { genderRatio, castes } = m.misc;
    assert.ok(!(genderRatio && castes), `${m.engine.name} has both a gender ratio and castes`);
    if (genderRatio) {
      const sum = genderRatio.male + genderRatio.female;
      assert.ok(Math.abs(sum - 1) < 1e-9, `${m.engine.name}: gender ratio sums to ${sum}`);
    }
  }
});

test('relatedMons only names real mons, never itself', () => {
  for (const m of M.MONS) {
    for (const rel of m.misc.relatedMons) {
      assert.ok(M.monById(rel.id), `${m.engine.name} relates to unknown id ${rel.id}`);
      assert.notEqual(rel.id, m.engine.id, `${m.engine.name} relates to itself`);
      assert.ok(['prey', 'predator', 'rival', 'symbiont'].includes(rel.relation),
        `${m.engine.name}: unknown relation ${rel.relation}`);
    }
  }
});

// ---------------------------------------------------------------------------
// data vs. spec prose
// ---------------------------------------------------------------------------

test('every mon in the data is named in the spec or reachable from a starter', () => {
  for (const m of M.MONS) {
    const inLine = M.evolutionLine(m.engine.id).some((x) => [1, 2, 3].includes(x.engine.id));
    assert.ok(SPEC.includes(m.engine.name) || inLine,
      `${m.engine.name} is orphaned: not in SPEC.md and not on a starter line`);
  }
});

test('the roster progress counts in the spec match the data', () => {
  const basics = M.MONS.filter((m) => m.engine.stage === 'basic').length;
  assert.match(SPEC, new RegExp(`Base creatures \\(excl\\. evolutions\\) \\| 60\\+ \\| ${basics} \\|`),
    `spec claims a different base-creature count than the ${basics} in the data`);
  assert.match(SPEC, new RegExp(`Total mons incl\\. evolutions \\| — \\| ${M.MONS.length} \\|`),
    `spec claims a different total than the ${M.MONS.length} in the data`);
  assert.match(SPEC, new RegExp(`Shared abilities \\| ~50–60 \\| ${M.ABILITIES.length} \\|`),
    `spec claims a different ability count than the ${M.ABILITIES.length} in the data`);
});

// ---------------------------------------------------------------------------
// generated data
// ---------------------------------------------------------------------------

test('lib/data.generated.js is in sync with data/*.json', () => {
  // The browser imports the generated module, Node reads the same thing.
  // If they drift, the game and the tests silently disagree. Run: npm run build
  const files = { 'types.json': M.typeData, 'abilities.json': M.abilityData, 'mons.json': M.monData };
  for (const [file, generated] of Object.entries(files)) {
    const onDisk = JSON.parse(readFileSync(join(here, '..', 'data', file), 'utf8'));
    assert.deepEqual(generated, onDisk,
      `data/${file} has changed since the last build -- run: npm run build`);
  }
});

test('the design docs have no duplicate or skipped section numbers', () => {
  // Both documents cross-reference each other by section number, so a
  // duplicated heading silently breaks a link that still looks fine.
  for (const file of ['SPEC.md', 'OPEN_QUESTIONS.md']) {
    const text = readFileSync(join(here, '..', file), 'utf8');
    const nums = [...text.matchAll(/^## (\d+)\./gm)].map((m) => Number(m[1]));
    assert.deepEqual(nums, [...new Set(nums)], `${file} has a duplicate section number`);
    assert.deepEqual(nums, [...nums].sort((a, b) => a - b), `${file} sections are out of order`);
    nums.forEach((n, i) => assert.equal(n, i + 1, `${file} jumps at section ${n}`));
  }
});

test('every section cross-reference points at a section that exists', () => {
  const docs = {};
  for (const file of ['SPEC.md', 'OPEN_QUESTIONS.md']) {
    docs[file] = readFileSync(join(here, '..', file), 'utf8');
  }
  for (const [file, text] of Object.entries(docs)) {
    for (const m of text.matchAll(/OPEN_QUESTIONS\.md[^§]{0,40}§(\d+)(?:\.(\d+))?/g)) {
      const head = m[2] ? `### ${m[1]}.${m[2]} ` : `## ${m[1]}. `;
      assert.ok(docs['OPEN_QUESTIONS.md'].includes(head),
        `${file} references OPEN_QUESTIONS §${m[1]}${m[2] ? '.' + m[2] : ''} which does not exist`);
    }
  }
});
