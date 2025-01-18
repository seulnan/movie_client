import React, { useEffect, useState } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import tvIcon from "../../../assets/tv2.svg";
import "./TVseries.css";

const TVseries = ({ searchQuery }) => {
  const [tvSeries, setTVSeries] = useState([]);

  useEffect(() => {
    const fetchTVSeries = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/works/tvseries");
        setTVSeries(data);
      } catch (error) {
        console.error("Error fetching TV series:", error.message);
      }
    };
    fetchTVSeries();
  }, []);

  const toggleBookmark = async (id) => {
    try {
      const { data } = await axios.patch(`http://localhost:5001/api/works/${id}/bookmark`);
      setTVSeries((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isBookmarked: data.isBookmarked } : item
        )
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
    }
  };

  const filteredTVSeries = tvSeries.filter((series) =>
    series.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tvseries tvseries-page">
      <h2 className="tvseries-header">TV Series</h2>
      <div className="movie-list tvseries-list">
        {filteredTVSeries.map((series) => (
          <div key={series._id} className="movie-item tvseries-item">
            <img
              src={series.thumbnailUrl.regularLarge}
              alt={series.title}
              className="movie-thumbnail tvseries-thumbnail"
            />
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
                onMouseOver={(e) => (e.currentTarget.src = bookmarkH)}
                onMouseOut={(e) =>
                  (e.currentTarget.src = series.isBookmarked ? bookmarkC : bookmark)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVseries;
