import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { reRenderReview } from '../../redux/review';
import { useLocation } from 'react-router-dom';
// 부트스트랩
import { Form, Button } from 'react-bootstrap';

// 참조
import Stars from '../Stars/Stars';
// etc
import axios from 'axios';

/*
  setIsReviewed - [MyReview.js] / 내 리뷰가 존재하는지 판단하는 상태 설정 함수
  modify - 수정 모드로 사용하는 경우, 여기에 현재 리덕스에 있는 리뷰 데이터를 담아서 전달한다
  handleClose - 모달창 온오프 핸들러
  setWrite - 리뷰가 수정 모드인지 아닌지 확인하는 핸들러
*/
const WriteReview = ({ handleClose, setIsReviewed, modify, setWrite }) => {
  // modify에는 모달리뷰 데이터가 들어있다.

  // URL에서 showId 가져오기
  const location = useLocation();
  const showId = location.pathname.split('/')[2];
  // 리덕스
  const reviewDispatch = useDispatch();

  // 서버에 보낼 리뷰 데이터
  const [review, setReview] = useState({
    reviewStars: modify ? modify.reviewStars : 0,
    reviewContents: modify ? modify.reviewContents : '',
    showId: showId,
    reviewNo: modify ? modify.reviewNo : '',
    memberId: modify ? modify.memberId : ''
    // nickName: modify ? modify.nickName : ''
  });

  // input change 핸들러
  const handleChangeInput = useCallback(
    (e) => {
      setReview({
        ...review,
        [e.target.name]: e.target.value
      });
    },
    [review]
  );

  // 클릭 시, 클릭된 idx 값으로 별점을 세팅한다.
  const handleClickStar = useCallback(
    (idx) => {
      setReview({
        ...review,
        reviewStars: idx
      });
    },
    [review]
  );

  // 리뷰를 저장하는 이벤트 핸들러
  const handleClickSaveButton = useCallback(async () => {
    const URL = `http://localhost:3005/review`;
    // 리뷰  수정
    // 만약 modify가 존재한다면, 새로 리뷰를 작성하는 것이 아닌 리뷰를 수정한다
    if (modify) {
      // 수정모드
      try {
        const result = await axios.put(URL, review);
        // 리뷰 수정에 성공한 경우
        if (result.data.code === '200') {
          // window.location.replace(`/contents/${showId}`);
          handleClose();
          // 리렌더링
          reviewDispatch(reRenderReview());
          return;
        }
        // 리뷰 수정에 실패한 경우
        else {
          alert('리뷰 수정에 실패했습니다. 다시 시도해주세요.');
          handleClose();
        }
      } catch (error) {
        alert('리뷰 작성에 실패했습니다.');
        console.log(error);
        return false;
      }
    } else {
      // 리뷰 작성
      // axios를 사용해 서버에 데이터를 전달
      try {
        const result = await axios.post(URL, review);
        if (result.status === 200) {
          setIsReviewed(true);
          // 리뷰를 저장했다면 페이지를 새로 고친다.
          // window.location.replace(`/contents/${showId}`);
          // 새로고치는게 아니라 리렌더링을 한다.
          reviewDispatch(reRenderReview());
          return;
        }
        // 리뷰 작성 후, 이동하기
      } catch (error) {
        alert('리뷰 작성에 실패했습니다.');
        console.log(error);
        return false;
      }
    }
  }, [modify, reviewDispatch, setIsReviewed, handleClose, review]);

  // 리뷰를 삭제하는 이벤트 핸들러
  const handleClickDeleteButton = useCallback(async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const URL = `http://localhost:3005/review`;
      try {
        // 삭제할 리뷰 id를 params로 전달
        const result = await axios.delete(URL + `/${review.reviewNo}`);

        if (result.status === 200) {
          // 리뷰를 저장했다면 페이지를 새로 고친다.
          // window.location.replace(`/contents/${showId}`);
          // 새로고침이 아니라 리렌더링을 한다.
          handleClose();
          reviewDispatch(reRenderReview());
          setWrite(false);
          return;
        }
        // 리뷰 작성 후, 이동하기
      } catch (error) {
        alert('리뷰 작성에 실패했습니다.');
        console.log(error);
        return false;
      }
    } else return;
  }, [handleClose, reviewDispatch, setWrite, review]);

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
          {modify ? (
            <>
              <Button className=" flex-grow-1 btn" onClick={handleClickDeleteButton}>
                삭제
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
