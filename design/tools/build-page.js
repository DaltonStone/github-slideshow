#!/usr/bin/env node
/**
 * Builds game/index.html: the sandbox template with the rules engine inlined.
 *
 * Why inline rather than <script type="module" src="...">: browsers refuse to
 * load ES modules over file://, so a module-based page can only be opened
 * through a server. Inlining makes the built page a single self-contained file
 * that works by double-clicking it, and is also what gets published as an
 * Artifact.
 *
 * The engine source is still the real modules in design/lib -- this only
 * strips their import/export keywords and concatenates them, so there is one
 * source of truth, not a copy.
 *
 *   npm run build:page
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const design = join(here, '..');
const game = join(design, '..', 'game');

/** Strip ES module syntax so several modules can share one classic script. */
const flatten = (file) =>
  readFileSync(join(design, 'lib', file), 'utf8')
    .replace(/^import\s+.*?from\s+['"].*?['"];\s*$/gm, '')
    .replace(/^export\s+\{[^}]*\};\s*$/gm, '')
    .replace(/^export\s+/gm, '')
    .trim();

const engine = [
  '// --- generated from design/lib -- do not edit here ---',
  flatten('data.generated.js'),
  flatten('rules.js'),
  flatten('damage.js'),
].join('\n\n');

const template = readFileSync(join(game, 'page.html'), 'utf8');
if (!template.includes('/*INJECT:ENGINE*/')) {
  throw new Error('game/page.html is missing the /*INJECT:ENGINE*/ marker');
}

const out = template.replace('/*INJECT:ENGINE*/', engine);
writeFileSync(join(game, 'index.html'), out);
console.log(`wrote game/index.html (${(out.length / 1024).toFixed(1)} KB, self-contained)`);
