import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>📋 All Content</li>
        <li>🎥 Movies</li>
        <li>📺 TV Series</li>
        <li>⭐ Bookmarked</li>
      </ul>
    </div>
  );
};

export default Sidebar;
