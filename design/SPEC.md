# MONS (working title) — Design Spec

**Version:** 0.1
**Status:** Draft. Sections marked _TBD_ are not yet designed; sections marked
_provisional_ are filled in with a defensible default so the system can be
exercised, and are expected to change.

This document is the canonical prose spec. The machine-readable mirror lives in
[`data/`](data/) and is checked against this document by the tests in
[`test/`](test/). If the two ever disagree, that is a bug — fix both.

---

## 1. Types

Ten types:

| # | Type | Origin (flavor) |
|---|---------|---------|
| 1 | Normal  | Natural |
| 2 | Fire    | Natural |
| 3 | Water   | Natural |
| 4 | Earth   | Natural |
| 5 | Steel   | Made    |
| 6 | Psychic | Spirit  |
| 7 | Dark    | Spirit  |
| 8 | Light   | Spirit  |
| 9 | Dragon  | Natural |
| 10 | Phantom | Spirit |

**Origins** are flavor groupings, not a mechanic:

- **Natural** — Fire, Water, Earth, Normal, Dragon
- **Made** — Steel
- **Spirit** — Psychic, Dark, Light, Phantom

Origin drives dex lore (birth group / material / manifest condition), not damage.

---

## 2. Type chart

Attacker → defender. `2` = effective (+100%), `0.5` = ineffective (−50%),
`0` = immune, blank = normal (`1`).

| ATK ↓ / DEF → | Nml | Fir | Wat | Ear | Ste | Psy | Drk | Lgt | Drg | Pha |
|---|---|---|---|---|---|---|---|---|---|---|
| **Normal**  | – | – | – | – | 0.5 | – | – | – | – | **0** |
| **Fire**    | – | 0.5 | 0.5 | **2** | **2** | – | – | – | 0.5 | – |
| **Water**   | – | **2** | 0.5 | 0.5 | **2** | – | – | – | 0.5 | – |
| **Earth**   | – | 0.5 | **2** | 0.5 | **2** | – | – | – | 0.5 | – |
| **Steel**   | **2** | 0.5 | 0.5 | 0.5 | 0.5 | – | – | – | 0.5 | – |
| **Psychic** | **0** | – | – | – | 0.5 | 0.5 | 0.5 | **2** | **2** | – |
| **Dark**    | **2** | – | – | – | 0.5 | **2** | 0.5 | 0.5 | – | **2** |
| **Light**   | – | – | – | – | 0.5 | 0.5 | **2** | 0.5 | – | **2** |
| **Dragon**  | – | **2** | **2** | **2** | 0.5 | – | – | – | **2** | – |
| **Phantom** | **0** | – | – | – | – | **2** | 0.5 | – | – | **2** |

### Structure the chart encodes

- **Elemental cycle:** Water → Fire → Earth → Water. Each beats the next for 2×
  and is resisted by it for 0.5×, so every pair is a clean one-way trade.
- **Spirit cycle:** Psychic → Light → Dark → Psychic, resisting in the same
  mirrored way.
- **Steel** is the defensive anchor: it resists six types and is neutral to a
  seventh, but is soft to all three elements and has almost no offense of its
  own (2× on Normal only).
- **Dragon** hits the whole elemental cycle for 2× and resists all of it, and is
  checked only by Psychic and by other Dragons.
- **Normal** has no super-effective matchup anywhere — it is the "mundane" type,
  and it pays for that with two immunities of its own (Psychic and Phantom
  cannot touch it) while being soft to Steel and Dark.
- **Phantom** and Normal are mutually immune.

See [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §1 for balance notes on this chart.

---

## 3. Dual-type stacking: additive

Multiplicative stacking (the genre default) produces 4× and 0.25× cliffs that
make dual types swingy. MONS stacks **additively** instead.

Each defending type contributes a percentage:

| Chart value vs. that type | Contribution |
|---|---|
| 2 (effective)   | **+100%** |
| 1 (normal)      | **0%** |
| 0.5 (ineffective) | **−50%** |
| 0 (immune)      | immunity |

Sum the contributions of both defending types, then read off the multiplier:

| Sum | Multiplier | Reached by |
|---|---|---|
| +200% | **3.0×** | weak / weak |
| +100% | **2.0×** | weak / neutral, or mono-type weak |
| +50%  | **1.5×** | weak / resist |
| 0%    | **1.0×** | neutral / neutral, or mono-type neutral |
| −50%  | **0.5×** | resist / neutral, or mono-type resist |
| −100% | **0.25×** | resist / resist — **floor** |

**Immunity on either type is 0×, and always wins** — it is checked before the
sum and cannot be cancelled by a weakness on the other type.

The floor at −100% is stated explicitly so that future sources of resistance
(abilities, field effects, held items) cannot stack a defender past 0.25×.

Worked examples:

- Fire move vs. Earth/Steel: +100 (Earth) +100 (Steel) = +200% → **3.0×**
- Fire move vs. Steel/Dragon: +100 (Steel) −50 (Dragon) = +50% → **1.5×**
- Steel move vs. Fire/Water: −50 −50 = −100% → **0.25×**
- Psychic move vs. Normal/Dragon: Normal is immune → **0×**, despite Dragon's +100.

---

## 4. STAB (Same-Type Attack Bonus)

- **Mono-type:** 1.5× on moves of its own type.
- **Dual-type:** 1.25× on moves of *either* of its two types.

A dual type therefore trades peak power for coverage: it gets a smaller bonus,
but on twice as many move types. STAB is a property of the *user*, not the
target, and applies independently of type effectiveness.

---

## 5. Stats

Six stats: **HP, ATK, DEF, SpA, SpD, SPD**. Base numbers are deliberately small
(single- and double-digit), so that a +3 ability bump is a real decision rather
than rounding noise.

**Base stat totals** are fixed by evolution stage:

| Stage | Total |
|---|---|
| Basic (unevolved) | **105** |
| Evolved (middle)  | **135** |
| Final             | **170** |

Levels run **1–99**.

### Growth

```
stat(L) = base + floor(base * (L - 1) / 33)
HP(L)   = base + floor(base * (L - 1) / 33) + L
```

Landmarks: a stat is exactly `1×` base at L1, `2×` at L34, `3×` at L67, and
`≈3.97×` at L99. HP additionally gains a flat `+L`, which keeps low-HP mons from
being one-shot at high level and gently compresses the relative gap between
bulky and frail mons as the game goes on.

**Level is not a term in the damage formula.** Level acts only through stats.
This means a level advantage is worth exactly the stats it buys and nothing
more, and an underlevelled mon with a type advantage stays relevant.

---

## 6. Starters

Mono-type, and they **stay mono-type through evolution**.

| ID | Name | Type | HP | ATK | DEF | SpA | SpD | SPD | Total |
|---|---|---|---|---|---|---|---|---|---|
| #001 | Emberkit | Fire  | 15 | 22 | 13 | 15 | 13 | 27 | 105 |
| #002 | Rillet   | Water | 18 | 15 | 17 | 20 | 20 | 15 | 105 |
| #003 | Loambit  | Earth | 22 | 23 | 22 | 10 | 15 | 13 | 105 |

Names are working titles (§ [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §4). The
three starters sit on the elemental cycle, so the choice is a real
rock-paper-scissors commitment rather than a cosmetic one.

Their evolutions are specified in [`data/mons.json`](data/mons.json) — see §9.

---

## 7. Type stat defaults

Guides for authoring, **not rules**. A mon may deviate when its concept calls
for it; the defaults exist so that deviation reads as deliberate.

| Type | Default shape |
|---|---|
| Fire | Fast physical, frail. |
| Water | Balanced, special-leaning, sustain. |
| Earth | Bulky slow physical; field / area moves. |
| Normal | High HP, wide move access. |
| Steel | Max DEF, high ATK, very slow. |
| Psychic | Fast special, frail. |
| Dark | Mixed attacker; tricks and debuffs. |
| Light | Max SpD; healer / support. |
| Dragon | Even spread, rare. |
| Phantom | Evasive, low HP, high SpD. |

---

## 8. Abilities

Every mon has a **pool of 3–5** abilities, of which **one is active**.

### Starter signatures

| Ability | Type | Effect |
|---|---|---|
| **Kindling** | Fire | The first attack of the battle deals 1.5×. |
| **Tidewater** | Water | Heals 1/8 max HP at end of turn while above half HP. |
| **Bedrock** | Earth | Cannot be KO'd from full HP in one hit; survives at 1 HP. |

### Shared pool

**Stat bumps** — `Brawny` +3 ATK · `Sharp Mind` +3 SpA · `Thick Hide` +3 DEF ·
`Steady` +3 SpD · `Quick Feet` +3 SPD · `Overgrown` +10% max HP

**Immunities** — `Fireproof` (no burn) · `Anchored` (cannot be switched or
moved) · `Clear Head` (no confusion, no stat drops) · `Cold Blood` (immune to
Dark intimidate effects) · `Grounded` (immune to Earth hazards)

**Absorbs** — `Drink Deep` (Water heals) · `Ember Heart` (Fire heals) ·
`Mind Sponge` (Psychic hits raise SpA instead)

**Tempo** — `Ambush` (moves first the turn it enters) · `Slow Burn` (moves last,
+20% damage) · `Windup` (−3 SPD; every 3rd turn moves first)

**Survival** — `Last Stand` (below 1/3 HP: ATK and SpA +50%) · `Thorns` (a
contact attacker takes 1/8 of its own max HP) · `Grudge` (on being KO'd, the
killing move loses all remaining uses)

**Hook** — these come with a body of rules attached and mark a mon as belonging
to a special group:
`Colony` (has bodies instead of HP; each body lost is one fewer hit) ·
`Royal` (allied Swarm mons regain one body at end of turn) ·
`Built` (immune to poison, burn and sleep; takes 1.5× from Water) ·
`Unreal` (immune to Normal moves)

**Chaos** — `Lucky Day` (on any turn whose count is a multiple of 7: always
moves first, always crits)

Note that `Anchored` and `Ambush` are mutually contradictory, as are `Ambush`
and `Windup`; a single pool must not offer both of a contradictory pair. This is
enforced by the data tests.

Target for the full game: **~50–60 shared abilities**. 28 are specified here — 3 starter signatures and 25 shared.

---

## 9. Mon template

Every mon is authored as three tabs.

### Tab 1 — engine

`ID` · `Name` · `Type1` · `Type2` · `Origin` · `Body` · `HP` · `ATK` · `DEF` ·
`SpA` · `SpD` · `SPD` · `Total` · `Ability pool (3–5)` ·
`Learnset (move + unlock level)` · `Evolves from / into + method`

### Tab 2 — dex

Up to **7 lore entries**, unlocked by catch count · `Where found` ·
`Origin detail` (birth group / material / manifest condition) · `Evolution notes`

### Tab 3 — misc

`Gender ratio or castes` (optional) · `Catch thresholds for entries` ·
`Related mons` (prey / predator / rival / symbiont)

The JSON encoding of this template is documented in
[`data/README.md`](data/README.md) and enforced by
[`test/data.test.js`](test/data.test.js).

---

## 10. Targets

| Item | Target | Now |
|---|---|---|
| Base creatures (excl. evolutions) | 60+ | 3 |
| Total mons incl. evolutions | — | 9 |
| Shared abilities | ~50–60 | 28 |
| Move pools | TBD | not started |

---

## 11. Not yet designed

- **The damage formula itself.** The spec fixes the *multipliers* (type
  effectiveness, STAB) and states that level is not a term, but the core
  ATK/DEF-to-damage expression is not specified. Nothing here invents one.
- **Moves.** Power, accuracy, PP, physical/special split, priority, and every
  learnset.
- **Status conditions.** Several abilities reference burn, poison, sleep and
  confusion; none of those are defined.
- **Catching**, party size, switching, held items, the Swarm/`Colony` body
  system, and hazards (`Grounded` implies Earth hazards exist).

See [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) for the decisions these block.
