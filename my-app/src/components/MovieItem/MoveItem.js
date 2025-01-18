import React from "react";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import "./MovieItem.css";

const MovieItem = ({ item, toggleBookmark }) => {
  return (
    <div className="movie-item">
      <img
        src={item.thumbnailUrl.regularLarge}
        alt={item.title}
        className="movie-thumbnail"
      />
      <div className="movie-info">
        <p>
          {item.year} •{" "}
          <span className="category">
            <img
              src={item.categoryIcon}
              alt={item.category}
              className="category-icon"
            />{" "}
            {item.category}
          </span>{" "}
          • {item.rating}
        </p>
        <h3>{item.title}</h3>
      </div>
      <div className="bookmark-icon" onClick={() => toggleBookmark(item._id)}>
        <img
          src={item.isBookmarked ? bookmarkC : bookmark}
          alt="Bookmark"
          onMouseOver={(e) => (e.currentTarget.src = bookmarkH)}
          onMouseOut={(e) =>
            (e.currentTarget.src = item.isBookmarked ? bookmarkC : bookmark)
          }
        />
      </div>
    </div>
  );
};

export default MovieItem;
