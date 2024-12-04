import React from 'react';

function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 relative max-w-md w-full mx-4">
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Pokémon Details */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{pokemon.name}</h2>
          <img
            src={pokemon.artwork}
            alt={pokemon.name}
            className="w-48 h-48 mx-auto"
          />
          <p>
            <strong>Type:</strong> {pokemon.type1}
            {pokemon.type2 && ` / ${pokemon.type2}`}
          </p>
          <p>
            <strong>HP:</strong> {pokemon.hp}
          </p>
          <p>
            <strong>Attack:</strong> {pokemon.attack}
          </p>
          <p>
            <strong>Defense:</strong> {pokemon.defense}
          </p>
          <p>
            <strong>Special Attack:</strong> {pokemon.sp_attack}
          </p>
          <p>
            <strong>Special Defense:</strong> {pokemon.sp_defense}
          </p>
          <p>
            <strong>Speed:</strong> {pokemon.speed}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
