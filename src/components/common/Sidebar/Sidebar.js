import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

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
  const [isHidden, setIsHidden] = useState(false); // Sidebar 숨김 상태 관리
  const [lastScrollY, setLastScrollY] = useState(0); // 마지막 스크롤 위치
  const [activeIcon, setActiveIcon] = useState(""); // 현재 클릭된 아이콘 상태

  // 스크롤 이벤트로 Sidebar 숨기기 / 보이기 처리
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHidden(true); // 아래로 스크롤 시 숨기기
      } else {
        setIsHidden(false); // 위로 스크롤 시 보이기
      }
      setLastScrollY(window.scrollY); // 현재 스크롤 위치 업데이트
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // 이벤트 정리
  }, [lastScrollY]);

  const menuItems = [
    { name: "home", default: HomeIcon, hover: HomeHoverIcon, path: "/home" },
    { name: "movie", default: MovieIcon, hover: MovieHoverIcon, path: "/movies" },
    { name: "tv", default: TVIcon, hover: TVHoverIcon, path: "/tvseries" },
    { name: "bookmark", default: BookmarkIcon, hover: BookmarkHoverIcon, path: "/bookmarked" },
  ];

  const handleMouseEnter = (name) => {
    setActiveIcon((prev) => (prev !== name ? `${name}-hover` : prev));
  };

  const handleMouseLeave = (name) => {
    setActiveIcon((prev) => (prev !== name ? "" : prev));
  };

  return (
    <div className={`sidebar ${isHidden ? "hidden" : ""}`}>
      <div className="red-icon">
        <img src={RedIcon} alt="Red Icon" />
      </div>
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className="icon"
          onMouseEnter={() => handleMouseEnter(item.name)}
          onMouseLeave={() => handleMouseLeave(item.name)}
          onClick={() => setActiveIcon(item.name)}
        >
          <img
            src={activeIcon === item.name || activeIcon === `${item.name}-hover` ? item.hover : item.default}
            alt={`${item.name} Icon`}
          />
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
