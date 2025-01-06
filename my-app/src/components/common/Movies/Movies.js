import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/works/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {movies.map((movie) => (
          <div
            key={movie._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              width: '200px',
              textAlign: 'center',
            }}
          >
            <img
              src={movie.thumbnailUrl.regularLarge}
              alt={movie.title}
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <h3>{movie.title}</h3>
            <p>Year: {movie.year}</p>
            <p>Rating: {movie.rating}</p>
            <p>Bookmarked: {movie.isBookmarked ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
