import React, { useEffect, useState } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import tvIcon from "../../../assets/tv2.svg";
import "./TVseries.css";

const TVseries = ({ searchQuery }) => {
  const [tvSeries, setTVSeries] = useState([]);

  // 데이터 가져오기
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

  // 북마크 토글
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

  // 필터링된 TV 시리즈
  const filteredTVSeries = tvSeries.filter((series) =>
    series.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tvseries">
      <h2>TV Series</h2>
      <div className="movie-list">
        {filteredTVSeries.map((series) => (
          <div key={series._id} className="movie-item">
            <img
              src={series.thumbnailUrl.regularLarge}
              alt={series.title}
              className="movie-thumbnail"
            />
            <div className="movie-info">
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
              className="bookmark-icon"
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
