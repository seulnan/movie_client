import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Trending.css';

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]); // Trending 데이터를 저장할 상태

  // API에서 데이터 가져오기
  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/works/trending');
      console.log('API Response:', response.data); // 응답 데이터 구조 확인

      // API에서 받은 데이터가 배열 형태인지 확인 후 상태에 저장
      if (Array.isArray(response.data)) {
        setTrendingData(response.data);
      } else {
        console.error('Invalid response format');
      }
    } catch (error) {
      console.error(
        'Error fetching trending data:',
        error.response ? error.response.data : error.message
      );
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
        {trendingData.length === 0 ? (
          <p>Loading...</p> // 데이터가 로딩 중일 때 메시지 표시
        ) : (
          trendingData.map((item, index) => (
            <div className="card" key={index}>
              {/* 이미지와 제목 렌더링 */}
              <img
                src={item.thumbnail.regularLarge} // `thumbnail` 객체의 `regularLarge` 속성 접근
                alt={item.title}
                style={{ width: '100%', height: '100%', borderRadius: '10px' }}
              />
              <p>{item.title}</p> {/* 제목 렌더링 */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Trending;
