import React, { useEffect, useState } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import movieIcon from "../../../assets/movie2.svg";
import tvIcon from "../../../assets/tv2.svg";
import "./Recommended.css";

const Recommended = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/works/recommend"
        );
        setRecommendedMovies(response.data);
      } catch (error) {
        console.error("Error fetching recommended movies:", error.message);
      }
    };

    fetchRecommendedMovies();
  }, []);

  const toggleBookmark = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/works/${id}/bookmark`
      );
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
              className="bookmark-icon"
              onClick={() => toggleBookmark(movie._id)}
            >
              <img
                src={movie.isBookmarked ? bookmarkC : bookmark}
                alt="Bookmark"
                onMouseOver={(e) => (e.currentTarget.src = bookmarkH)}
                onMouseOut={(e) =>
                  (e.currentTarget.src = movie.isBookmarked
                    ? bookmarkC
                    : bookmark)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
