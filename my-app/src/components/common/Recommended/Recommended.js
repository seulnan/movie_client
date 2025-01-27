import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import movieIcon from "../../../assets/movie2.svg";
import tvIcon from "../../../assets/tv2.svg";
import playIcon from "../../../assets/play.svg"; // Play 아이콘 추가
import "./Recommended.css";

const Recommended = ({ searchQuery }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecommendedMovies = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/works/recommend");
      setRecommendedMovies(response.data);
    } catch (error) {
      console.error("Error fetching recommended movies:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendedMovies();
  }, [fetchRecommendedMovies]);

  const toggleBookmark = useCallback(
    async (id) => {
      try {
        const response = await axios.patch(`http://localhost:5001/api/works/${id}/bookmark`);
        const updatedBookmark = response.data.isBookmarked;

        setRecommendedMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie._id === id ? { ...movie, isBookmarked: updatedBookmark } : movie
          )
        );
      } catch (error) {
        console.error("Error toggling bookmark:", error.message);
      }
    },
    []
  );

  const filteredMovies = recommendedMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const handleMouseOver = (e) => {
    e.currentTarget.src = bookmarkH;
  };

  const handleMouseOut = (e, isBookmarked) => {
    e.currentTarget.src = isBookmarked ? bookmarkC : bookmark;
  };

  return (
    <div className="recommended recommended-page">
      {searchQuery && (
        <p className="search-results">
          Found {filteredMovies.length} result{filteredMovies.length !== 1 ? "s" : ""} for '{searchQuery}'
        </p>
      )}
      <div className="movie-list recommended-list">
        {filteredMovies.map((movie) => (
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
              onClick={() => toggleBookmark(movie._id)}
            >
              <img
                src={movie.isBookmarked ? bookmarkC : bookmark}
                alt="Bookmark"
                onMouseOver={handleMouseOver}
                onMouseOut={(e) => handleMouseOut(e, movie.isBookmarked)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
