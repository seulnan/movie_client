import React, { useEffect, useState } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import movieIcon from "../../../assets/movie2.svg";
import "./Movies.css";

const Movies = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/works/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };

    fetchMovies();
  }, []);

  const toggleBookmark = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5001/api/works/${id}/bookmark`);
      const updatedBookmark = response.data.isBookmarked;

      setMovies((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isBookmarked: updatedBookmark } : item
        )
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMovies = () =>
    filteredMovies.map((movie) => (
      <div key={movie._id} className="movie-item movies-item">
        <img
          src={movie.thumbnailUrl.regularLarge}
          alt={movie.title}
          className="movie-thumbnail movies-thumbnail"
        />
        <div className="movie-info movies-info">
          <p>
            {movie.year} •{" "}
            <span className="category">
              <img src={movieIcon} alt="Movie" className="category-icon" /> Movie
            </span>{" "}
            • {movie.rating}
          </p>
          <h3>{movie.title}</h3>
        </div>
        <div
          className="bookmark-icon movies-bookmark-icon"
          onClick={() => toggleBookmark(movie._id)}
        >
          <img
            src={movie.isBookmarked ? bookmarkC : bookmark}
            alt="Bookmark"
            onMouseOver={(e) => (e.currentTarget.src = bookmarkH)}
            onMouseOut={(e) =>
              (e.currentTarget.src = movie.isBookmarked ? bookmarkC : bookmark)
            }
          />
        </div>
      </div>
    ));

  return (
    <div className="movies movies-page">
      <h2 className="movies-header">Movies</h2>
      <div className="movie-list movies-list">{renderMovies()}</div>
    </div>
  );
};

export default Movies;
