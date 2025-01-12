import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// SVG 파일 경로
import RedIcon from "../../../assets/Red.svg";
import HomeIcon from "../../../assets/home.svg";
import MovieIcon from "../../../assets/movie.svg";
import TVIcon from "../../../assets/tv.svg";
import BookmarkIcon from "../../../assets/Bookmark1.svg";
import HomeHoverIcon from "../../../assets/home2.svg";
import MovieHoverIcon from "../../../assets/movie2.svg";
import TVHoverIcon from "../../../assets/tv2.svg";
import BookmarkHoverIcon from "../../../assets/Bookmark2.svg";

const Sidebar = () => {
  const [homeIcon, setHomeIcon] = useState(HomeIcon);
  const [movieIcon, setMovieIcon] = useState(MovieIcon);
  const [tvIcon, setTvIcon] = useState(TVIcon);
  const [bookmarkIcon, setBookmarkIcon] = useState(BookmarkIcon);

  const [activeIcon, setActiveIcon] = useState(null); // 클릭한 아이콘 상태 관리

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName); // 클릭한 아이콘 이름 저장
  };

  return (
    <div className="sidebar">
      {/* 사이드바 맨 위에 Red.svg 추가 */}
      <div className="red-icon">
        <img src={RedIcon} alt="Red Icon" />
      </div>

      {/* 네비게이션 링크 설정 */}
      <NavLink
        to="/home"
        className="icon"
        onMouseEnter={() => setHomeIcon(HomeHoverIcon)}
        onMouseLeave={() => setHomeIcon(HomeIcon)}
        onClick={() => handleIconClick("home")}
      >
        <img src={activeIcon === "home" ? HomeHoverIcon : homeIcon} alt="Home Icon" />
      </NavLink>
      <NavLink
        to="/movies"
        className="icon"
        onMouseEnter={() => setMovieIcon(MovieHoverIcon)}
        onMouseLeave={() => setMovieIcon(MovieIcon)}
        onClick={() => handleIconClick("movie")}
      >
        <img src={activeIcon === "movie" ? MovieHoverIcon : movieIcon} alt="Movies Icon" />
      </NavLink>
      <NavLink
        to="/tvseries"
        className="icon"
        onMouseEnter={() => setTvIcon(TVHoverIcon)}
        onMouseLeave={() => setTvIcon(TVIcon)}
        onClick={() => handleIconClick("tv")}
      >
        <img src={activeIcon === "tv" ? TVHoverIcon : tvIcon} alt="TVseries Icon" />
      </NavLink>
      <NavLink
        to="/bookmarked"
        className="icon"
        onMouseEnter={() => setBookmarkIcon(BookmarkHoverIcon)}
        onMouseLeave={() => setBookmarkIcon(BookmarkIcon)}
        onClick={() => handleIconClick("bookmark")}
      >
        <img src={activeIcon === "bookmark" ? BookmarkHoverIcon : bookmarkIcon} alt="Bookmarked Icon" />
      </NavLink>
    </div>
  );
};

export default Sidebar;
