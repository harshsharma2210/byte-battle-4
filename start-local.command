#!/bin/zsh
set -e

cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  pnpm install
fi

pnpm dev --hostname 127.0.0.1 --port 3000
