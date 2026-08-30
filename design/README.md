# MONS — design

Working title. This directory holds the design for a creature-battler: the
prose spec, a machine-readable mirror of it, and a reference implementation of
the rules the spec actually pins down.

```
design/
  SPEC.md              canonical prose spec (v0.1)
  OPEN_QUESTIONS.md    what is unsettled, and the balance analysis behind it
  data/                machine-readable mirror -- types, abilities, mons
  lib/mons.js          reference implementation of the rules
  test/                80 tests over the rules and the data
  tools/analyze.js     type-chart balance + growth analysis
  run-tests.sh         runs everything
```

## Run it

Node 18+, no dependencies.

```sh
./design/run-tests.sh        # 80 tests
node design/tools/analyze.js # balance analysis
```

## The idea in four rules

1. **Ten types** on two rock-paper-scissors cycles — Water → Fire → Earth →
   Water, and Psychic → Light → Dark → Psychic — with Steel as a defensive
   anchor, Dragon as a rare heavyweight, and Normal as the mundane type that
   trades all offense for two immunities.
2. **Dual types stack additively, not multiplicatively.** Each defending type
   contributes +100% or −50%; the sum maps to a multiplier that peaks at 3.0×
   and floors at 0.25×. A doubled weakness is a spike, not a deletion.
3. **STAB rewards commitment.** Mono-types get 1.5× on their one type,
   dual-types 1.25× on either — peak power traded for coverage.
4. **Level is not in the damage formula.** It acts only through stats, so a
   level lead is worth exactly the stats it buys, and an underlevelled mon with
   a type advantage stays relevant.

## Reading order

Start with [`SPEC.md`](SPEC.md). Then [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md),
which is the more useful document right now — it lists what v0.1 leaves
undecided, most importantly that **the damage formula itself is not specified**,
and it flags Dragon as the one type balanced by nothing but the word "rare".

## How this stays honest

`SPEC.md` and `data/` are two views of one design, so they can drift. The tests
in [`test/data.test.js`](test/data.test.js) check them against each other: stat
totals against the per-stage budgets, ability pools against the real ability
list, evolution links in both directions, dex thresholds against the catch
ladder, and the progress counts in the spec's targets table against the actual
contents of `data/`. Two genuine inconsistencies were caught this way while
v0.1 was being written.

[`test/rules.test.js`](test/rules.test.js) covers the mechanics themselves,
including all four worked examples from `SPEC.md` §3 and an exhaustive sweep
over every attacker × dual-type combination.

## Status

| | Target | Now |
|---|---|---|
| Base creatures | 60+ | 3 |
| Total mons | — | 9 |
| Abilities | 50–60 | 28 |
| Moves | TBD | not started |
| Damage formula | — | **not specified** |
