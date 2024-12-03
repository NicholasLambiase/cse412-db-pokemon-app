// src/components/PokemonList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('pokedex_number');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchPokemon();
  }, [typeFilter, sortBy, order]);

  const fetchPokemon = async () => {
    const params = {};
    if (typeFilter) params.type = typeFilter;
    if (sortBy) params.sort_by = sortBy;
    if (order) params.order = order;

    try {
      const res = await axios.get('http://localhost:5000/api/pokemon', { params });
      setPokemon(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Pokémon List</h1>

      {/* Filters */}
      <div className="flex space-x-4 mb-5">
        <select onChange={handleTypeChange} value={typeFilter} className="border p-2">
        <option value="">All Types</option>
        <option value="normal">Normal</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="ice">Ice</option>
        <option value="fighting">Fighting</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="flying">Flying</option>
        <option value="psychic">Psychic</option>
        <option value="bug">Bug</option>
        <option value="rock">Rock</option>
        <option value="ghost">Ghost</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="steel">Steel</option>
        <option value="fairy">Fairy</option>
        </select>

        <select onChange={handleSortChange} value={sortBy} className="border p-2">
            <option value="pokedex_number">Pokédex Number</option>
            <option value="name">Name</option>
            <option value="hp">HP</option>
            <option value="attack">Attack</option>
            <option value="defense">Defense</option>
            <option value="speed">Speed</option>
        </select>

        <select onChange={handleOrderChange} value={order} className="border p-2">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Pokémon Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Pokédex Number</th>
            <th className="py-2">Name</th>
            <th className="py-2">Type 1</th>
            <th className="py-2">Type 2</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.map((poke) => (
            <tr key={poke.id} className="text-center">
              <td className="py-2">{poke.pokedex_number}</td>
              <td className="py-2">
                <Link to={`/pokemon/${poke.id}`} className="text-blue-500">
                  {poke.name}
                </Link>
              </td>
              <td className="py-2">{poke.type1}</td>
              <td className="py-2">{poke.type2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonList;
