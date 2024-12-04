export const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };


export const getBackgroundStyle = (type1, type2) => {
    const color1 = typeColors[type1.toLowerCase()] || '#FFFFFF'; // Default to white
    const color2 = typeColors[type2?.toLowerCase()] || null;
  
    if (color2) {
      // If there's a second type, create a gradient
      return {
        background: `linear-gradient(135deg, ${color1}, ${color2})`,
      };
    } else {
      // Single type, solid background color
      return {
        backgroundColor: color1,
      };
    }
  };

export const getTypeColor= (type) => {
  const color = typeColors[type.toLowerCase()] || '#FFFFFF';
  return {
    color: color,
  };
};
  