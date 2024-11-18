import React from 'react';

const CharacterCard = ({ character }) => {
  const { name, image, species, status } = character;

  return (
    <div className="character-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>Especie: {species}</p>
      <p>Estado: {status}</p>
    </div>
  );
};

export default CharacterCard;
