import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Bookmarked.css";

const getBookmarkedWorks = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/works/bookmarks");
    return response.data;
  } catch (error) {
    console.error("Error fetching bookmarked works:", error.message);
    return [];
  }
};

const Bookmarked = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedTVSeries, setBookmarkedTVSeries] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const data = await getBookmarkedWorks();

      // 카테고리별로 분류
      const movies = data.filter((item) => item.category === "Movie");
      const tvSeries = data.filter((item) => item.category === "TV Series");

      setBookmarkedMovies(movies);
      setBookmarkedTVSeries(tvSeries);
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="bookmark-page">
      <div className="category-section">
        <h2 className="category-title">Bookmarked Movies</h2>
        <div className="bookmark-grid">
          {bookmarkedMovies.map((movie) => (
            <div className="bookmark-card" key={movie._id}>
              <img
                src={movie.thumbnailUrl.regularLarge}
                alt={movie.title}
                className="bookmark-image"
              />
              <div className="bookmark-details">
                <p className="bookmark-year">{movie.year}</p>
                <h3 className="bookmark-title">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="category-section">
        <h2 className="category-title">Bookmarked TV Series</h2>
        <div className="bookmark-grid">
          {bookmarkedTVSeries.map((series) => (
            <div className="bookmark-card" key={series._id}>
              <img
                src={series.thumbnailUrl.regularLarge}
                alt={series.title}
                className="bookmark-image"
              />
              <div className="bookmark-details">
                <p className="bookmark-year">{series.year}</p>
                <h3 className="bookmark-title">{series.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarked;

