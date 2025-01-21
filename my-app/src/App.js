import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import './index.css'; // 글로벌 스타일 적용
import Sidebar from "./components/common/Sidebar/Sidebar";
import SearchBar from "./components/common/SearchBar/SearchBar";
import Home from "./components/common/Home/Home";
import Movies from "./components/common/Movies/Movies";
import TVSeries from "./components/common/TVseries/TVseries";
import Bookmarked from "./components/common/Bookmarked/Bookmarked";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // 검색어 변경 핸들러
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase()); // 대소문자 무시 처리
  };

  return (
    <Router>
      <div className="app">
        {/* Sidebar */}
        <Sidebar />
        <div className="content">
          {/* SearchBar와 각 페이지 연결 */}
          <div className="search-bar-container">
            <SearchBar onSearch={handleSearch} />
          </div>
          <Routes>
            {/* Home Page */}
            <Route path="/home" element={<Home searchQuery={searchQuery} />} />

            {/* Movies Page */}
            <Route path="/movies" element={<Movies searchQuery={searchQuery} />} />

            {/* TV Series Page */}
            <Route path="/tvseries" element={<TVSeries searchQuery={searchQuery} />} />

            {/* Bookmarked Page */}
            <Route path="/bookmarked" element={<Bookmarked searchQuery={searchQuery} />} />

            {/* Default Route */}
            <Route path="*" element={<Home searchQuery={searchQuery} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
