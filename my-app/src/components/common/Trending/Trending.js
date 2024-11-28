import React from 'react';
import './Trending.css';

// Trending PNG 이미지 import
import Trending1 from '../../../assets/Trending1.png';  // 경로 수정
import Trending2 from '../../../assets/Trending2.png';  // 경로 수정
import Trending3 from '../../../assets/Trending3.png';  // 경로 수정
import Trending4 from '../../../assets/Trending4.png';  // 경로 수정
import Trending5 from '../../../assets/Trending5.png'; 

const Trending = () => {
  const trendingImages = [Trending1, Trending2, Trending3, Trending4, Trending5];

  return (
    <div className="trending">
      <h2>Trending</h2>
      <div className="carousel">
        {trendingImages.map((image, index) => (
          <div className="card" key={index}>
            <img src={image} alt={`Trending ${index + 1}`} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
