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
        const response = await axios.get("http://localhost:5001/api/works/tvseries");
        setTVSeries(response.data);
      } catch (error) {
        console.error("Error fetching TV series:", error.message);
      }
    };

    fetchTVSeries();
  }, []);

  // 북마크 토글
  const toggleBookmark = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5001/api/works/${id}/bookmark`);
      const updatedBookmark = response.data.isBookmarked;

      setTVSeries((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isBookmarked: updatedBookmark } : item
        )
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
    }
  };

  // 검색어에 따라 필터링
  const filteredTVSeries = tvSeries.filter((series) =>
    series.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 아이템 렌더링
  const renderTVSeries = () =>
    filteredTVSeries.map((series) => (
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
    ));

  return (
    <div className="tvseries">
      <h2>TV Series</h2>
      <div className="movie-list">{renderTVSeries()}</div>
    </div>
  );
};

export default TVseries;
