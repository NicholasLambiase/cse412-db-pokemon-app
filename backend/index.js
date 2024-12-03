require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());

// PostgreSQL Pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the database connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Get all Pokémon with optional filtering and sorting
app.get('/api/pokemon', async (req, res) => {
    try {
      const { type, sort_by, order } = req.query;
  
      let query = 'SELECT * FROM pokemon';
      const conditions = [];
      const values = [];
  
      // Filtering
      if (type) {
        conditions.push('(type1 = $1 OR type2 = $1)');
        values.push(type);
      }
  
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
  
      // Sorting
      if (sort_by) {
        const sortOrder = order === 'desc' ? 'DESC' : 'ASC';
        query += ` ORDER BY ${sort_by} ${sortOrder}`;
      }
  
      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// Get a specific Pokémon by ID
app.get('/api/pokemon/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM pokemon WHERE id = $1', [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ msg: 'Pokémon not found' });
      }
  
      const pokemon = result.rows[0];
  
      // Fetch artwork from PokeAPI
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokedex_number}`);
      const data = await response.json();
      const artwork = data.sprites.other['official-artwork'].front_default;
  
      pokemon.artwork = artwork;
  
      res.json(pokemon);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  