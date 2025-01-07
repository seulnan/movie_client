import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

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

  const handleBookmarkClick = (movie) => {
    if (bookmarkedMovies.some((m) => m._id === movie._id)) {
      setBookmarkedMovies(bookmarkedMovies.filter((m) => m._id !== movie._id));
    } else {
      setBookmarkedMovies([...bookmarkedMovies, movie]);
    }
  };

  return (
    <div className="movies">
      <h2>Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-item">
            <img
              src={movie.thumbnailUrl.regularLarge}
              alt={movie.title}
              className="movie-thumbnail"
            />
            <div className="movie-info">
              <p>
                {movie.year} • {movie.category} • {movie.rating}
              </p>
              <h3>{movie.title}</h3>
            </div>
            <div className="bookmark-icon" onClick={() => handleBookmarkClick(movie)}>
              <img 
                src={require(`../../../assets/${bookmarkedMovies.some((m) => m._id === movie._id) ? 'bookmarkC.svg' : 'bookmark.svg'}`)} 
                alt="Bookmark" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;