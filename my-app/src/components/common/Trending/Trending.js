import React from 'react';
import './Trending.css';

const Trending = () => {
  return (
    <div className="trending">
      <h2>Trending</h2>
      <div className="carousel">
        {/* Example cards */}
        {Array.from({ length: 5 }, (_, index) => (
          <div className="card" key={index}>
            Movie {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
