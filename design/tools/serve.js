#!/usr/bin/env node
/**
 * Minimal static server for local development.
 *
 * ES modules cannot be loaded from file:// (the browser blocks it), so opening
 * game/index.html by double-clicking will not work. Serve the repo instead:
 *
 *   npm run serve        then open http://localhost:8080/game/
 */

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, normalize } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const port = Number(process.argv[2]) || 8080;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};

createServer(async (req, res) => {
  try {
    let rel = normalize(decodeURIComponent(req.url.split('?')[0]));
    if (rel.includes('..')) throw Object.assign(new Error('forbidden'), { code: 'DENY' });
    if (rel.endsWith('/')) rel = join(rel, 'index.html');
    const body = await readFile(join(root, rel));
    res.writeHead(200, { 'Content-Type': TYPES[extname(rel)] || 'application/octet-stream' });
    res.end(body);
  } catch (err) {
    res.writeHead(err.code === 'DENY' ? 403 : 404, { 'Content-Type': 'text/plain' });
    res.end(err.code === 'DENY' ? 'forbidden' : 'not found');
  }
}).listen(port, () => {
  console.log(`serving ${root}`);
  console.log(`open http://localhost:${port}/game/`);
});
