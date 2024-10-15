const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000; //if this is in use, change port number

app.use(express.urlencoded({ extended: true })); //parse URL-encoded data

const client = new Client({
  user: 'kyliestenke', //replace with username
  host: 'localhost',
  database: 'pokemon',
  password: '',  //replace with your server password
  port: 5432, // default port for PostgreSQL, replace with yours
});

//first terminal log checks if sql connection was successful:
async function connect() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");
  } catch (err) {
    console.error("Connection error", err.stack);
  }
}

connect();

// search form: type section currently inactive
app.get('/', (req, res) => {
  res.send(`
    <form action="/search" method="post">
      <label for="name">Search Pokémon by name:</label>
      <input type="text" id="name" name="name" required>
      <button type="submit">Search</button>
    </form>
    <form action="/search" method="post">
      <label for="type">Search Pokémon by type:</label>
      <input type="text" id="type" name="type" required>
      <button type="submit">Search</button>
    </form>
  `);
});

// handle the search request
app.post('/search', async (req, res) => {
  const { name } = req.body;

  try {
    //sql query to search by name
    //needs quotes around tbl name or reads lowercase
    const result = await client.query('SELECT * FROM "Pokemon" WHERE (name ILIKE $1) ', [name]);

    //css html setup
    if (result.rows.length > 0) {
      res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokemon Caught!</title>
    <style>
        body {
            font-family: Helvetica, sans-serif;
            background-color: #abe2ff;
            margin: 10px;
            padding: 5px;
        }
        .container {
            background-color: white;
            width: 50%;
            height: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            position: absolute;
            width: 100%
            bottom: 0;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Pokemon Caught!</h1>

    <div class="container">
        <p><strong>Pokemon Information:</p>
        <pre>${JSON.stringify(result.rows, null, 2)}</pre>
        <p>Click the button below to search for another Pokemon:</p>
        <a href="/" class ="button">Search again</a>

    </div>
</body>
</html>

      `);
      //TODO:
      //center buttom on bottom of div? - probably put outside container
      //separate json return data into fields
      //picture needed
      //list view in home search page
    } else {
      res.send(`
        <h1>No Pokémon found with name "${name}"</h1>
        <a href="/">Search again</a>
      `);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database query failed");
  }
});

//run in terminal "node pokemon_app.js"
//in browser, visit "https://localhost:3000" or other port #
//this prints in terminal when connection is succesful
app.listen(port, () => {
  console.log(`Web server is listening on port ${port}`);
});

