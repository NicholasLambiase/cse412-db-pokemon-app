// src/components/PokemonDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetchPokemon();
  }, [name]);

  const fetchPokemon = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/pokemon/${name}`);
      setPokemon(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-5">{pokemon.name}</h1>
      <img src={pokemon.artwork} alt={pokemon.name} className="mx-auto" />
      <div className="mt-5">
        <p><strong>Type:</strong> {pokemon.type1} {pokemon.type2 && ` / ${pokemon.type2}`}</p>
        <p><strong>HP:</strong> {pokemon.hp}</p>
        <p><strong>Attack:</strong> {pokemon.attack}</p>
        <p><strong>Defense:</strong> {pokemon.defense}</p>
        <p><strong>Special Attack:</strong> {pokemon.sp_attack}</p>
        <p><strong>Special Defense:</strong> {pokemon.sp_defense}</p>
        <p><strong>Speed:</strong> {pokemon.speed}</p>
      </div>
    </div>
  );
}

export default PokemonDetail;
