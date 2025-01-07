import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Trending.css';

// 이미지 경로를 import로 가져오기
import bookmarkIcon from '../../../assets/bookmark.svg';
import bookmarkHover from '../../../assets/bookmarkH.svg';
import bookmarkClicked from '../../../assets/bookmarkC.svg';

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/works/trending');
        setTrendingData(response.data);
      } catch (error) {
        console.error('Error fetching trending data:', error.message);
      }
    };

    fetchTrendingData();
  }, []);

  // 북마크 클릭 핸들러
  const handleBookmarkClick = async (movie) => {
    const isBookmarked = bookmarkedMovies.some((m) => m._id === movie._id);

    try {
      const response = await axios.patch(`http://localhost:5001/api/works/${movie._id}/bookmark`);
      const updatedBookmark = response.data.isBookmarked;

      if (updatedBookmark) {
        setBookmarkedMovies((prev) => [...prev, movie]); // 북마크 추가
      } else {
        setBookmarkedMovies((prev) => prev.filter((m) => m._id !== movie._id)); // 북마크 제거
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error.message);
    }
  };

  return (
    <div className="trending">
      <h2>Trending</h2>
      <div className="carousel">
        {trendingData.map((item) => (
          <div className="card" key={item._id}>
            <img
              src={item.thumbnailUrl.regularLarge}
              alt={item.title}
              className="card-image"
            />
            <div className="card-info">
              <p className="movie-info">
                {item.year} • {item.category} • {item.rating}
              </p>
              <h3 className="movie-title">{item.title}</h3>
            </div>
            <div
              className="bookmark-icon"
              onClick={() => handleBookmarkClick(item)}
            >
              <img
                src={bookmarkedMovies.some((m) => m._id === item._id) ? bookmarkClicked : bookmarkIcon}
                alt="Bookmark"
                onMouseOver={(e) => (e.currentTarget.src = bookmarkHover)}
                onMouseOut={(e) =>
                  (e.currentTarget.src = bookmarkedMovies.some((m) => m._id === item._id) ? bookmarkClicked : bookmarkIcon)
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
