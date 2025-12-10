#!/bin/bash
set -e

# Wait for Redis
echo "Waiting for Redis..."
until python -c "import redis; r = redis.from_url('${REDIS_URL}'); r.ping()" 2>/dev/null; do
    sleep 1
done
echo "Redis is ready!"

# Execute command
exec "$@"
