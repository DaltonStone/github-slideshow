#!/bin/sh
# Runs the MONS design tests. Node 18+, no dependencies.
set -e
cd "$(dirname "$0")"
exec node --test test/rules.test.js test/data.test.js
