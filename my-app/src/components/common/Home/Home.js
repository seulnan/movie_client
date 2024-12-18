import React from 'react';
import Trending from '../Trending/Trending';  // Trending 컴포넌트 import
import Recommended from '../Recommended/Recommended';  // Recommended 컴포넌트 import

const Home = () => {
  return (
    <div className="home">

      <main className="home-content">
        {/* Trending Section */}
        <section className="trending-section">
          <Trending />  {/* Trending 컴포넌트 렌더링 */}
        </section>

        {/* Recommended Section */}
        <section className="recommended-section">
          <Recommended />  {/* Recommended 컴포넌트 렌더링 */}
        </section>
      </main>
    </div>
  );
};

export default Home;
