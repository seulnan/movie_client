import React from 'react';
import './Trending.css';

const Trending = () => {
  return (
    <div className="trending">
      <h2>Trending</h2>
      <div className="carousel">
        {/* Example cards */}
        <div className="card">Movie 1</div>
        <div className="card">Movie 2</div>
        <div className="card">Movie 3</div>
        <div className="card">Movie 4</div>
        <div className="card">Movie 5</div>
      </div>
    </div>
  );
};

export default Trending;
