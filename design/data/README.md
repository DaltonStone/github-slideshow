# data/

Machine-readable mirror of [`../SPEC.md`](../SPEC.md). Hand-edited JSON; the
tests in [`../test/data.test.js`](../test/data.test.js) are what keep it and the
prose in agreement. If you change one, run the tests.

| File | Holds |
|---|---|
| `types.json` | The ten types, their origins, the full chart, the additive stacking table, STAB values. |
| `abilities.json` | Every ability, with a category and prose effect. |
| `mons.json` | The roster, one object per mon. |

## types.json

`chart` is sparse: `chart[attacker][defender]` is `2`, `0.5` or `0`, and **any
pair not listed is `1`**. So a missing entry is meaningful, not an omission.

`stacking` encodes the additive rule as data rather than code: `contribution`
maps a chart value to the percentage a defending type contributes, and `table`
maps a summed percentage to a final multiplier. `floorPercent` clamps the sum
before lookup so future resistance sources cannot push a defender past 0.25×.
`immunityMultiplier` applies before the sum and cannot be cancelled.

## mons.json

Each mon is the three tabs of the template in `SPEC.md` §13, as three objects.

### `engine`

| Field | Notes |
|---|---|
| `id` | Unique positive integer. Starters are 1–3; their evolutions continue from 4. |
| `name` | Unique. All names are working titles. |
| `type1`, `type2` | `type2` is `null` for mono-types, never a repeat of `type1`. |
| `origin` | Must match the origin of `type1`. |
| `body` | One line of physical description. |
| `stage` | `basic` \| `evolved` \| `final`. Fixes the stat budget: 105 / 135 / 170. |
| `stats` | `hp, atk, def, spa, spd, spe`. Positive integers. `spe` is SPD (speed) — `spd` is SpD (special defence). |
| `total` | Must equal the sum of `stats`, and the budget for `stage`. |
| `abilityPool` | 3–5 ability ids. No contradictory pairs; a signature only on a mon of that type. |
| `learnset` | `{move, level}` objects. Empty everywhere in v0.1 — moves are TBD. |
| `learnsetStatus` | Required when `learnset` is empty; says why. |
| `evolvesFrom`, `evolvesInto` | `{id, method, level}` or `null`. Both directions must agree. |

Note the `spd` / `spe` collision: the spec's six stats are HP, ATK, DEF, SpA,
**SpD** and **SPD**, which collide when lowercased. The data uses `spd` for
special defence and `spe` for speed, which is the convention `lib/mons.js`
expects.

Invariants the tests enforce across an evolution: stats never decrease, typing
never changes, the ability pool is never lost (only added to), the stage
advances by exactly one, and the level increases.

### `dex`

Up to seven `entries`, each `{threshold, text}`, ascending, with thresholds
drawn from `catchThresholds` at the top of the file and the first always at 1.
Plus `whereFound`, `evolutionNotes`, and `originDetail` — whose `kind` follows
the mon's origin: `birth-group` for Natural, `material` for Made,
`manifest-condition` for Spirit.

### `misc`

`genderRatio` (summing to 1) **or** `castes`, never both; and `relatedMons`,
entries of `{id, relation}` with relation in prey / predator / rival / symbiont.

## Adding a mon

1. Add the object to `mons.json` with all three tabs.
2. Pick a `stage` and make the six stats sum to its budget.
3. Give it 3–5 abilities that exist in `abilities.json`.
4. Leave `learnset` empty with a `learnsetStatus` until moves exist.
5. Run `../run-tests.sh`. If it is on a starter line the counts in `SPEC.md`
   §10 will need updating too — a test checks them.
