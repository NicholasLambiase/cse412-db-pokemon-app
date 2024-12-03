-- Copy data into Pokemon table
COPY Pokemon(NAME, height, weight, type, pokedex_number)
FROM '/path/to/pokemon_table.csv'
DELIMITER ','
CSV HEADER;

-- Copy data into Abilities table
COPY Abilities(NAME, primary_ability, hidden_ability)
FROM '/path/to/abilities_table.csv'
DELIMITER ','
CSV HEADER;

-- Copy data into Stats table
COPY Stats(NAME, attack, special_attack, speed, special_defense, defense, health)
FROM '/path/to/stats_table.csv'
DELIMITER ','
CSV HEADER;
