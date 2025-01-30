import React from "react";
import Trending from "../Trending/Trending";
import Recommended from "../Recommended/Recommended";

const Home = ({ searchQuery }) => {
  return (
    <div className="home">
      <main className="home-content">
        {/* Trending Section */}
        {!searchQuery && (
          <section className="trending-section">
            <Trending />
          </section>
        )}

        {/* Recommended Section */}
        <section className="recommended-section">
          <Recommended searchQuery={searchQuery} />
        </section>
      </main>
    </div>
  );
};

export default Home;
