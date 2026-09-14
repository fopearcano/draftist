#!/bin/sh
set -eu

cd "$(dirname "$0")"
echo "Starting Draftist from: $(pwd)"
exec node scripts/server.mjs
