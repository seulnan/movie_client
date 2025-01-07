import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Trending.css';

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

  const handleBookmarkClick = (movie) => {
    if (bookmarkedMovies.some((m) => m._id === movie._id)) {
      setBookmarkedMovies(bookmarkedMovies.filter((m) => m._id !== movie._id));
    } else {
      setBookmarkedMovies([...bookmarkedMovies, movie]);
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
            <div className="bookmark-icon" onClick={() => handleBookmarkClick(item)}>
              <img 
                src={require(`../../../assets/${bookmarkedMovies.some((m) => m._id === item._id) ? 'bookmarkC.svg' : 'bookmark.svg'}`)} 
                alt="Bookmark" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;