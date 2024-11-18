import React, { useState, useEffect } from 'react';
import CharacterList from './CharacterList';
import Filters from './Filters';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    status: 'Todos',
    gender: 'Todos',
    species: 'Todos',
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const { status, gender, species } = filters;

      // Convertir valores de filtros para la API
      const statusFilter = status === 'Todos' ? '' : status.toLowerCase();
      const genderFilter = gender === 'Todos' ? '' : gender.toLowerCase();
      const speciesFilter = species === 'Todos' ? '' : species.toLowerCase();

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${currentPage}&status=${statusFilter}&gender=${genderFilter}&species=${speciesFilter}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            setCharacters([]); // No hay resultados
            setTotalPages(1); // Reinicia el total de páginas
          } else {
            throw new Error('Error al obtener los datos');
          }
        } else {
          const data = await response.json();
          setCharacters(data.results);
          setTotalPages(data.info.pages);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage, filters]);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1); // Reiniciar a la página 1 al cambiar los filtros
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <p>Cargando personajes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Personajes de Rick and Morty</h1>
      
      {/* Contenedor de filtros */}
      <div className="filters-container" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Filters filters={filters} onFilterChange={handleFilterChange} />
      </div>
      
      {/* Verificar si hay personajes */}
      {characters.length > 0 ? (
        <CharacterList characters={characters} />
      ) : (
        <p>No se encontraron personajes con los filtros seleccionados.</p>
      )}

      {/* Paginación */}
      <div className="pagination" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span style={{ margin: '0 10px' }}>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default App;
