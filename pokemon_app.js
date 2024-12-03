const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); // for url data
app.use(express.json()); // gotta handle JSON data also

// db connection configuration for postgresql
//im doing this with a .env file
const client = new Client({
  user: '', // replace with your username
  host: 'localhost',
  database: 'pokemon', // replace with your database name
  password: '', // replace with your password
  port: 5432, // PostgreSQL port
});

// func to actually make the connect using that info
async function connect() {
  try {
    await client.connect();
    console.log('PostgreSQL connected!');
  } catch (err) {
    console.error('error: check login details?', err.stack);
  }
}
connect();

// we want the home page to be a list of  clickable boxes??
// but also needs to pop up card on top of box
//still need two pages for the "filtered" search lists
async function renderPokemonList(pokemonRows, res) {
  const pokemonList = pokemonRows.map(
    (pokemon) => `
      <div class="pokemon-box" onclick="showPokemon('${pokemon.name}')">
        <p><strong>${pokemon.name}</strong></p>
        <p>${pokemon.type}</p>
      </div>
    `
  ).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pokémon Database</title>
      <body>Welcome Player! Feel free to look through the list, we hope you catch what you're looking for!</body>
      <style>
        body {
          font-family: Helvetica, sans-serif;
          background-color: #009635;
          margin: 0;
          padding: 20px;
          text-align: center;
          font-size: 16px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
          font-size: 24px;
        }
        .filter-form {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          gap: 10px;
        }
        .filter-form input, .filter-form button {
          padding: 10px;
          font-size: 16px;
          background: #dfff94;
        }
        .pokemon-list {
          display: block;
        }
        .pokemon-box {
          background: #73b2ff;
          margin-bottom: 20px;
          padding: 10px;
          text-align: center;
          border-radius: 9px;
          border-color: #b80018;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          font-size: 18px;
          cursor: pointer;
        }
        .pokemon-box:hover {
          background: #bbdefb;
        }
        .overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
        .pokemon-card {
          background: white;
          padding: 110px;
          border-radius: 10px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
          text-align: center;
          max-width: 800px;
        }
        .close-button {
          margin-top: 10px;
          padding: 20px 40px;
          background-color: #bd0023;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Pokémon Database</h1>
        <form action="/search" method="post" class="filter-form">
          <input type="text" name="name" placeholder="Search by name" />
          <input type="text" name="type" placeholder="Filter by type" />
          <button type="submit">Catch!</button>
        </form>
      </div>
      <div class="pokemon-list">
        ${pokemonList}
      </div>
      <div class="overlay" id="overlay">
        <div class="pokemon-card" id="pokemon-card">
          <!-- Dynamic content will go here -->
        </div>
      </div>
      <script>
        async function showPokemon(name) {
          try {
            const response = await fetch('/pokemon/' + name);
            const pokemon = await response.json();
            
            const card = document.getElementById('pokemon-card');
            card.innerHTML = \`
              <h2>\${pokemon.name}</h2>
              <p>Type: \${pokemon.type}</p>
              <p>Height: \${pokemon.height} m</p>
              <p>Weight: \${pokemon.weight} kg</p>
              <p>Primary Ability: \${pokemon.primary_ability} </p>
              <p>Hidden Abilities: \${pokemon.hidden_ability} </p>
              <p>Stats Info:</p>
              <p>Attack: \${pokemon.attack}  SP Attack: \${pokemon.sp_attack}</p>
              <p>Speed: \${pokemon.speed}  Health: \${pokemon.health}</p>
              <p>Defense: \${pokemon.defense} SP Defense: \${pokemon.sp_defense} </p>
              <button class="close-button" onclick="closeOverlay()">Close</button>
            \`;

            document.getElementById('overlay').style.display = 'flex';
          } catch (err) {
            console.error(err);
            alert('Failed to fetch Pokémon details');
          }
        }

        function closeOverlay() {
          document.getElementById('overlay').style.display = 'none';
        }
      </script>
    </body>
    </html>
  `);
}
//    Abilities(name, primary ability, hidden_ability)
//    pokemon(name, height, weight, type. pokedex_number)
//    stats(name, attack, sp_attack. speed. sp_defense. defense. health)
//oh my god tht was a nightmare
//why did it take me so long to get the block list padding right

//main/home page
app.get('/', async (req, res) => {
  try {
    const allPokemon = await client.query('SELECT * FROM "Pokemon"');
    renderPokemonList(allPokemon.rows, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
});

// that second page we need for after search (should look same)
app.post('/search', async (req, res) => {
  const { name, type } = req.body;

  //rn were only filtering by name and type, should we add more??
  try {
    const query = `
      SELECT * FROM "Pokemon" 
      WHERE (name ILIKE $1 OR $1 = '') 
      AND (type ILIKE $2 OR $2 = '')
    `;
    const result = await client.query(query, [`%${name || ''}%`, `%${type || ''}%`]);
    renderPokemonList(result.rows, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
});

// pokemon sql pull for data by name -- on the click
// Handle search request
//need to build out queries for all tables:
//    Abilities(name, primary ability, hidden_ability)
//    pokemon(name, height, weight, type. pokedex_number)
//    stats(name, attack, sp_attack. speed. sp_defense. defense. health)
app.get('/pokemon/:name', async (req, res) => {
  const { name } = req.params;

  try {
    //this gets all of it but need to define it in the display of pokemon-card css^^
    const result = await client.query('SELECT * FROM "Pokemon" AS p join "Abilities" AS a on p.name=a.name JOIN "Stats" as s on s.name=p.name WHERE p.name ILIKE $1', [name]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send({ error: 'Pokemon not found :(' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'query failed' });
  }
});

// template for server starting
//first run in terminal: node pokemon_app.js
//itll show connection successful
//go to http://localhost:3000/
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
