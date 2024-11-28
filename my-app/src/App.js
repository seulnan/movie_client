import React from 'react';
import './App.css';
import Sidebar from './components/common/Sidebar/Sidebar';
import SearchBar from './components/common/SearchBar/SearchBar';
import Trending from './components/common/Trending/Trending';
import Recommended from './components/common/Recommended/Recommended';

const App = () => {
  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar />
      <div className="content">
        {/* Search Bar */}
        <SearchBar />

        {/* Trending Section */}
        <Trending />

        {/* Recommended Section */}
        <Recommended />
      </div>
    </div>
  );
};

export default App;
