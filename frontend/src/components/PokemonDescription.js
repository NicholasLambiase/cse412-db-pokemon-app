import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDescription = ({ name }) => {
  const [description, setDescription] = useState('Loading description...');

    let pokemonName

    // Play the Pokémon's cry
    if (name) {
        // Handle special cases for Pokémon names
        const dexNameMap = {
        'nidoran♂': 'nidoran-m',
        'nidoran♀': 'nidoran-f',
        'farfetch’d': 'farfetchd',
        'mr. mime': 'mr-mime',
        'mr.mime': 'mr-mime',
        'mime jr.': 'mime-jr',
        'mime jr': 'mime-jr',
        "type: null": 'type-null',
        'jangmo-o': 'jangmo-o',
        'hakamo-o': 'hakamo-o',
        'kommo-o': 'kommo-o',
        'tapu koko': 'tapu-koko',
        'tapu lele': 'tapu-lele',
        'tapu bulu': 'tapu-bulu',
        'tapu fini': 'tapu-fini',
        'flabébé': 'flabebe',
        'zygarde 50% forme': 'zygarde',
        'porygon-z': 'porygon-z',
        'ho-oh': 'ho-oh',

        // Add other special cases as needed
        };

        pokemonName = dexNameMap[name.toLowerCase()] || name.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

  useEffect(() => {
    const fetchDescription = async () => {

      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`);
        const flavorTextEntries = response.data.flavor_text_entries;

        // Find the first English description
        const englishEntry = flavorTextEntries.find(entry => entry.language.name === 'en');

        if (englishEntry) {
          // Clean up the text by removing line breaks and special characters
          const cleanedText = englishEntry.flavor_text.replace(/\f/g, ' ');
          setDescription(cleanedText);
        } else {
          setDescription('Description not available.');
        }
      } catch (error) {
        console.error(`Error fetching description: ${name}`, error);
        setDescription('Error loading description.');
      }
    };

    fetchDescription();
  }, [name]);

  return <p>{description}</p>;
};

export default PokemonDescription;
