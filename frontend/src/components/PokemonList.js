// src/components/PokemonList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonModal from './PokemonModal';
import { getBackgroundStyle } from "../utilities/TypeColors";

function PokemonList() {
    const [pokemon, setPokemon] = useState([]);
    const [typeFilter, setTypeFilter] = useState('');
    const [sortBy, setSortBy] = useState('pokedex_number');
    const [order, setOrder] = useState('asc');
    const [showModal, setShowModal] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPokemon();
    }, [typeFilter, sortBy, order]);

    useEffect(() => {
        if (showModal || loading) {
          // Disable scrolling
          document.body.style.overflow = 'hidden';
        } else {
          // Enable scrolling
          document.body.style.overflow = 'auto';
        }
      }, [showModal, loading]);
      
      

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

    const handleCardClick = (name) => {
        setLoading(true);
        
        // Fetch Pokémon details from the backend
        axios
            .get(`http://localhost:5000/api/pokemon/${name}`)
            .then((res) => {
            const pokemonData = res.data;
        
            // Preload the image
            const img = new Image();
            img.src = pokemonData.artwork;
            img.onload = () => {
                // Image has loaded
                setSelectedPokemon(pokemonData);
                setShowModal(true);
                setLoading(false);
            };
            img.onerror = () => {
                // Handle image loading error
                console.error('Failed to load image');
                setSelectedPokemon(pokemonData); // Optionally set the data even if the image fails
                setShowModal(true);
                setLoading(false);
            };
            })
            .catch((err) => {
            console.error(err);
            setLoading(false);
            });
    };
      
    /*
        Features to add:
        Style the modal to look like a pokemon card
            - yellow border
            - HP in the top left with type icon
            - Name in the top right
            - click out of modal/remove close button

        Dark mode toggle
        Filter by Region
        White Text for cards???
        Decription of pokemon on the row entries
        Inside rows add an interior opaque section dividing the sprite from the name and data
        Mobile responsive Sprite and text size / when screen size small get rid of pokedex description

    */

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-5">Pokémon Database</h1>

            {/* Filters */}
            <div className="flex space-x-4 mb-5 bg">
                <select onChange={handleTypeChange} value={typeFilter} className="border p-2 rounded bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
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

                <select onChange={handleSortChange} value={sortBy} className="border p-2 rounded bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="pokedex_number">Pokédex Number</option>
                    <option value="name">Name</option>
                    {/* <option value="hp">HP</option>
                    <option value="attack">Attack</option>
                    <option value="defense">Defense</option>
                    <option value="speed">Speed</option> */}
                </select>

                <select onChange={handleOrderChange} value={order} className="border p-2 rounded bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
                </select>
            </div>

            {/* Pokémon Table */}
            <div className="space-y-4">
                {pokemon.map((poke) => (
                <div
                    key={poke.id}
                    className="flex flex-col sm:flex-row items-center rounded-lg p-4 shadow cursor-pointer"
                    style={getBackgroundStyle(poke.type1, poke.type2)}
                    onClick={() => handleCardClick(poke.name)}
                >
                    {/* Sprite */}
                    <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.pokedex_number}.png`}
                    alt={poke.name}
                    className="w-24 h-24"
                    />

                    {/* Pokémon Details */}
                    <div className="ml-4">
                    <h2 className="text-xl font-bold">
                        {poke.name}
                    </h2>
                    <p>
                        <strong>Pokédex Number:</strong> {poke.pokedex_number}
                    </p>
                    <p>
                        <strong>Type:</strong> {poke.type1}
                        {poke.type2 && ` / ${poke.type2}`}
                    </p>
                    </div>
                </div>
                ))}
            </div>
            
            {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
            </div>
            )}

            
            {showModal && (
                <PokemonModal
                    pokemon={selectedPokemon}
                    loading={loading}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

export default PokemonList;
