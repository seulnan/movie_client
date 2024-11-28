import React from 'react';
import './Recommended.css';

const Recommended = () => {
  return (
    <div className="recommended">
      <h2>Recommended for You</h2>
      <div className="grid">
        {/* Example content */}
        {Array.from({ length: 24 }, (_, index) => (
          <div className="grid-item" key={index}>
            Content {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
