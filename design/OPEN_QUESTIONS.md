# Open questions — v0.1

Things the spec does not yet settle, and things it does settle that look like
they will need a second pass. Numbers in §1 are computed from
[`data/types.json`](data/types.json) by `node tools/analyze.js`, not estimated.

---

## 1. Type chart balance

The chart is internally consistent — both cycles are clean, every type has at
least one weakness, and no dual-type pairing comes out weakness-free. Four
things stand out anyway.

### 1.1 Dragon is the best type on both axes

Defensive and offensive scores across all ten types (`resist + 2·immune − weak`
and `2× − 0.5× − 2·immune`):

| Type | Weak | Resist | Immune | Def score | 2× | 0.5× | 0× | Off score |
|---|---|---|---|---|---|---|---|---|
| Steel   | 3 | 6 | 0 | **+3** | 1 | 5 | 0 | **−4** |
| Dragon  | 2 | 4 | 0 | **+2** | 4 | 1 | 0 | **+3** |
| Dark    | 1 | 3 | 0 | +2 | 3 | 3 | 0 | 0 |
| Normal  | 2 | 0 | 2 | +2 | 0 | 1 | 1 | −3 |
| Fire    | 2 | 3 | 0 | +1 | 2 | 3 | 0 | −1 |
| Water   | 2 | 3 | 0 | +1 | 2 | 3 | 0 | −1 |
| Earth   | 2 | 3 | 0 | +1 | 2 | 3 | 0 | −1 |
| Light   | 1 | 2 | 0 | +1 | 2 | 3 | 0 | −1 |
| Psychic | 2 | 2 | 0 |  0 | 2 | 3 | 1 | −3 |
| Phantom | 3 | 0 | 1 | **−1** | 2 | 1 | 1 | −1 |

Steel pays for the best defense with the worst offense, and Normal pays for its
immunities with no super-effective matchup anywhere. Those are legible trades.
Dragon does not make a trade: it is top-two defensively *and* clearly the best
offensively, resisted by only one type and checked by only two.

**The only thing balancing Dragon is the one-word note "rare" in §7 of the
spec.** That is a load-bearing word doing a lot of work. Either it becomes a
real, written rule (how many Dragon lines exist, at what stage they are
obtainable, whether they are late-game only), or Dragon needs a second
weakness. Decide before the roster is authored, because it changes how many
Dragon slots the 60 are allowed to spend.

### 1.2 Phantom is the weakest defensive type, against its own flavor

Phantom is "evasive, low HP, high SpD" — a defensive concept — but is the only
type with three weaknesses and no resistances. Its Normal immunity is worth
little, because Normal has no super-effective matchup to be immune *to*. So
Phantom's survivability rests entirely on evasion and stat defaults, which are
guides rather than rules. If evasion is not a strong mechanic, Phantom is a
trap type. Options: give Phantom a resistance (Earth reads well — nothing to
stand on), or accept it as a glass-cannon type and rewrite the §7 default.

### 1.3 Dark and Light have one weakness each

Every other type has two or three. Dark is additionally the second-best
attacker and appears in three of the fifteen 3.0× pairings. Nothing is broken
here, but Dark/Light are the two types most likely to over-select on a
competitive roster, and they are the two cheapest places to add a weakness if
one is needed.

### 1.4 The 3.0× ceiling is rare, and that is working

Across all 450 attacker × dual-type combinations, exactly 15 reach 3.0×
(3.3%). Dragon accounts for 6 of them and Dark for 3. The additive rule is
doing what it was designed to do: a doubled weakness is a spike, not a
deletion.

---

## 2. The damage formula

**This is the largest gap.** The spec fixes every multiplier — type
effectiveness, STAB, ability modifiers like Slow Burn's +20% — and rules level
*out* of the formula. It never states the formula those multiply.

Nothing in `lib/` invents one, deliberately: getting it wrong quietly would
poison every stat and move number authored afterwards. Blocked on it:

- **Whether small base stats work at all.** With bases in the 10–47 range and a
  ~3.97× cap at L99, a final-stage ATK tops out around 158. Whether that is a
  sensible input depends entirely on the formula's shape.
- **Move power scale.** Cannot be chosen before the formula.
- **What the ATK/DEF ratio does.** A linear ratio makes DEF investment
  hyperbolic in value; a difference makes it linear. Steel's whole identity
  rests on this choice.
- **Crit multiplier**, and whether crits ignore DEF changes.
- **Whether the modifiers stack multiplicatively.** Kindling (1.5×) + STAB
  (1.5×) + 3.0× effectiveness is 6.75× before the formula does anything. If
  additive stacking was adopted to avoid 4× cliffs, a 6.75× multiplier stack is
  worth a second look — the cliff was moved, not removed.

**Recommendation:** settle this next, before any move or any further mon.

---

## 3. Moves

Not started. Blocks every `learnset` in [`data/mons.json`](data/mons.json),
which is why they are empty arrays with a `learnsetStatus` note rather than
invented placeholder content. Needed: the physical/special split (six stats
imply one, but it is never stated), power/accuracy/PP scales, priority, and how
many moves a mon knows at once.

## 4. Status conditions

`Fireproof`, `Built`, and `Clear Head` grant immunity to burn, poison, sleep and
confusion. None of those four conditions is defined anywhere. An immunity to an
undefined condition cannot be balanced or implemented.

## 5. Hook abilities imply whole systems

- `Colony` replaces HP with "bodies". That is a parallel damage model, not an
  ability — how do bodies interact with the damage formula, with healing, with
  a 3.0× hit?
- `Royal` refers to "allied Swarm mons", but **Swarm is never defined**. It is
  the only reference to the concept in the spec. Is Swarm a tag, an origin, a
  caste, a type?
- `Built` gives 1.5× damage taken from Water. This is the only damage modifier
  in the spec that is neither type effectiveness nor STAB — it needs a slot in
  the multiplier order, which does not exist yet.
- `Grounded` implies Earth hazards; hazards are otherwise undefined.

## 6. Naming

Every mon name in the data is a working title. `Emberkit`, `Cindermaw`,
`Pyrelash`, `Rillet`, `Tidecalf`, `Brinemoor`, `Loambit`, `Cragmole`,
`Terrabulk`. The game's own title is also still `MONS`.

## 7. Smaller decisions taken as provisional defaults

Recorded here so they are visible rather than buried in the data:

| Decision | Default taken | Why |
|---|---|---|
| Starter evolution levels | 17 and 34 | 34 is where the growth curve hits exactly 2× base, so the second evolution lands on a real mechanical landmark. |
| Dex catch thresholds | 1, 3, 8, 15, 30, 50, 100 | Seven rungs for the seven allowed entries; front-loaded so the first entries are readable early. |
| Dex entries written | 3 of 7 per starter | The later four want lore the world does not have yet. |
| Starter gender ratio | 50/50 | Nothing in the spec suggests otherwise. |
| `relatedMons` | empty | There are only nine mons; predator/prey needs a real roster. |
| Ability pool inheritance | an evolution keeps its previous stage's whole pool and adds to it | Not stated in the spec, but the 3→4→5 pool sizes strongly imply it. **Confirm this is intended** — it is enforced by a test, so it is cheap to reverse now and expensive later. |

## 8. Questions for the next pass

1. Is Dragon's rarity a written rule, or does Dragon need a second weakness?
2. What is the damage formula?
3. Do modifiers stack multiplicatively, and is a ~6.75× stack acceptable?
4. Is Swarm a type, a tag, or a caste?
5. Is the ability-pool inheritance rule in §7 above correct?
6. Do all 60 base creatures use the 105/135/170 budgets, or do single-stage and
   two-stage lines get different totals? Right now a one-stage mon would be
   stuck at 105 forever.
