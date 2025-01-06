import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TVseries.css";

const TVseries = ({ handleBookmarkClick }) => {
  const [tvSeries, setTVSeries] = useState([]);

  useEffect(() => {
    const fetchTVSeries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/works/tvseries"
        );
        setTVSeries(response.data);
      } catch (error) {
        console.error("Error fetching TV series:", error.message);
      }
    };

    fetchTVSeries();
  }, []);

  return (
    <div className="tvseries">
      <h2>TV Series</h2>
      <div className="movie-list">
        {tvSeries.map((series) => (
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
            {/* 북마크 아이콘 추가 */}
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
  );
};

export default TVseries;
