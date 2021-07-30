import React, { useRef } from 'react';
// 부트스트랩 아이콘
import { ArrowLeftCircle, ArrowRightCircle } from 'react-bootstrap-icons';
// css
import './Carousels.css';

const Carousels = ({ children }) => {
  // DOM에 접근하기위해서 useRef 사용
  const carouselRef = useRef();
  // 왼쪽 버튼 클릭 이벤트 핸들러
  let x = 0;
  const handleClickLeft = () => {
    if (x >= 0) return;
    x = x + 250;
    carouselRef.current.style.transform = `translateX(${x}px)`;
  };
  // 오른쪽 버튼 클릭 이벤트 핸들러
  const handleClickRight = () => {
    if (x < -1800) return;
    x = x - 250;
    carouselRef.current.style.transform = `translateX(${x}px)`;
  };

  return (
    <>
      {/* 왼쪽 버튼 */}
      <button className="carousel-btn left" onClick={handleClickLeft}>
        <ArrowLeftCircle size={40} />
      </button>
      {/* 내용 */}
      <div className="carousel">
        <div className="d-flex carousel-box" ref={carouselRef}>
          {children}
        </div>
      </div>
      {/* 오른쪽 버튼 */}
      <button className="carousel-btn right" onClick={handleClickRight}>
        <ArrowRightCircle size={40} />
      </button>
    </>
  );
};

export default Carousels;
