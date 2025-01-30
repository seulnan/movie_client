import React, { useEffect, useState } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import movieIcon from "../../../assets/movie2.svg";
import playIcon from "../../../assets/play.svg";
import "./Movies.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Movies = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/movies`);
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };

  const toggleBookmark = async (id) => {
    try {
      const { data } = await axios.patch(`${API_BASE_URL}/${id}/bookmark`);
      setMovies((prev) =>
        prev.map((movie) =>
          movie._id === id ? { ...movie, isBookmarked: data.isBookmarked } : movie
        )
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="movies">
      {searchQuery ? (
        <p className="search-results">
          Found {filteredMovies.length} result{filteredMovies.length !== 1 ? "s" : ""} for '{searchQuery}'
        </p>
      ) : (
        <h2 className="movies-header">Movies</h2>
      )}
      <div className="movie-list">
        {filteredMovies.map(({ _id, title, year, rating, thumbnailUrl, isBookmarked }) => (
          <div key={_id} className="movie-item">
            <div className="movie-thumbnail-container">
              <img src={thumbnailUrl.regularLarge} alt={title} className="movie-thumbnail" />
              <div className="hover-overlay">
                <div className="play-button">
                  <img src={playIcon} alt="Play" />
                  <span>Play</span>
                </div>
              </div>
            </div>
            <div className="movie-info">
              <p>
                {year} • <span className="category">
                  <img src={movieIcon} alt="Movie" className="category-icon" /> Movie
                </span> • {rating}
              </p>
              <h3>{title}</h3>
            </div>
            <div
              className="bookmark-icon"
              onClick={() => toggleBookmark(_id)}
              onMouseOver={(e) => (e.currentTarget.firstChild.src = bookmarkH)}
              onMouseOut={(e) => (e.currentTarget.firstChild.src = isBookmarked ? bookmarkC : bookmark)}
            >
              <img src={isBookmarked ? bookmarkC : bookmark} alt="Bookmark" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
