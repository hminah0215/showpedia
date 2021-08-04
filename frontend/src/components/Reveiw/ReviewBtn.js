import React from 'react';
// 부트스트랩 icons
import { HandThumbsUp, ExclamationCircle } from 'react-bootstrap-icons';
// css
import './ReviewBtn.css';

// handleClickLike - 좋아요 버튼 클릭 시, 처리할 핸들러
// handleClickReport - 신고 버튼 클릭 시, 처리할 핸들러
// like - 화면에 표시할 좋아요 text
const ReviewBtn = ({ handleClickLike, handleClickReport, likes }) => {
  return (
    <div className="review-btns d-flex align-items-center justify-content-end">
      {/* 좋아요 버튼 */}
      <button className="review-btn" onClick={handleClickLike}>
        <HandThumbsUp size={20} />
      </button>
      <span className="review-like">{likes}</span>
      {/* 신고 버튼 */}
      <button className="review-btn review-btn--alert" onClick={handleClickReport}>
        <ExclamationCircle size={20} />
      </button>
    </div>
  );
};

export default ReviewBtn;
