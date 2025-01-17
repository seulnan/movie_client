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
  const [activeIcon, setActiveIcon] = useState(null); // 클릭한 아이콘 상태 관리
  const [hoverIcon, setHoverIcon] = useState(null); // 호버 상태 관리

  const menuItems = [
    { name: "home", default: HomeIcon, hover: HomeHoverIcon, path: "/home" },
    { name: "movie", default: MovieIcon, hover: MovieHoverIcon, path: "/movies" },
    { name: "tv", default: TVIcon, hover: TVHoverIcon, path: "/tvseries" },
    { name: "bookmark", default: BookmarkIcon, hover: BookmarkHoverIcon, path: "/bookmarked" },
  ];

  return (
    <div className="sidebar">
      <div className="red-icon">
        <img src={RedIcon} alt="Red Icon" />
      </div>
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className="icon"
          onMouseEnter={() => setHoverIcon(item.name)} // 마우스가 아이콘 위에 올라가면 호버 상태로
          onMouseLeave={() => setHoverIcon(null)} // 마우스가 아이콘을 떠나면 호버 상태 해제
          onClick={() => setActiveIcon(item.name)} // 클릭하면 active 상태로 설정
        >
          <img
            src={
              activeIcon === item.name // 클릭된 아이콘이면
                ? item.hover
                : hoverIcon === item.name // 호버된 아이콘이면
                ? item.hover
                : item.default // 기본 상태
            }
            alt={`${item.name} Icon`}
          />
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
