#!/bin/bash
set -e

# Build DATABASE_URL from individual variables if not set
if [ -z "$DATABASE_URL" ]; then
    export DATABASE_URL="postgresql://${POSTGRES_USER:-bizzer}:${POSTGRES_PASSWORD:-password}@${POSTGRES_HOST:-db}:${POSTGRES_PORT:-5432}/${POSTGRES_DB:-bizzer}"
fi

# Wait for database
echo "Waiting for database..."
max_retries=30
counter=0
until python -c "
import psycopg2
import os
conn = psycopg2.connect(
    dbname=os.getenv('POSTGRES_DB', 'bizzer'),
    user=os.getenv('POSTGRES_USER', 'bizzer'),
    password=os.getenv('POSTGRES_PASSWORD', 'password'),
    host=os.getenv('POSTGRES_HOST', 'db'),
    port=os.getenv('POSTGRES_PORT', '5432')
)
conn.close()
" 2>/dev/null; do
    counter=$((counter+1))
    if [ $counter -ge $max_retries ]; then
        echo "Failed to connect to database after $max_retries attempts"
        exit 1
    fi
    echo "Waiting for database... attempt $counter/$max_retries"
    sleep 2
done
echo "Database is ready!"

# Run migrations
echo "Running migrations..."
python manage.py migrate --noinput

# Load initial data if needed
if [ "$LOAD_INITIAL_DATA" = "true" ]; then
    echo "Loading initial data..."
    python manage.py loaddata initial_data.json || true
fi

# Execute command
exec "$@"
