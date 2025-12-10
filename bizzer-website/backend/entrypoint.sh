#!/bin/bash
set -e

# Wait for database
echo "Waiting for database..."
while ! python -c "import psycopg2; psycopg2.connect('$DATABASE_URL')" 2>/dev/null; do
    sleep 1
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
