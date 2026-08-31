# MONS — design

Working title. This directory holds the design for a creature-battler: the
prose spec, a machine-readable mirror of it, and a reference implementation of
the rules the spec actually pins down.

```
design/
  SPEC.md              canonical prose spec (v0.1)
  OPEN_QUESTIONS.md    what is unsettled, and the balance analysis behind it
  data/                machine-readable source -- types, abilities, mons
  lib/rules.js         the spec as code: types, stacking, STAB, stat curves
  lib/damage.js        the damage formula and crit -- PROPOSED
  lib/energy.js        energy, Struggle and the exhaustion KO -- PROPOSED
  lib/data.generated.js  generated from data/; do not edit
  test/                165 tests over the rules, data, formula and mechanics
  tools/               build steps, balance analysis, dev server
../game/               the playable page -- see game/README.md
```

## Run it

Node 18+, no dependencies.

```sh
cd design
npm test         # 165 tests
npm run analyze  # type-chart balance and growth analysis
npm run build    # regenerate lib/data.generated.js and game/index.html
npm run serve    # http://localhost:8080/game/
```

To just look at the thing, open `game/index.html` — it is self-contained and
needs no server.

## The idea in five rules

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
5. **Damage is `power × ATK²/(ATK+DEF) / 100`**, times the multipliers above.
   This one is a *proposal*, not spec — it is the piece v0.1 never stated. See
   [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §2.

## Reading order

Open `game/index.html` first — the numbers are easier to argue with than the
prose. Then [`SPEC.md`](SPEC.md) for the rules, and
[`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md), which is the document that actually
needs decisions: the damage formula and whether its modifier stack should cap,
and Dragon, the one type balanced by nothing but the word "rare".

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
[`test/damage.test.js`](test/damage.test.js) pins down the constraints the
formula was chosen to satisfy, so a future retune cannot quietly break them.

## Status

| | Target | Now |
|---|---|---|
| Creatures named | 60+ | 30 |
| Fully authored | 30 | 0 |
| Abilities | 50–60 | 31 |
| Moves | TBD | not started |
| Damage formula | — | **proposed, awaiting a decision** |
