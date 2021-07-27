import React, { useState } from 'react';
// 부트스트랩
import { Form, Button } from 'react-bootstrap';
// CSS
import './WriteReview.css';
// 참조
import Stars from '../Stars/Stars';

const WriteReview = () => {
  // 별점 기능을 위한 상태
  const [star, setStar] = useState(1);

  // 클릭 시, 클릭된 idx 값으로 별점을 세팅한다.
  const handleClickStar = (idx) => {
    setStar(idx); // 클릭된 idx 값으로 star을 세팅
  };

  return (
    <div className="review m-3 d-flex align-items-center">
      <div className="review-contents flex-grow-1 d-flex flex-column justify-content-between">
        <div className="review-contents-header">
          <span className="review-star">
            {/* 별점 기능 */}
            {[1, 2, 3, 4, 5].map((i) => (
              <Stars key={i} idx={i} handleClickStar={handleClickStar} star={star} />
            ))}
          </span>
        </div>
        <div className="review-content">
          <Form.Control
            as="textarea"
            name="reviewContent"
            placeholder="리뷰를 남겨주세요"
            style={{ height: '100px' }}
          />
        </div>
        <Button>작성</Button>
      </div>
    </div>
  );
};

export default WriteReview;
