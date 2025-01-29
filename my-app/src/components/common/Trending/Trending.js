import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Trending.css";

// 이미지 경로
import bookmarkIcon from "../../../assets/bookmark.svg";
import bookmarkHover from "../../../assets/bookmarkH.svg";
import bookmarkClicked from "../../../assets/bookmarkC.svg";
import movieIcon from "../../../assets/movie2.svg";
import tvIcon from "../../../assets/tv2.svg";
import playIcon from "../../../assets/play.svg"; // Play 아이콘 추가

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingRes, bookmarksRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/trending`),
          axios.get(`${API_BASE_URL}/bookmarks`),
        ]);

        const bookmarkedIds = new Set(bookmarksRes.data);
        const updatedTrendingData = trendingRes.data.map((item) => ({
          ...item,
          isBookmarked: bookmarkedIds.has(item._id),
        }));

        setTrendingData(updatedTrendingData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleBookmarkClick = async (id) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/bookmark`);
      const isBookmarked = response.data.isBookmarked;

      setTrendingData((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isBookmarked } : item
        )
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
    }
  };

  return (
    <div className="trending">
      <h2>Trending</h2>
      <div className="carousel">
        {trendingData.map((item) => (
          <TrendingCard
            key={item._id}
            item={item}
            onBookmarkClick={handleBookmarkClick}
          />
        ))}
      </div>
    </div>
  );
};

const TrendingCard = ({ item, onBookmarkClick }) => {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src={item.thumbnailUrl.regularLarge} alt={item.title} className="card-image" />
        <div className="hover-overlay">
          <div className="play-button">
            <img src={playIcon} alt="Play" />
            <span>Play</span>
          </div>
        </div>
      </div>
      <div className="card-info">
        <p className="movie-info">
          {item.year} •{" "}
          <span className="category">
            <img
              src={item.category === "Movie" ? movieIcon : tvIcon}
              alt={item.category}
              className="category-icon"
              style={{ width: "13px", height: "13px" }}
            />{" "}
            {item.category}
          </span>{" "}
          • {item.rating}
        </p>
        <h3 className="movie-title">{item.title}</h3>
      </div>
      <BookmarkIcon
        isBookmarked={item.isBookmarked}
        onClick={() => onBookmarkClick(item._id)}
      />
    </div>
  );
};

const BookmarkIcon = ({ isBookmarked, onClick }) => {
  return (
    <div className="bookmark-icon" onClick={onClick}>
      <img
        src={isBookmarked ? bookmarkClicked : bookmarkIcon}
        alt="Bookmark"
        onMouseOver={(e) => (e.currentTarget.src = bookmarkHover)}
        onMouseOut={(e) =>
          (e.currentTarget.src = isBookmarked ? bookmarkClicked : bookmarkIcon)
        }
      />
    </div>
  );
};

export default Trending;
