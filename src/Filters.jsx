import React from 'react';

const Filters = ({ filters, onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filters-container">
      <div className="filter">
        <label htmlFor="status">Estado:</label>
        <select
          name="status"
          id="status"
          value={filters.status} // El valor actual del filtro
          onChange={handleFilterChange}
        >
          <option value="">Todos</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="gender">Género:</label>
        <select
          name="gender"
          id="gender"
          value={filters.gender} // El valor actual del filtro
          onChange={handleFilterChange}
        >
          <option value="">Todos</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="genderless">Sin género</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="species">Especie:</label>
        <select
          name="species"
          id="species"
          value={filters.species} // El valor actual del filtro
          onChange={handleFilterChange}
        >
          <option value="">Todos</option>
          <option value="human">Humano</option>
          <option value="Humanoid">Humanoid</option>
          <option value="alien">Alien</option>
          <option value="robot">Robot</option>
          <option value="Poopybutthole">Poopybutthole</option>
          <option value="Mythological Creature">Mythological Creature</option>
          <option value="Disease">Disease</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
