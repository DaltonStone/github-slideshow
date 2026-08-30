#!/usr/bin/env node
/**
 * Generates lib/data.generated.js from the hand-edited JSON in data/.
 *
 * Why: data/*.json is the canonical, human-editable source, but a browser
 * cannot import JSON from file:// without a server or an import assertion.
 * Emitting the same data as a plain ES module lets lib/rules.js run unchanged
 * in Node and in the browser.
 *
 * Run after any edit to data/:   npm run build
 * A test fails if you forget.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

const read = (f) => JSON.parse(readFileSync(join(root, 'data', f), 'utf8'));

const body = `// GENERATED FILE -- DO NOT EDIT.
// Source: design/data/*.json. Regenerate with: npm run build
// This exists so the same rules module runs in Node and in the browser.

export const typeData = ${JSON.stringify(read('types.json'), null, 2)};

export const abilityData = ${JSON.stringify(read('abilities.json'), null, 2)};

export const monData = ${JSON.stringify(read('mons.json'), null, 2)};
`;

const out = join(root, 'lib', 'data.generated.js');
writeFileSync(out, body);
console.log(`wrote ${out} (${(body.length / 1024).toFixed(1)} KB)`);
