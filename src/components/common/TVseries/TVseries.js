import React, { useEffect, useState } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import tvIcon from "../../../assets/tv2.svg";
import playIcon from "../../../assets/play.svg";
import "./TVseries.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TVseries = ({ searchQuery }) => {
  const [tvSeries, setTVSeries] = useState([]);

  const fetchTVSeries = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/tvseries`);
      setTVSeries(data);
    } catch (error) {
      console.error("Error fetching TV series:", error.message);
    }
  };

  useEffect(() => {
    fetchTVSeries();
  }, []);

  const toggleBookmark = async (id) => {
    try {
      const { data } = await axios.patch(`${API_BASE_URL}/${id}/bookmark`);
      setTVSeries((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isBookmarked: data.isBookmarked } : item
        )
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
    }
  };

  const handleMouseOver = (e, isBookmarked) => {
    e.currentTarget.src = isBookmarked ? bookmarkC : bookmarkH;
  };

  const handleMouseOut = (e, isBookmarked) => {
    e.currentTarget.src = isBookmarked ? bookmarkC : bookmark;
  };

  const filteredTVSeries = tvSeries.filter((series) =>
    series.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tvseries tvseries-page">
      {!searchQuery && <h2 className="tvseries-header">TV Series</h2>}
      {searchQuery && (
        <p className="search-results-text">
          Found {filteredTVSeries.length} results for '{searchQuery}'
        </p>
      )}
      <div className="movie-list tvseries-list">
        {filteredTVSeries.map((series) => (
          <div key={series._id} className="movie-item tvseries-item">
            <div className="movie-thumbnail-container">
              <img
                src={series.thumbnailUrl.regularLarge}
                alt={series.title}
                className="movie-thumbnail tvseries-thumbnail"
              />
              <div className="hover-overlay">
                <div className="play-button">
                  <img src={playIcon} alt="Play" />
                  <span>Play</span>
                </div>
              </div>
            </div>
            <div className="movie-info tvseries-info">
              <p>
                {series.year} •{" "}
                <span className="category">
                  <img src={tvIcon} alt="TV Series" className="category-icon" /> TV Series
                </span>{" "}
                • {series.rating}
              </p>
              <h3>{series.title}</h3>
            </div>
            <div
              className="bookmark-icon tvseries-bookmark-icon"
              onClick={() => toggleBookmark(series._id)}
            >
              <img
                src={series.isBookmarked ? bookmarkC : bookmark}
                alt="Bookmark"
                onMouseOver={(e) => handleMouseOver(e, series.isBookmarked)}
                onMouseOut={(e) => handleMouseOut(e, series.isBookmarked)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVseries;
