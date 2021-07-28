import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// 부트스트랩
import { Form, Button } from 'react-bootstrap';
// CSS
import './WriteReview.css';
// 참조
import Stars from '../Stars/Stars';
// etc
import axios from 'axios';

/*
  setIsReviewed - [MyReview.js] / 내 리뷰가 존재하는지 판단하는 상태 설정 함수
  modify - 수정 모드로 사용하는 경우, 여기에 현재 리덕스에 있는 리뷰 데이터를 담아서 전달한다
*/
const WriteReview = ({ setIsReviewed, modify }) => {
  // URL에서 showId 가져오기
  const location = useLocation();
  const showId = location.pathname.split('/')[2];

  // 서버에 보낼 리뷰 데이터
  const [review, setReview] = useState({
    reviewStars: modify ? modify.reviewStars : 0,
    reviewContents: modify ? modify.reviewContents : '',
    // memberId: 'Ayo', // 서버에서 임의로 지정중
    showId: showId,
    reviewNo: modify ? modify.reviewNo : ''
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
    const URL = `http://localhost:3005/review`;
    // 만약 preReview가 존재한다면, 새로 리뷰를 작성하는 것이 아닌 리뷰를 수정한다
    if (modify) {
      console.log('수정을 위한 리뷰값 ', review);
      try {
        const result = await axios.put(URL, review);

        if (result.status === 200) {
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
    } else {
      // axios를 사용해 서버에 데이터를 전달
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
    }
  };

  const handleClickDeleteButton = async () => {
    console.log('삭제 버튼 클릭 시', review);
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const URL = `http://localhost:3005/review`;
      try {
        const result = await axios.delete(URL + `/${review.reviewNo}`);

        if (result.status === 200) {
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
    } else return;
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
            // 리뷰 수정일 경우, preReivew에서 읽어온 데이터를 value에 넣어둔다
            value={review.reviewContents}
          />
        </div>
        <div className="d-flex gap-4 mt-2">
          <Button className=" flex-grow-1" onClick={handleClickSaveButton}>
            작성
          </Button>
          <Button className=" flex-grow-1 btn" onClick={handleClickDeleteButton}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
