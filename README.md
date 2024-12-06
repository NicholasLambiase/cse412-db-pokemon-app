# Local Setup Guide

### Backend
ensure that the .env file contains the following:
DB_HOST=localhost
DB_PORT=5432
DB_USER=pokemonuser
DB_PASSWORD=yourpassword
DB_NAME=pokemon_db

### Database
1. Log in to the PostgreSQL shell as the postgres user.
  - `sudo -u postgres psql`

2. Create a new user pokemonuser and a new database pokemon_db
`CREATE USER pokemonUser WITH PASSWORD 'yourpassword';`
`CREATE DATABASE pokemon_db;`
`GRANT ALL PRIVILEGES ON DATABASE pokemon_db TO pokemonUser;`

3. Import Pokemon Data
Either Import via commands or via Dbeaver
##### Commands:
navigate to the folder containing the database tables and run the following commands
`psql -U pokemonuser -d pokemon_db -c "\copy pokemon FROM 'pokemon.csv' DELIMITER ',' CSV HEADER;"`
`psql -U pokemonuser -d pokemon_db -c "\copy abilities FROM 'abilities.csv' DELIMITER ',' CSV HEADER;"`
`psql -U pokemonuser -d pokemon_db -c "\copy stats FROM 'stats.csv' DELIMITER ',' CSV HEADER;"`
