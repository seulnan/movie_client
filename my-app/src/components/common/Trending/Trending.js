import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Trending.css';

import bookmarkIcon from '../../../assets/bookmark.svg';
import bookmarkHover from '../../../assets/bookmarkH.svg';
import bookmarkClicked from '../../../assets/bookmarkC.svg';
import movieIcon from '../../../assets/movie2.svg';
import tvIcon from '../../../assets/tv2.svg';
import playIcon from '../../../assets/play.svg';

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

  const handleBookmarkClick = async (movie) => {
    try {
      const response = await axios.patch(`http://localhost:5001/api/works/${movie._id}/bookmark`);
      const updatedBookmark = response.data.isBookmarked;

      if (updatedBookmark) {
        setBookmarkedMovies((prev) => [...prev, movie]);
      } else {
        setBookmarkedMovies((prev) => prev.filter((m) => m._id !== movie._id));
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
            <div className="card-overlay">
              <img
                src={item.thumbnailUrl.regularLarge}
                alt={item.title}
                className="card-image"
              />
              <div className="play-overlay">
                <div className="play-button">
                  <img src={playIcon} alt="Play" className="play-icon" />
                  <span>Play</span>
                </div>
              </div>
            </div>
            <div className="card-info">
              <p className="movie-info">
                {item.year} •{' '}
                <span className="category">
                  <img
                    src={item.category === 'Movie' ? movieIcon : tvIcon}
                    alt={item.category}
                    className="category-icon"
                  />{' '}
                  {item.category}
                </span>{' '}
                • {item.rating}
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
