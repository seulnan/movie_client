import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Recommended.css';


const Recommended = ({ handleBookmarkClick }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
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
    <div className="recommended">
      <h2>Recommended for you</h2>
      <div className="movie-list">
        {recommendedMovies.map((movie) => (
          <div key={movie._id} className="movie-item">
            <img
              src={movie.thumbnailUrl.regularLarge}
              alt={movie.title}
              className="movie-thumbnail"
            />
            <div className="movie-info">
              <p>{movie.year} • {movie.category} • {movie.rating}</p>
              <h3>{movie.title}</h3>
            </div>
            {/* 북마크 아이콘 추가 */}
            <div className="bookmark-icon" onClick={() => handleBookmarkClick(movie)}>
              <img src={require('../../../assets/bookmark.svg')} alt="Bookmark" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
