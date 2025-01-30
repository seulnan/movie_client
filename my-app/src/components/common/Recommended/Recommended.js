import React, { useEffect, useState } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import movieIcon from "../../../assets/movie2.svg";
import tvIcon from "../../../assets/tv2.svg";
import playIcon from "../../../assets/play.svg";
import "./Recommended.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MovieItem = ({ movie, onToggleBookmark }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div key={movie._id} className="movie-item recommended-item">
      <div className="movie-thumbnail-container">
        <img
          src={movie.thumbnailUrl.regularLarge}
          alt={movie.title}
          className="movie-thumbnail recommended-thumbnail"
        />
        <div className="hover-overlay">
          <div className="play-button">
            <img src={playIcon} alt="Play" />
            <span>Play</span>
          </div>
        </div>
      </div>
      <div className="movie-info recommended-info">
        <p>
          {movie.year} •{" "}
          <span className="category">
            <img
              src={movie.category === "Movie" ? movieIcon : tvIcon}
              alt={movie.category}
              className="category-icon"
            />{" "}
            {movie.category}
          </span>{" "}
          • {movie.rating}
        </p>
        <h3>{movie.title}</h3>
      </div>
      <div
        className="bookmark-icon recommended-bookmark-icon"
        onClick={() => onToggleBookmark(movie._id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={hovered ? bookmarkH : movie.isBookmarked ? bookmarkC : bookmark}
          alt="Bookmark"
        />
      </div>
    </div>
  );
};

const Recommended = ({ searchQuery }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/recommend`);
        setRecommendedMovies(response.data);
      } catch (error) {
        console.error("Error fetching recommended movies:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedMovies();
  }, []);

  const toggleBookmark = async (id) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/bookmark`);
      const updatedBookmark = response.data.isBookmarked;

      setRecommendedMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === id ? { ...movie, isBookmarked: updatedBookmark } : movie
        )
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
    }
  };

  const filteredMovies = recommendedMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="recommended recommended-page">
      {searchQuery && (
        <p className="search-results">
          Found {filteredMovies.length} result{filteredMovies.length !== 1 ? "s" : ""} for '{searchQuery}'
        </p>
      )}
      <h2 className="recommended-title">Recommended for you</h2>
      <div className="movie-list recommended-list">
        {filteredMovies.map((movie) => (
          <MovieItem key={movie._id} movie={movie} onToggleBookmark={toggleBookmark} />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
