import React from 'react';
// 부트스트랩 icons
import { HandThumbsUp, ExclamationCircle, PencilSquare } from 'react-bootstrap-icons';
// css
import './ReviewItem.css';
// 참조
import Stars from '../Stars/Stars';

const ReviewItem = ({ isReviewed, review }) => {
  return (
    <div className="review m-3 d-flex align-items-center">
      {/* 리뷰 유저정보 */}
      <div className="review-user d-flex flex-column align-items-center">
        <div className="review-user-img img-box">
          <img src={review.profilePhoto} alt="user"></img>
        </div>
        <p className="review-user-title">{review.memberId}</p>
      </div>
      {/* 리뷰 콘텐츠 */}
      <div className="review-contents-container flex-grow-1 d-flex flex-column justify-content-between">
        <div className="review-contents-header">
          <span className="review-date">{review.createdAt}</span>
          <span className="review-star">
            {/* 별점
              rating은 db에서 가져온 리뷰의 별점 점수이다.
            */}
            {[1, 2, 3, 4, 5].map((i) => (
              <Stars key={i} idx={i} rating={review.reviewStars} />
            ))}
          </span>
          {/* 내 리뷰일 경우 - 수정 버튼 */}
          {isReviewed ? (
            <button className="review-btn review-btn--modify">
              <PencilSquare size={20} />
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="review-content">{review.reviewContents}</div>
        {
          // 내 리뷰일 경우 버튼 숨김
          isReviewed ? (
            <></>
          ) : (
            <div className="review-btns d-flex align-items-center justify-content-end">
              <button className="review-btn">
                <HandThumbsUp size={20} />
              </button>
              <span className="review-like">{review.reviewLikes}</span>
              <button className="review-btn review-btn--alert">
                <ExclamationCircle size={20} />
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ReviewItem;
