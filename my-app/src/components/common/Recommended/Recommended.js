import React, { useState } from 'react';
import './Recommended.css';

// 이미지 경로 가져오기
import Recommend1 from '../../../assets/Recommend1.png';
import Recommend2 from '../../../assets/Recommend2.png';
import Recommend3 from '../../../assets/Recommend3.png';
import Recommend4 from '../../../assets/Recommend4.png';
import Recommend5 from '../../../assets/Recommend5.png';
import Recommend6 from '../../../assets/Recommend6.png';
import Recommend7 from '../../../assets/Recommend7.png';
import Recommend8 from '../../../assets/Recommend8.png';
import Recommend9 from '../../../assets/Recommend9.png';
import Recommend10 from '../../../assets/Recommend10.png';
import Recommend11 from '../../../assets/Recommend11.png';
import Recommend12 from '../../../assets/Recommend12.png';
import Recommend13 from '../../../assets/Recommend13.png';
import Recommend14 from '../../../assets/Recommend14.png';
import Recommend15 from '../../../assets/Recommend15.png';
import Recommend16 from '../../../assets/Recommend16.png';
import Recommend17 from '../../../assets/Recommend17.png';
import Recommend18 from '../../../assets/Recommend18.png';
import Recommend19 from '../../../assets/Recommend19.png';
import Recommend20 from '../../../assets/Recommend20.png';
import Recommend21 from '../../../assets/Recommend21.png';
import Recommend22 from '../../../assets/Recommend22.png';
import Recommend23 from '../../../assets/Recommend23.png';
import Recommend24 from '../../../assets/Recommend24.png';

import bookmarkDefault from '../../../assets/BookMark.svg';
import bookmarkHover from '../../../assets/BookMarkhover.svg';
import bookmarkClick from '../../../assets/BookMarkClick.svg';

const images = [
  Recommend1, Recommend2, Recommend3, Recommend4, Recommend5, Recommend6,
  Recommend7, Recommend8, Recommend9, Recommend10, Recommend11, Recommend12,
  Recommend13, Recommend14, Recommend15, Recommend16, Recommend17, Recommend18,
  Recommend19, Recommend20, Recommend21, Recommend22, Recommend23, Recommend24
];

const Recommended = () => {
  const [bookmarks, setBookmarks] = useState(Array(24).fill(false)); // 북마크 상태

  const handleBookmarkClick = (index) => {
    setBookmarks((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className="recommended">
      <h2>Recommended for You</h2>
      <div className="grid">
        {images.map((image, index) => (
          <div className="grid-item" key={index}>
            {/* 컨텐츠 이미지 */}
            <img src={image} alt={`Recommended ${index + 1}`} />

            {/* 북마크 아이콘 */}
            <img
              className="bookmark-icon"
              src={bookmarks[index] ? bookmarkClick : bookmarkDefault}
              alt="Bookmark"
              onMouseEnter={(e) => (e.target.src = bookmarkHover)}
              onMouseLeave={(e) =>
                (e.target.src = bookmarks[index] ? bookmarkClick : bookmarkDefault)
              }
              onClick={() => handleBookmarkClick(index)}
            />

            {/* 컨텐츠 정보 */}
            <div className="content-info">
              <span>2019</span>
              <span>Movies</span>
              <span>E</span>
            </div>

            {/* 컨텐츠 제목 */}
            <div className="content-title">Content Title {index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
