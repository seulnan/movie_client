import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Movies.css";

const Movies = ({ handleBookmarkClick }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/works/movies"
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };

    fetchMovies();
  }, []);

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
            {/* 북마크 아이콘 추가 */}
            <div
              className="bookmark-icon"
              onClick={() => handleBookmarkClick(movie)}
            >
              <img
                src={require("../../../assets/bookmark.svg")}
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
