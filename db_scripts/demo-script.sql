-- 1. Display all the tables
SELECT * FROM pokemon;
SELECT * FROM abilities;
SELECT * FROM stats;

-- 2. Insert a new fake Pokémon and display the insertion

-- Insert into the Pokemon table
INSERT INTO Pokemon (NAME, height, weight, type, pokedex_number)
VALUES ('Fakemon', 1.20, 40.50, 'Ghost', 9999);

-- Insert into the Abilities table
INSERT INTO Abilities (NAME, primary_ability, hidden_ability)
VALUES ('Fakemon', 'Invisibility', 'Phantom Force');

-- Insert into the Stats table
INSERT INTO Stats (NAME, attack, special_attack, speed, special_defense, defense, health)
VALUES ('Fakemon', 55, 70, 85, 60, 50, 100);

-- Show the inserted Pokémon from all three tables
SELECT * FROM Pokemon WHERE NAME = 'Fakemon';
SELECT * FROM Abilities WHERE NAME = 'Fakemon';
SELECT * FROM Stats WHERE NAME = 'Fakemon';


-- 3. Update an attribute of the fake Pokémon and display the updated value
-- Let's update Fakemon's weight in the Pokemon table

UPDATE Pokemon
SET weight = 45.00
WHERE NAME = 'Fakemon';

-- Show the updated value
SELECT * FROM Pokemon WHERE NAME = 'Fakemon';


-- 4. Delete the fake Pokémon and show that it no longer exists
-- Since we set ON DELETE CASCADE, deleting Fakemon from the Pokemon table will also delete it from Abilities and Stats

DELETE FROM Pokemon WHERE NAME = 'Fakemon';

-- Verify that the Pokémon no longer exists
SELECT * FROM Pokemon WHERE NAME = 'Fakemon';
SELECT * FROM Abilities WHERE NAME = 'Fakemon';
SELECT * FROM Stats WHERE NAME = 'Fakemon';


-- 5. Two random queries selecting Pokémon in a unique way

-- Query 1: Select Pokémon that have an attack stat greater than 80 and are of a specific type (e.g., 'Ghost')
SELECT P.NAME, P.type, S.attack
FROM Pokemon P
JOIN Stats S ON P.NAME = S.NAME
WHERE S.attack > 80 AND P.type = 'Ghost';

-- Query 2: Select Pokémon with a hidden ability and speed greater than 70
SELECT P.NAME, A.hidden_ability, S.speed
FROM Pokemon P
JOIN Abilities A ON P.NAME = A.NAME
JOIN Stats S ON P.NAME = S.NAME
WHERE A.hidden_ability IS NOT NULL AND S.speed > 70;