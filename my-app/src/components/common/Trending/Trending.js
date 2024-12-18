import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Trending.css';

const Trending = ({ handleBookmarkClick }) => {
  const [trendingData, setTrendingData] = useState([]);

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/works/trending');
      if (Array.isArray(response.data)) {
        setTrendingData(response.data);
      } else {
        console.error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching trending data:', error.message);
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

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
            {/* 북마크 아이콘 추가 */}
            <div className="bookmark-icon" onClick={() => handleBookmarkClick(item)}>
              <img src={require('../../../assets/bookmark.svg')} alt="Bookmark" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
