import React, { useRef } from 'react';
// 부트스트랩 아이콘
import { ArrowLeftCircle, ArrowRightCircle } from 'react-bootstrap-icons';
// css
import './Carousels.css';

const Carousels = ({ children }) => {
  const carouselRef = useRef();

  // 왼쪽 버튼 클릭 이벤트 핸들러
  const handleClickLeft = () => {
    // console.log('x 값', carouselRef.current.getBoundingClientRect().x);
    const x = carouselRef.current.getBoundingClientRect().x; // x 기본값이 약 200 정도
    // console.log('x + 350', x + 500);
    if (x > 200) return;
    carouselRef.current.style.transform = `translateX(${x + 270}px)`;
  };
  // 오른쪽 버튼 클릭 이벤트 핸들러
  const handleClickRight = () => {
    console.log('x 값', carouselRef.current.getBoundingClientRect().x);
    const x = carouselRef.current.getBoundingClientRect().x;
    if (x < -1500) return;
    console.log('x - 400', x - 400);
    carouselRef.current.style.transform = `translateX(${x - 400}px)`;
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
