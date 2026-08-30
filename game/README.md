# game/

The playable side of MONS. Plain HTML and JavaScript, no framework, no build
tooling beyond one inlining step.

| File | |
|---|---|
| `page.html` | **The source.** Edit this. |
| `index.html` | **Generated.** `page.html` with the rules engine inlined. Do not edit. |

## Open it

```sh
open game/index.html          # macOS
start game\index.html         # Windows
```

`index.html` is fully self-contained — it works straight off the disk with no
server, which is why the engine is inlined rather than imported.

## Change it

Edit `page.html`, then rebuild:

```sh
cd design && npm run build
```

That regenerates `lib/data.generated.js` from `data/*.json` and rebuilds
`game/index.html`. A test fails if you forget.

## Why the engine is inlined

Browsers refuse to load ES modules over `file://`, so a page that did
`import { damage } from '../design/lib/damage.js'` could only be opened through a
server. `design/tools/build-page.js` strips the `import`/`export` keywords from
the real modules and concatenates them into the page, so there is still exactly
one source of truth — `design/lib/` — and no copy to keep in sync.

If you would rather work with real modules during development:

```sh
cd design && npm run serve      # http://localhost:8080/game/
```

## What the page is for

It is a lab, not the game. Its job is to settle the questions v0.1 left open —
above all the damage formula, which the spec never states. The SCALE slider,
the multiplier chain, and the warning that appears when the modifier stack gets
large are all there so those decisions can be made by feel and then written down.

The type chart, roster and every rule shown come from `design/data/` and
`design/lib/` unchanged. Nothing is hardcoded in the page.
