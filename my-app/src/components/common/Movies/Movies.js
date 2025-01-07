import React, { useEffect, useState } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";

// Common functionality across components
const toggleBookmark = async (id, setItems) => {
  try {
    const response = await axios.patch(`http://localhost:5001/api/works/${id}/bookmark`);
    const updatedBookmark = response.data.isBookmarked;

    // Update the local state
    setItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, isBookmarked: updatedBookmark } : item
      )
    );
  } catch (error) {
    console.error("Error toggling bookmark:", error.message);
  }
};

const renderItems = (items, setItems) => (
  <div className="movie-list">
    {items.map((item) => (
      <div key={item._id} className="movie-item">
        <img
          src={item.thumbnailUrl.regularLarge}
          alt={item.title}
          className="movie-thumbnail"
        />
        <div className="movie-info">
          <p>
            {item.year} • {item.category} • {item.rating}
          </p>
          <h3>{item.title}</h3>
        </div>
        <div
          className="bookmark-icon"
          onClick={() => toggleBookmark(item._id, setItems)}
        >
          <img
            src={item.isBookmarked ? bookmarkC : bookmark}
            alt="Bookmark"
            onMouseOver={(e) => (e.currentTarget.src = bookmarkH)}
            onMouseOut={(e) =>
              (e.currentTarget.src = item.isBookmarked ? bookmarkC : bookmark)
            }
          />
        </div>
      </div>
    ))}
  </div>
);

// Movies Component
const Movies = () => {
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

  return (
    <div className="movies">
      <h2>Movies</h2>
      {renderItems(movies, setMovies)}
    </div>
  );
};

export default Movies;
