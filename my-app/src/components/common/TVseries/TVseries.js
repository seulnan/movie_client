import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TVseries = () => {
  const [tvSeries, setTVSeries] = useState([]);

  useEffect(() => {
    const fetchTVSeries = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/works/TVseries');
        setTVSeries(response.data);
      } catch (error) {
        console.error('Error fetching TV series:', error.message);
      }
    };

    fetchTVSeries();
  }, []);

  return (
    <div>
      <h1>TV Series</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {tvSeries.map((series) => (
          <div
            key={series._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              width: '200px',
              textAlign: 'center',
            }}
          >
            <img
              src={series.thumbnailUrl.regularLarge}
              alt={series.title}
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <h3>{series.title}</h3>
            <p>Year: {series.year}</p>
            <p>Rating: {series.rating}</p>
            <p>Bookmarked: {series.isBookmarked ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVseries;
