import React, { useEffect, useState } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import movieIcon from "../../../assets/movie2.svg";
import tvIcon from "../../../assets/tv2.svg";
import "./Bookmarked.css";

const toggleBookmark = async (id, setItems) => {
  try {
    const response = await axios.patch(
      `http://localhost:5001/api/works/${id}/bookmark`
    );
    const updatedBookmark = response.data.isBookmarked;

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
            {item.year} •{" "}
            <span className="category">
              <img
                src={item.category === "Movie" ? movieIcon : tvIcon}
                alt={item.category}
                className="category-icon"
              />{" "}
              {item.category}
            </span>{" "}
            • {item.rating}
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

const Bookmarked = ({ searchQuery }) => {
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

  // 검색어에 따라 필터링
  const filteredMovies = bookmarkedMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTVSeries = bookmarkedTVSeries.filter((series) =>
    series.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bookmark-page">
      <h2>Bookmarked Movies</h2>
      {renderItems(filteredMovies, setBookmarkedMovies)}

      <h2>Bookmarked TV Series</h2>
      {renderItems(filteredTVSeries, setBookmarkedTVSeries)}
    </div>
  );
};

export default Bookmarked;
