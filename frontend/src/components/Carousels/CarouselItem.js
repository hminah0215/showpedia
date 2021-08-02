import React from 'react';
// css
import './CarouselItem.css';
/* 
  show - boxoffice에서 가져온 공연 정보가 들어있다.
*/
const CarouselItem = ({ show }) => {
  // 가져온 boxoffice의 포스터와 공연 이름을 보여준다.
  return (
    <div className="boxoffice">
      {/* 공연 이미지 */}
      <a href={`http://localhost:3000/contents/${show.mt20id}`}>
        <div className="img-box boxoffice-img">
          <img alt={show.prfnm} src={`http://www.kopis.or.kr/${show.poster}`}></img>
        </div>
      </a>
      {/* 공연 정보 */}
      <div className="boxoffice-content">
        <h5 className="boxoffice-title">{show.prfnm}</h5>
        <p>{show.prfpd}</p>
      </div>
    </div>
  );
};

export default CarouselItem;
