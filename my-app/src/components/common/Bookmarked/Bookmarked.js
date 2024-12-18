import React, { useState, useEffect } from "react";
import "./Bookmarked.css";  // CSS 파일을 import
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";

const WorksList = () => {
  const [works, setWorks] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  // 초기 데이터 가져오기
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/works/bookmarks`);
        setWorks(response.data);
      } catch (error) {
        console.error("Error fetching works:", error.message);
      }
    };
    fetchWorks();
  }, []);

  // 북마크 상태 토글 함수
  const toggleBookmark = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5001/api/works/${id}/bookmark`);
      setWorks((prevWorks) =>
        prevWorks.map((work) =>
          work._id === id ? { ...work, isBookmarked: response.data.isBookmarked } : work
        )
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
    }
  };

  // 북마크 아이콘 결정
  const getBookmarkIcon = (isBookmarked, id) => {
    if (hoveredId === id) return bookmarkH; // 호버 시 아이콘
    return isBookmarked ? bookmarkC : bookmark; // 북마크 상태에 따른 아이콘
  };

  // 카테고리별 분류
  const movies = works.filter((work) => work.category === "Movie");
  const tvSeries = works.filter((work) => work.category === "TV Series");

  return (
    <div className="works-container">
      <CategorySection
        title="Bookmarked Movies"
        works={movies}
        onToggleBookmark={toggleBookmark}
        onHover={setHoveredId}
        getBookmarkIcon={getBookmarkIcon}
      />
      <CategorySection
        title="Bookmarked TV Series"
        works={tvSeries}
        onToggleBookmark={toggleBookmark}
        onHover={setHoveredId}
        getBookmarkIcon={getBookmarkIcon}
      />
    </div>
  );
};

const CategorySection = ({ title, works, onToggleBookmark, onHover, getBookmarkIcon }) => {
  return (
    <div className="category-section">
      <h2>{title}</h2>
      <div className="works-list">
        {works.map((work) => (
          <div key={work._id} className="work-item">
            <img
              src={work.thumbnailUrl.regularLarge}
              alt={work.title}
              style={{ width: "300px", height: "auto" }}
            />
            <h3>{work.title}</h3>
            <p>{work.year}</p>
            <p>Rating: {work.rating}</p>
            <img
              src={getBookmarkIcon(work.isBookmarked, work._id)}
              alt="Bookmark"
              className="bookmark-icon"
              onMouseEnter={() => onHover(work._id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onToggleBookmark(work._id)}
              style={{ cursor: "pointer", width: "30px", height: "30px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorksList;
