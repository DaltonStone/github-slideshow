'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const M = require('../lib/mons.js');

// ---------------------------------------------------------------------------
// Stat growth (SPEC.md section 5)
// ---------------------------------------------------------------------------

test('a stat is exactly its base at level 1', () => {
  for (const base of [1, 10, 22, 47, 100]) {
    assert.equal(M.statAt(base, 1), base);
  }
});

test('a stat is exactly 2x base at L34 and 3x at L67', () => {
  for (const base of [10, 22, 33, 47]) {
    assert.equal(M.statAt(base, 34), base * 2);
    assert.equal(M.statAt(base, 67), base * 3);
  }
});

test('growth is monotonic across the whole level range', () => {
  for (const base of [10, 22, 47]) {
    for (let l = 2; l <= M.MAX_LEVEL; l++) {
      assert.ok(M.statAt(base, l) >= M.statAt(base, l - 1),
        `base ${base} went down from L${l - 1} to L${l}`);
    }
  }
});

test('HP is the standard curve plus a flat level', () => {
  for (const base of [15, 22, 35]) {
    for (const l of [1, 17, 34, 50, 99]) {
      assert.equal(M.hpAt(base, l), M.statAt(base, l) + l);
    }
  }
});

test('HP grows faster than any other stat from the same base', () => {
  assert.ok(M.hpAt(22, 99) > M.statAt(22, 99));
});

test('levels outside 1..99 are rejected', () => {
  for (const bad of [0, -1, 100, 1.5, '34', null]) {
    assert.throws(() => M.statAt(20, bad), M.SpecError);
  }
});

test('statsAt applies the HP curve only to HP', () => {
  const base = { hp: 15, atk: 22, def: 13, spa: 15, spd: 13, spe: 27 };
  const at50 = M.statsAt(base, 50);
  assert.equal(at50.hp, M.statAt(15, 50) + 50);
  assert.equal(at50.atk, M.statAt(22, 50));
  assert.equal(at50.spe, M.statAt(27, 50));
});

// ---------------------------------------------------------------------------
// Type chart (SPEC.md section 2)
// ---------------------------------------------------------------------------

test('the chart only ever contains 2, 0.5 or 0', () => {
  for (const [atk, row] of Object.entries(M.CHART)) {
    for (const [def, v] of Object.entries(row)) {
      assert.ok([2, 0.5, 0].includes(v), `${atk} -> ${def} is ${v}`);
    }
  }
});

test('every type named in the chart is a real type', () => {
  for (const [atk, row] of Object.entries(M.CHART)) {
    assert.ok(M.TYPES.includes(atk), `unknown attacker ${atk}`);
    for (const def of Object.keys(row)) {
      assert.ok(M.TYPES.includes(def), `unknown defender ${def}`);
    }
  }
});

test('unlisted pairs are normal damage', () => {
  assert.equal(M.chartValue('Normal', 'Fire'), 1);
  assert.equal(M.chartValue('Steel', 'Phantom'), 1);
  assert.equal(M.chartValue('Dragon', 'Normal'), 1);
});

test('the elemental cycle is a clean one-way trade', () => {
  const cycle = [['Water', 'Fire'], ['Fire', 'Earth'], ['Earth', 'Water']];
  for (const [strong, weak] of cycle) {
    assert.equal(M.chartValue(strong, weak), 2, `${strong} -> ${weak}`);
    assert.equal(M.chartValue(weak, strong), 0.5, `${weak} -> ${strong}`);
  }
});

test('the spirit cycle is a clean one-way trade', () => {
  const cycle = [['Psychic', 'Light'], ['Light', 'Dark'], ['Dark', 'Psychic']];
  for (const [strong, weak] of cycle) {
    assert.equal(M.chartValue(strong, weak), 2, `${strong} -> ${weak}`);
    assert.equal(M.chartValue(weak, strong), 0.5, `${weak} -> ${strong}`);
  }
});

test('Normal has no super-effective matchup anywhere', () => {
  for (const def of M.TYPES) {
    assert.notEqual(M.chartValue('Normal', def), 2, `Normal -> ${def}`);
  }
});

test('Normal and Phantom are mutually immune', () => {
  assert.equal(M.chartValue('Normal', 'Phantom'), 0);
  assert.equal(M.chartValue('Phantom', 'Normal'), 0);
});

test('Normal is also immune to Psychic', () => {
  assert.equal(M.chartValue('Psychic', 'Normal'), 0);
});

test('Steel is the defensive anchor: soft to the elements, resists the rest', () => {
  for (const el of ['Fire', 'Water', 'Earth']) {
    assert.equal(M.chartValue(el, 'Steel'), 2, `${el} -> Steel`);
  }
  const resisters = M.TYPES.filter((a) => M.chartValue(a, 'Steel') === 0.5);
  assert.equal(resisters.length, 6);
});

test('Dragon beats and resists the whole elemental cycle', () => {
  for (const el of ['Fire', 'Water', 'Earth']) {
    assert.equal(M.chartValue('Dragon', el), 2, `Dragon -> ${el}`);
    assert.equal(M.chartValue(el, 'Dragon'), 0.5, `${el} -> Dragon`);
  }
});

test('every type can be hit for at least neutral by something', () => {
  for (const def of M.TYPES) {
    const best = Math.max(...M.TYPES.map((a) => M.chartValue(a, def)));
    assert.ok(best >= 1, `${def} is resisted or immune to everything`);
  }
});

test('every type has at least one weakness', () => {
  for (const def of M.TYPES) {
    const weak = M.TYPES.filter((a) => M.chartValue(a, def) === 2);
    assert.ok(weak.length >= 1, `${def} has no weakness`);
  }
});

// ---------------------------------------------------------------------------
// Additive dual-type stacking (SPEC.md section 3)
// ---------------------------------------------------------------------------

test('mono-type effectiveness maps straight off the chart', () => {
  assert.equal(M.effectiveness('Fire', 'Earth'), 2);
  assert.equal(M.effectiveness('Fire', 'Water'), 0.5);
  assert.equal(M.effectiveness('Fire', 'Normal'), 1);
  assert.equal(M.effectiveness('Normal', 'Phantom'), 0);
});

test('a single type in an array behaves as a mono-type', () => {
  assert.equal(M.effectiveness('Fire', ['Earth']), M.effectiveness('Fire', 'Earth'));
});

test('the four worked examples in the spec', () => {
  assert.equal(M.effectiveness('Fire', ['Earth', 'Steel']), 3.0);   // +200
  assert.equal(M.effectiveness('Fire', ['Steel', 'Dragon']), 1.5);  // +50
  assert.equal(M.effectiveness('Steel', ['Fire', 'Water']), 0.25);  // -100
  assert.equal(M.effectiveness('Psychic', ['Normal', 'Dragon']), 0); // immunity wins
});

test('weak plus neutral is the same 2.0x as a mono-type weakness', () => {
  assert.equal(M.effectiveness('Water', ['Fire', 'Normal']), 2.0);
  assert.equal(M.effectiveness('Water', 'Fire'), 2.0);
});

test('resist plus neutral is 0.5x', () => {
  assert.equal(M.effectiveness('Fire', ['Water', 'Normal']), 0.5);
});

test('immunity wins from either slot and cannot be cancelled by a weakness', () => {
  assert.equal(M.effectiveness('Phantom', ['Normal', 'Psychic']), 0);
  assert.equal(M.effectiveness('Phantom', ['Psychic', 'Normal']), 0);
  assert.equal(M.effectiveness('Normal', ['Phantom', 'Steel']), 0);
});

test('0.25x is the floor and 3.0x the ceiling across every possible matchup', () => {
  for (const atk of M.TYPES) {
    for (const d1 of M.TYPES) {
      for (const d2 of M.TYPES) {
        if (d1 === d2) continue;
        const e = M.effectiveness(atk, [d1, d2]);
        assert.ok([0, 0.25, 0.5, 1, 1.5, 2, 3].includes(e),
          `${atk} vs ${d1}/${d2} produced ${e}`);
      }
    }
  }
});

test('stacking is order-independent', () => {
  for (const atk of M.TYPES) {
    for (const d1 of M.TYPES) {
      for (const d2 of M.TYPES) {
        assert.equal(M.effectiveness(atk, [d1, d2]), M.effectiveness(atk, [d2, d1]));
      }
    }
  }
});

test('additive stacking never produces the 4x or 0.25x-from-multiplying cliffs', () => {
  // The point of additive stacking: a doubled weakness is 3x, not 4x.
  assert.equal(M.effectiveness('Fire', ['Earth', 'Steel']), 3.0);
  assert.notEqual(M.effectiveness('Fire', ['Earth', 'Steel']), 4.0);
});

test('a defender with zero or three types is rejected', () => {
  assert.throws(() => M.effectiveness('Fire', []), M.SpecError);
  assert.throws(() => M.effectiveness('Fire', ['Fire', 'Water', 'Earth']), M.SpecError);
});

test('unknown type names are rejected', () => {
  assert.throws(() => M.effectiveness('Grass', 'Fire'), M.SpecError);
  assert.throws(() => M.effectiveness('Fire', 'Grass'), M.SpecError);
});

// ---------------------------------------------------------------------------
// STAB (SPEC.md section 4)
// ---------------------------------------------------------------------------

test('mono-types get 1.5x on their own type only', () => {
  assert.equal(M.stab('Fire', 'Fire'), 1.5);
  assert.equal(M.stab('Water', 'Fire'), 1);
});

test('dual-types get 1.25x on either of their types', () => {
  assert.equal(M.stab('Fire', ['Fire', 'Steel']), 1.25);
  assert.equal(M.stab('Steel', ['Fire', 'Steel']), 1.25);
  assert.equal(M.stab('Water', ['Fire', 'Steel']), 1);
});

test('a dual-type trades peak power for coverage', () => {
  assert.ok(M.stab('Fire', ['Fire', 'Steel']) < M.stab('Fire', 'Fire'));
  const dualBonused = M.TYPES.filter((t) => M.stab(t, ['Fire', 'Steel']) > 1).length;
  const monoBonused = M.TYPES.filter((t) => M.stab(t, 'Fire') > 1).length;
  assert.equal(dualBonused, 2);
  assert.equal(monoBonused, 1);
});

// ---------------------------------------------------------------------------
// Combined multiplier
// ---------------------------------------------------------------------------

test('attackMultiplier is STAB times effectiveness', () => {
  assert.equal(M.attackMultiplier('Fire', 'Fire', ['Earth', 'Steel']), 1.5 * 3.0);
  assert.equal(M.attackMultiplier('Fire', ['Fire', 'Dark'], 'Water'), 1.25 * 0.5);
});

test('STAB cannot rescue an immunity', () => {
  assert.equal(M.attackMultiplier('Normal', 'Normal', 'Phantom'), 0);
});

// ---------------------------------------------------------------------------
// Coverage helpers
// ---------------------------------------------------------------------------

test('coverage and matchups cover every type', () => {
  assert.equal(Object.keys(M.coverage('Fire')).length, M.TYPES.length);
  assert.equal(Object.keys(M.matchups(['Fire', 'Steel'])).length, M.TYPES.length);
});

test('matchups agrees with effectiveness', () => {
  const m = M.matchups(['Earth', 'Steel']);
  for (const atk of M.TYPES) {
    assert.equal(m[atk], M.effectiveness(atk, ['Earth', 'Steel']));
  }
});
