#!/usr/bin/env bash
#
# DivorceTalk.in — one-shot update script.
# Run on the VPS as the app user (e.g. `divorcetalk`) AFTER the initial
# bootstrap and code upload.
#
#   cd /var/www/divorcetalk
#   bash deploy/deploy.sh           # build + restart
#   bash deploy/deploy.sh --migrate # also push DB schema (drizzle-kit push)

set -euo pipefail

cd "$(dirname "$0")/.."

say() { printf "\n\033[1;36m▸ %s\033[0m\n" "$*"; }
ok()  { printf "\033[1;32m✓ %s\033[0m\n" "$*"; }

if [ "$(id -u)" -eq 0 ]; then
  echo "Don't run as root. Switch to the app user first:  sudo -u divorcetalk -i"
  exit 1
fi

say "Installing dependencies (npm ci)"
npm ci

if [ "${1:-}" = "--migrate" ]; then
  say "Pushing DB schema"
  npx drizzle-kit push
fi

say "Building app"
npm run build

say "Reloading PM2 process (zero-downtime where possible)"
if pm2 describe divorcetalk >/dev/null 2>&1; then
  pm2 reload divorcetalk --update-env
else
  pm2 start ecosystem.config.cjs
fi
pm2 save

ok "Deploy complete."
pm2 status
