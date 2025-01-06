import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// SVG 파일 경로
import HomeIcon from "../../../assets/home.svg";
import MovieIcon from "../../../assets/movie.svg";
import TVIcon from "../../../assets/tv.svg";
import BookmarkIcon from "../../../assets/Bookmark1.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* 네비게이션 링크 설정 */}
      <NavLink to="/home" className="icon">
        <img src={HomeIcon} alt="Home Icon" />
      </NavLink>
      <NavLink to="/movies" className="icon">
        <img src={MovieIcon} alt="Movies Icon" />
      </NavLink>
      <NavLink to="/tvseries" className="icon">
        <img src={TVIcon} alt="TVseries Icon" />
      </NavLink>
      <NavLink to="/recommended" className="icon">
        <img src={BookmarkIcon} alt="Bookmarked Icon" />
      </NavLink>
    </div>
  );
};

export default Sidebar;
