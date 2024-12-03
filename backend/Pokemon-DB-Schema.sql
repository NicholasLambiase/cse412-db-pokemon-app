-- Pokemon table schema
CREATE TABLE Pokemon (
	NAME VARCHAR(30) PRIMARY KEY,
	height DECIMAL(4,2) NULL,
	weight DECIMAL(5,2) NULL,
	type1 VARCHAR(25),
	type2 VARCHAR(25),
	pokedex_number INT,
	generation INT
);

-- Abilities table schema with foreign key reference to Pokemon and ON DELETE CASCADE
CREATE TABLE Abilities (
	NAME VARCHAR(30) PRIMARY KEY,
	abilities VARCHAR(100),
	CONSTRAINT fk_pokemon_name_abilities
		FOREIGN KEY (NAME) REFERENCES Pokemon(NAME)
		ON DELETE CASCADE
);

-- Stats table schema with foreign key reference to Pokemon and ON DELETE CASCADE
CREATE TABLE Stats (
	NAME VARCHAR(30) PRIMARY KEY,
	attack INT,
	special_attack INT,
	speed INT,
	special_defense INT,
	defense INT,
	health INT,
	CONSTRAINT fk_pokemon_name_stats
		FOREIGN KEY (NAME) REFERENCES Pokemon(NAME)
		ON DELETE CASCADE
);

-- Incase I need to drop any tables
-- drop table if exists pokemon cascade;
-- drop table if exists stats cascade;
-- drop table if exists abilities cascade;