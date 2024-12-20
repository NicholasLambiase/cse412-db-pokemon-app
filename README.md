# CSE 412: Database Management (Fall 2024)

# Pokemon Cards

## Introduction

- This project shows a visual representation of Pokemon that fulfill certain attributes that the user can filter by<br/>
- The user can currently filter by name and by type both individually and simultaneously<br/>
- The display is in the form of a Pokedex with basic information such as an image, name, typing, Pokedex number, and Pokedex description<br/>
- When a Pokemon is selected, a card is brought up with greater depth to show the abilities and statistics (HP, Attack, Defense, etc.)<br/>
- The Pokedex entries are by default sorted in ascending order of the Pokedex number but this can be changed upon user selection<br/>
- Filtering is enabled by type, Pokedex number, and name<br/>
- The entries are able to be sorted in increasing or decreasing alphebetical order by name or numerically from the Pokedex number

## How To Run

### Backend

Ensure that the .env file contains the following:<br/>

- DB_HOST=localhost<br/>
- DB_PORT=5432<br/>
- DB_USER=pokemonuser<br/>
- DB_PASSWORD=yourpassword<br/>
- DB_NAME=pokemon_db<br/>

### Database

1. Log in to the PostgreSQL shell as the postgres user.<br/>
   `sudo -u postgres psql`<br/>

2. Create a new user pokemonuser and a new database pokemon_db<br/>
   `CREATE USER pokemonUser WITH PASSWORD 'yourpassword';`<br/>
   `CREATE DATABASE pokemon_db;`<br/>
   `GRANT ALL PRIVILEGES ON DATABASE pokemon_db TO pokemonUser;`<br/>

3. Import Pokemon Data<br/>
   Either Import via commands or via Dbeaver<br/>

##### Commands for Pokemon Data Import:<br/>

navigate to the folder containing the database tables and run the following commands<br/>
`psql -U pokemonuser -d pokemon_db -c "\copy pokemon FROM 'pokemon.csv' DELIMITER ',' CSV HEADER;"`<br/>
`psql -U pokemonuser -d pokemon_db -c "\copy abilities FROM 'abilities.csv' DELIMITER ',' CSV HEADER;"`<br/>
`psql -U pokemonuser -d pokemon_db -c "\copy stats FROM 'stats.csv' DELIMITER ',' CSV HEADER;"`<br/>

## Technologies Used

- PostgreSQL<br/>
- Python<br/>
- React.js<br/>
- Express.js<br/>
- TailwindCSS<br/>
