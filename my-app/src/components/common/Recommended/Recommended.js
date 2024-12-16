import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommended = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    // API 호출
    const fetchRecommendedMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/works/recommend');
        setRecommendedMovies(response.data);
      } catch (error) {
        console.error('Error fetching recommended movies:', error.message);
      }
    };

    fetchRecommendedMovies();
  }, []);

  return (
    <div>
      <h2>Recommended Movies</h2>
      <div className="movie-list">
        {recommendedMovies.map((movie) => (
          <div key={movie._id} className="movie-item">
            <img
              src={movie.thumbnailUrl.regularLarge}
              alt={movie.title}
              className="movie-thumbnail"
            />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <p>{movie.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
