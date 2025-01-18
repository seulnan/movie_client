import React, { useState, useCallback } from "react";
import "./SearchBar.css";
import searchIcon from "../../../assets/search.svg";

const SearchBar = React.memo(({ onSearch }) => {
  const [query, setQuery] = useState("");

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      onSearch(""); // 검색어가 없으면 초기화
    }
  };

  // 검색 실행 함수
  const executeSearch = useCallback(() => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  }, [query, onSearch]);

  // Enter 키 입력 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  return (
    <div className="search-bar">
      <img
        src={searchIcon}
        alt="Search Icon"
        className="search-icon"
        onClick={executeSearch}
      />
      <input
        type="text"
        className="search-input"
        placeholder="Search for movies or TV series"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
      />
    </div>
  );
});

export default SearchBar;
