import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search for movies or TV series" />
    </div>
  );
};

export default SearchBar;
