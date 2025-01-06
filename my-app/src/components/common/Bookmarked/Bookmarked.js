import React, { useEffect, useState } from "react";
import axios from "axios";

const Bookmarked = ({ handleBookmarkClick }) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedTVSeries, setBookmarkedTVSeries] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/works/bookmarks"
        );

        // 카테고리별로 분류
        const movies = response.data.filter(
          (item) => item.category === "Movie"
        );
        const tvSeries = response.data.filter(
          (item) => item.category === "TV Series"
        );

        setBookmarkedMovies(movies);
        setBookmarkedTVSeries(tvSeries);
      } catch (error) {
        console.error("Error fetching bookmarked works:", error.message);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="bookmark-page">
      {/* Bookmarked Movies */}
      <div className="category-section">
        <h2 className="category-title">Bookmarked Movies</h2>
        <div className="movie-list">
          {bookmarkedMovies.map((movie) => (
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
              {/* 북마크 아이콘 */}
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

      {/* Bookmarked TV Series */}
      <div className="category-section">
        <h2 className="category-title">Bookmarked TV Series</h2>
        <div className="movie-list">
          {bookmarkedTVSeries.map((series) => (
            <div key={series._id} className="movie-item">
              <img
                src={series.thumbnailUrl.regularLarge}
                alt={series.title}
                className="movie-thumbnail"
              />
              <div className="movie-info">
                <p>
                  {series.year} • {series.category} • {series.rating}
                </p>
                <h3>{series.title}</h3>
              </div>
              {/* 북마크 아이콘 */}
              <div
                className="bookmark-icon"
                onClick={() => handleBookmarkClick(series)}
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
    </div>
  );
};

export default Bookmarked;
