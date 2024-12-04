import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDescription = ({ name }) => {
  const [description, setDescription] = useState('Loading description...');

  name = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  useEffect(() => {
    const fetchDescription = async () => {

      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
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
