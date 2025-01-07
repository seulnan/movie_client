import React, { useEffect, useState } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";

const Bookmarked = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedTVSeries, setBookmarkedTVSeries] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/works/bookmarks"
        );

        const movies = response.data.filter((item) => item.category === "Movie");
        const tvSeries = response.data.filter((item) => item.category === "TV Series");

        setBookmarkedMovies(movies);
        setBookmarkedTVSeries(tvSeries);
      } catch (error) {
        console.error("Error fetching bookmarked works:", error.message);
      }
    };

    fetchBookmarks();
  }, []);

  const toggleBookmark = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/works/${id}/bookmark`
      );

      const updatedBookmark = response.data.isBookmarked;

      // Update bookmarked lists
      setBookmarkedMovies((prev) =>
        prev.filter((movie) => (movie._id === id ? updatedBookmark : movie))
      );
      setBookmarkedTVSeries((prev) =>
        prev.filter((series) => (series._id === id ? updatedBookmark : series))
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
    }
  };

  const renderItems = (items, category) => (
    <div className="category-section">
      <h2 className="category-title">Bookmarked {category}</h2>
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
              onClick={() => toggleBookmark(item._id)}
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
    </div>
  );

  return (
    <div className="bookmark-page">
      {renderItems(bookmarkedMovies, "Movies")}
      {renderItems(bookmarkedTVSeries, "TV Series")}
    </div>
  );
};

export default Bookmarked;
