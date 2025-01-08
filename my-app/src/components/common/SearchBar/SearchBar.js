import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = ({ setFilteredData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 검색어를 처리하는 함수
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        // 예시로 Movies API를 기준으로 검색
        const response = await axios.get(`http://localhost:5001/api/works/search`, {
          params: { query: searchTerm }, // 쿼리 파라미터로 검색어 전달
        });

        // 검색된 데이터를 상위 컴포넌트로 전달
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error.message);
      }
    }
  };

  // Enter 키로 검색도 가능하게 하기
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        onClick={handleSearch} // 돋보기 클릭 시 검색
      >
        <rect opacity="0.01" width="32" height="32" fill="black" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.08 21.2L27.6133 25.72C27.8657 25.9704 28.0077 26.3111 28.0077 26.6667C28.0077 27.0222 27.8657 27.363 27.6133 27.6133C27.363 27.8657 27.0222 28.0077 26.6667 28.0077C26.3111 28.0077 25.9704 27.8657 25.72 27.6133L21.2 23.08C19.3366 24.5426 17.0355 25.3363 14.6667 25.3333C8.77563 25.3333 4 20.5577 4 14.6667C4 8.77563 8.77563 4 14.6667 4C20.5577 4 25.3333 8.77563 25.3333 14.6667C25.3363 17.0355 24.5426 19.3366 23.08 21.2ZM14.6667 6.66667C10.2484 6.66667 6.66667 10.2484 6.66667 14.6667C6.66667 19.0849 10.2484 22.6667 14.6667 22.6667C19.0849 22.6667 22.6667 19.0849 22.6667 14.6667C22.6667 10.2484 19.0849 6.66667 14.6667 6.66667Z"
          fill="white"
        />
      </svg>
      <input
        type="text"
        placeholder="Search for movies or TV series"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // 입력값 처리
        onKeyPress={handleKeyPress} // 엔터 키 입력 처리
      />
    </div>
  );
};

export default SearchBar;
