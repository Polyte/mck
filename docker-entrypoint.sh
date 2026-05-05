#!/bin/sh
set -e
export PORT="${PORT:-3002}"
export BIND_HOST="${BIND_HOST:-127.0.0.1}"
node /app/server.js &
i=0
while [ "$i" -lt 30 ]; do
  if curl -sf "http://${BIND_HOST}:${PORT}/api/health" >/dev/null 2>&1; then
    break
  fi
  i=$((i + 1))
  sleep 0.2
done
exec nginx -g "daemon off;"
