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
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/trending`);
        setTrendingData(response.data);
      } catch (error) {
        console.error("Error fetching trending data:", error.message);
      }
    };

    const fetchBookmarkedData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/bookmarks`);
        setBookmarkedMovies(response.data);
      } catch (error) {
        console.error("Error fetching bookmarked movies:", error.message);
      }
    };

    fetchTrendingData();
    fetchBookmarkedData();
  }, []);

  // 북마크 클릭 핸들러
  const handleBookmarkClick = async (id) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/bookmark`);
      const updatedBookmark = response.data.isBookmarked;

      setTrendingData((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isBookmarked: updatedBookmark } : item
        )
      );

      if (updatedBookmark) {
        setBookmarkedMovies((prev) => [...prev, id]); // 북마크 추가
      } else {
        setBookmarkedMovies((prev) => prev.filter((m) => m !== id)); // 북마크 제거
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
    }
  };

  return (
    <div className="trending">
      <h2>Trending</h2>
      <div className="carousel">
        {trendingData.map((item) => (
          <div className="card" key={item._id}>
            <div className="card-image-container">
              <img
                src={item.thumbnailUrl.regularLarge}
                alt={item.title}
                className="card-image"
              />
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
                    style={{ width: "13px", height: "13px" }} // Inline style for 13x13 size
                  />{" "}
                  {item.category}
                </span>{" "}
                • {item.rating}
              </p>
              <h3 className="movie-title">{item.title}</h3>
            </div>
            <div
              className="bookmark-icon"
              onClick={() => handleBookmarkClick(item._id)}
            >
              <img
                src={bookmarkedMovies.includes(item._id) ? bookmarkClicked : bookmarkIcon}
                alt="Bookmark"
                onMouseOver={(e) => (e.currentTarget.src = bookmarkHover)}
                onMouseOut={(e) =>
                  (e.currentTarget.src = bookmarkedMovies.includes(item._id) ? bookmarkClicked : bookmarkIcon)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
