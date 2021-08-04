import React from 'react';
import Stars from '../Stars/Stars';

const ReviewHeader = ({ review }) => {
  return (
    <div className="review-contents-header">
      <span className="review-date">{review?.createdAt ? review?.createdAt.slice(0, 10) : ''}</span>
      <span className="review-star">
        {/* 별점
rating은 db에서 가져온 리뷰의 별점 점수이다.
*/}
        {[1, 2, 3, 4, 5].map((i) => (
          <Stars key={i} idx={i} rating={review?.reviewStars} />
        ))}
      </span>
    </div>
  );
};

export default ReviewHeader;
