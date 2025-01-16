import React, { useEffect, useState } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import movieIcon from "../../../assets/movie2.svg";
import "./Movies.css";

const Movies = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);

  // 데이터 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/works/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };

    fetchMovies();
  }, []);

  // 북마크 토글
  const toggleBookmark = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5001/api/works/${id}/bookmark`);
      const updatedBookmark = response.data.isBookmarked;

      setMovies((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isBookmarked: updatedBookmark } : item
        )
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
    }
  };

  // 검색어에 따라 필터링
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 아이템 렌더링
  const renderMovies = () =>
    filteredMovies.map((movie) => (
      <div key={movie._id} className="movie-item">
        <img
          src={movie.thumbnailUrl.regularLarge}
          alt={movie.title}
          className="movie-thumbnail"
        />
        <div className="movie-info">
          <p>
            {movie.year} •{" "}
            <span className="category">
              <img src={movieIcon} alt="Movie" className="category-icon" /> Movie
            </span>{" "}
            • {movie.rating}
          </p>
          <h3>{movie.title}</h3>
        </div>
        <div
          className="bookmark-icon"
          onClick={() => toggleBookmark(movie._id)}
        >
          <img
            src={movie.isBookmarked ? bookmarkC : bookmark}
            alt="Bookmark"
            onMouseOver={(e) => (e.currentTarget.src = bookmarkH)}
            onMouseOut={(e) =>
              (e.currentTarget.src = movie.isBookmarked ? bookmarkC : bookmark)
            }
          />
        </div>
      </div>
    ));

  return (
    <div className="movies">
      <h2>Movies</h2>
      <div className="movie-list">{renderMovies()}</div>
    </div>
  );
};

export default Movies;
