import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// 부트스트랩
import { Form, Button } from 'react-bootstrap';
// CSS
import './WriteReview.css';
// 참조
import Stars from '../Stars/Stars';
// etc
import axios from 'axios';

const WriteReview = ({ setIsReviewed }) => {
  // URL에서 showId 가져오기
  const location = useLocation();
  const showId = location.pathname.split('/')[2];

  // 서버에 보낼 리뷰 데이터
  const [review, setReview] = useState({
    reviewStars: 1,
    reviewContents: '',
    memberId: 'Ayo', // 멤버 아이디를 임의로 지정
    showId: showId
  });

  // input change 핸들러
  const handleChangeInput = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value
    });
  };

  // 클릭 시, 클릭된 idx 값으로 별점을 세팅한다.
  const handleClickStar = (idx) => {
    setReview({
      ...review,
      reviewStars: idx
    });
  };

  // 리뷰를 저장하는 이벤트 핸들러
  const handleClickSaveButton = async () => {
    // axios를 사용해 서버에 데이터를 전달
    const URL = `http://localhost:3005/review`;
    try {
      const result = await axios.post(URL, review);
      if (result.status === 200) {
        setIsReviewed(true);
        // 리뷰를 저장했다면 페이지를 새로 고친다.
        window.location.replace(`/contents/${showId}`);
        return;
      }
      // 리뷰 작성 후, 이동하기
    } catch (error) {
      alert('리뷰 작성에 실패했습니다.');
      console.log(error);
      return false;
    }
  };

  return (
    <div className="review m-3 d-flex align-items-center">
      <div className="review-contents flex-grow-1 d-flex flex-column justify-content-between">
        <div className="review-contents-header">
          <span className="review-star">
            {/* 별점 기능 */}
            {[1, 2, 3, 4, 5].map((i) => (
              <Stars key={i} idx={i} handleClickStar={handleClickStar} star={review.reviewStars} />
            ))}
          </span>
        </div>
        <div className="review-content">
          <Form.Control
            as="textarea"
            name="reviewContents"
            placeholder="리뷰를 남겨주세요"
            style={{ height: '100px' }}
            onChange={handleChangeInput}
            value={review.reviewContents}
          />
        </div>
        <Button onClick={handleClickSaveButton}>작성</Button>
      </div>
    </div>
  );
};

export default WriteReview;
