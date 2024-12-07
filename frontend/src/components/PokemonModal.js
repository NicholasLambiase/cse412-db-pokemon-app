import React, {useEffect, useRef} from 'react';

const Ability = ({ abilities }) => {
  let abilitiesString = '';
  for(const ability of abilities) {
    if (!abilitiesString) {
      abilitiesString = `${ability}`;
    } else {
      abilitiesString += `, ${ability}`;
    }
  }
  
  return abilitiesString;
};

function PokemonModal({ pokemon, onClose }) {
  const modalRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    // Set focus to the modal for accessibility
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Play the Pokémon's cry
    if (pokemon) {
      // Handle special cases for Pokémon names
      const audioNameMap = {
        'nidoran♂': 'nidoran-m',
        'nidoran♀': 'nidoran-f',
        'farfetch’d': 'farfetchd',
        'mr. mime': 'mr_mime',
        'mr.mime': 'mr_mime',
        'mime jr.': 'mime_jr',
        'mime jr': 'mime_jr',
        "type: null": 'typenull',
        'jangmo-o': 'jangmo-o',
        'hakamo-o': 'hakamo-o',
        'kommo-o': 'kommo-o',
        'tapu koko': 'tapukoko',
        'tapu lele': 'tapulele',
        'tapu bulu': 'tapubulu',
        'tapu fini': 'tapufini',
        'flabébé': 'flabebe',
        'zygarde 50% forme': 'zygarde',
        // Add other special cases as needed
      };

      const pokemonName =
        audioNameMap[pokemon.name.toLowerCase()] || pokemon.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const audioUrl = `https://play.pokemonshowdown.com/audio/cries/${pokemonName}.mp3`;

      const audio = new Audio(audioUrl);
      audio.volume = 0.5; // Adjust volume as needed

      // Play the audio
      audio
        .play()
        .then(() => {
          console.log('Audio played successfully');
        })
        .catch((error) => {
          console.error('Failed to play audio:', error);
        });

      // Store the audio reference
      audioRef.current = audio;
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [pokemon]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!pokemon) return null;

  const abilities = pokemon.abilities.replace(/'/g, '"');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg p-6 relative max-w-md w-full mx-4">
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
            {pokemon.type2 !== 'N/A' && ` / ${pokemon.type2}`}
          </p>
          <p>
          <span>
            <strong>Abilities: </strong>
            <Ability abilities={JSON.parse(abilities)}/>
          </span>
          </p>
          <table className="min-w-full mt-2 bg-gray-600 rounded-lg overflow-hidden shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-400 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Stat
              </th>
              <th className="py-2 px-4 bg-gray-400 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700 text-left">HP</td>
              <td className="py-2 px-4 border-b border-gray-700 text-left">{pokemon.health}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700 text-left">Attack</td>
              <td className="py-2 px-4 border-b border-gray-700 text-left">{pokemon.attack}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700 text-left">Defense</td>
              <td className="py-2 px-4 border-b border-gray-700 text-left">{pokemon.defense}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700 text-left">Special Attack</td>
              <td className="py-2 px-4 border-b border-gray-700 text-left">{pokemon.special_attack}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700 text-left">Special Defense</td>
              <td className="py-2 px-4 border-b border-gray-700 text-left">{pokemon.special_defense}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-left">Speed</td>
              <td className="py-2 px-4 text-left">{pokemon.speed}</td>
            </tr>
          </tbody>
        </table>

        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
