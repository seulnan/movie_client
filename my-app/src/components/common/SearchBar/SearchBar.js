import React, { useState } from "react";
import "./SearchBar.css";
import searchIcon from "../../../assets/search.svg"; // 돋보기 이미지 경로

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // 입력값 관리

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      onSearch(""); // 검색어가 없으면 기본 화면으로 돌아감
    }
  };

  const handleSearchClick = () => {
    if (query.trim() !== "") {
      onSearch(query); // 돋보기 클릭 시 검색 실행
    }
  };

  return (
    <div className="search-bar">
      <img
        src={searchIcon}
        alt="Search Icon"
        className="search-icon"
        onClick={handleSearchClick}
      />
      <input
        type="text"
        className="search-input"
        placeholder="Search for movies or TV series"
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
