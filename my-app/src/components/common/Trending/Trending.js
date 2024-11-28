import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Trending.css';

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]); // Trending 데이터를 저장할 상태

  // API에서 데이터 가져오기
  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/works/trending');
      console.log('API Response:', response.data); // 여기에서 응답 확인
      setTrendingData(response.data); // 응답 데이터를 상태에 저장
    } catch (error) {
      console.error('Error fetching trending data:', error.message);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 API 호출
  useEffect(() => {
    fetchTrendingData();
  }, []);

  return (
    <div className="trending">
      <h2>Trending</h2>
      <div className="carousel">
        {trendingData.map((item, index) => (
          <div className="card" key={index}>
            {/* API로부터 받은 이미지와 제목 렌더링 */}
            <img
              src={item.image} // API에서 받은 이미지 경로
              alt={item.title} // API에서 받은 제목
              style={{ width: '100%', height: '100%', borderRadius: '10px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
