-- Pokemon table schema
CREATE TABLE Pokemon (
	NAME VARCHAR(100) PRIMARY KEY,
	height DECIMAL(4,2),
	weight DECIMAL(5,2),
	type VARCHAR(50),
	pokedex_number INT
);

-- Abilities table schema with foreign key reference to Pokemon and ON DELETE CASCADE
CREATE TABLE Abilities (
	NAME VARCHAR(100) PRIMARY KEY,
	primary_ability VARCHAR(100),
	hidden_ability VARCHAR(100) NULL,
	CONSTRAINT fk_pokemon_name_abilities
		FOREIGN KEY (NAME) REFERENCES Pokemon(NAME)
		ON DELETE CASCADE
);

-- Stats table schema with foreign key reference to Pokemon and ON DELETE CASCADE
CREATE TABLE Stats (
	NAME VARCHAR(100) PRIMARY KEY,
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
drop table if exists pokemon cascade;
drop table if exists stats cascade;
drop table if exists abilities cascade;