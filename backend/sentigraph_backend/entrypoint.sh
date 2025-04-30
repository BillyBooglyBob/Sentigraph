#!/bin/sh

if [ "$DATABASE" = "postgres" ] 
then
  echo "Connecting to postgres database..."

  while ! nc -z $SQL_HOST $SQL_PORT; do
    sleep 0.1
  done

  echo "Database is running"
fi

python manage.py migrate

exec "$@"