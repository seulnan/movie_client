import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import bookmark from "../../../assets/bookmark.svg";
import bookmarkH from "../../../assets/bookmarkH.svg";
import bookmarkC from "../../../assets/bookmarkC.svg";
import movieIcon from "../../../assets/movie2.svg";
import tvIcon from "../../../assets/tv2.svg";
import "./Recommended.css";

const Recommended = ({ searchQuery }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 fetch 함수
  const fetchRecommendedMovies = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/works/recommend");
      setRecommendedMovies(response.data);
    } catch (error) {
      console.error("Error fetching recommended movies:", error.message);
    } finally {
      setIsLoading(false); // 로딩 상태 해제
    }
  }, []);

  useEffect(() => {
    fetchRecommendedMovies();
  }, [fetchRecommendedMovies]);

  // 북마크 토글 함수
  const toggleBookmark = useCallback(
    async (id) => {
      try {
        const response = await axios.patch(`http://localhost:5001/api/works/${id}/bookmark`);
        const updatedBookmark = response.data.isBookmarked;

        setRecommendedMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie._id === id ? { ...movie, isBookmarked: updatedBookmark } : movie
          )
        );
      } catch (error) {
        console.error("Error toggling bookmark:", error.message);
      }
    },
    []
  );

  // 검색어 필터링
  const filteredMovies = recommendedMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="recommended">
      <h2>Recommended for you</h2>
      <div className="movie-list">
        {filteredMovies.map((movie) => (
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
                  <img
                    src={movie.category === "Movie" ? movieIcon : tvIcon}
                    alt={movie.category}
                    className="category-icon"
                  />{" "}
                  {movie.category}
                </span>{" "}
                • {movie.rating}
              </p>
              <h3>{movie.title}</h3>
            </div>
            <div
              className="bookmark-icon"
              onClick={() => toggleBookmark(movie._id)}
              onMouseOver={(e) => (e.currentTarget.src = bookmarkH)}
              onMouseOut={(e) =>
                (e.currentTarget.src = movie.isBookmarked ? bookmarkC : bookmark)
              }
            >
              <img
                src={movie.isBookmarked ? bookmarkC : bookmark}
                alt="Bookmark"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
