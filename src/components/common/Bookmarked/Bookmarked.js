import React, { useEffect, useState } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import movieIcon from "../../../assets/movie2.svg";
import tvIcon from "../../../assets/tv2.svg";
import playIcon from "../../../assets/play.svg";
import "./Bookmarked.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const toggleBookmark = async (id, setItems) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}/bookmark`);
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

const renderThumbnail = (item) => (
  <div className="thumbnail-container">
    <img
      src={item.thumbnailUrl.regularLarge}
      alt={item.title}
      className="movie-thumbnail"
    />
    <div className="play-button">
      <img src={playIcon} alt="Play" />
      <span>Play</span>
    </div>
  </div>
);

const renderItemInfo = (item) => (
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
);

const renderBookmarkIcon = (item, toggleBookmark) => (
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
);

const renderItems = (items, setItems, searchQuery, category) => {
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {!searchQuery && (
        <h2 className="bookmarked-header">{`Bookmarked ${category}`}</h2>
      )}
      {searchQuery && (
        <p className="search-results-text">
          Found {filteredItems.length} results for '{searchQuery}'
        </p>
      )}
      <div className="movie-list">
        {filteredItems.map((item) => (
          <div key={item._id} className="movie-item">
            {renderThumbnail(item)}
            {renderItemInfo(item)}
            {renderBookmarkIcon(item, toggleBookmark)}
          </div>
        ))}
      </div>
    </div>
  );
};

const Bookmarked = ({ searchQuery }) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedTVSeries, setBookmarkedTVSeries] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/bookmarks`);
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

  return (
    <div className="bookmarked-page">
      {renderItems(bookmarkedMovies, setBookmarkedMovies, searchQuery, "Movies")}
      {renderItems(bookmarkedTVSeries, setBookmarkedTVSeries, searchQuery, "TV Series")}
    </div>
  );
};

export default Bookmarked;
