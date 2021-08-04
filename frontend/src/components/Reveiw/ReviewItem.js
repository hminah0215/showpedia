import React, { useCallback } from 'react';
import { setReview, reRenderReview } from '../../redux/review'; // 액션 생성함수
import { useDispatch, useSelector } from 'react-redux';

// 부트스트랩 icons
import { HandThumbsUp, ExclamationCircle } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
// css
import './ReviewItem.css';
// 참조
import Stars from '../Stars/Stars';
// etx
import axios from 'axios';

/*
  [props]
  style - css style 객체 prop
  hover - hover 기능 여부
  click - click 시, 모달 창 열림 여부
  handleShow - [Contents.js -> ReviewContainer.js] / 모달창 온오프 핸들러
  isReviewed - [MyReview.js] / 사용자 리뷰 여부에 따른 숨김 버튼
*/

const ReviewItem = ({ setModal, isReviewed, review, style, hover, handleShow, click }) => {
  // 리뷰 디스패치
  const reviewDispatch = useDispatch();
  // 로그인 상태를 나타내는 state
  const isLogin = useSelector((state) => state.auth.isLogin);

  // 리뷰 컨텐츠를 클릭 시, 해당 리뷰 정보를 리덕스 상태에 저장한다
  const handleClickReview = useCallback(() => {
    // 모달에 존재하는 리뷰의 경우 모달을 열지않는다.
    if (click) return;
    // 리덕스에 해당 리뷰 정보 저장하기
    reviewDispatch(setReview(review));
    // console.log('리뷰를 클릭하면 해당 리뷰 정보를 리덕스에 저장한다.', review);
    handleShow(); // 모달창 열기
  }, [click, review, handleShow, reviewDispatch]);

  // 리뷰 수정하기 버튼 클릭 이벤트 핸들러
  const handleClickModify = useCallback(() => {
    // 해당 리뷰 정보를 리덕스에 저장
    reviewDispatch(setReview(review));

    // 모달에 보여지는 컴포넌트를 리뷰 수정 컴포넌트로 변경
    setModal({
      state: true,
      option: 'myReview'
    });
  }, [review, setModal, reviewDispatch]);

  // 좋아요 버튼 클릭 이벤트 핸들러
  const handleClickLike = useCallback(async () => {
    // db 수정하기
    const URL = `http://localhost:3005/review`;
    if (!isLogin) return alert('로그인을 해주세요!');

    try {
      const result = await axios.put(URL, { ...review, opt: 'like' });
      // 로그인 상태가 아닐 경우 & 리뷰 수정에 실패할 경우
      if (result.data.code !== '200') {
        if (result.data.code === '400') {
          return alert('자기 리뷰에는 좋아요를 할 수 없습니다.');
        }
        alert('로그인을 해주세요!');
        return;
      }

      // 수정에 성공한 경우
      if (result.data.code === '200') {
        // 모달에 보여지는 리뷰값 다시 설정
        reviewDispatch(setReview({ ...review, reviewLikes: review.reviewLikes + 1 }));
        reviewDispatch(reRenderReview()); // 리렌더 상태 변경
      }
      // 리뷰 작성 후, 이동하기
    } catch (error) {
      alert('좋아요 실패');
      console.log(error);
      return false;
    }
  }, [isLogin, review, reviewDispatch]);

  // 신고 버튼 클릭 이벤트 핸들러
  const handleClickReport = useCallback(async () => {
    // db 수정하기
    const URL = `http://localhost:3005/review`;
    if (!isLogin) return alert('로그인을 해주세요!');
    if (window.confirm('신고하시겠습니까?')) {
      try {
        const result = await axios.put(URL, { ...review, opt: 'report' });

        // 로그인 여부
        if (result.data.code !== '200') {
          if (result.data.code === '400') {
            return alert('자기 리뷰에는 신고를 할 수없습니다.');
          }
          alert('로그인을 해주세요!');
          return;
        }
        // 백엔드 통신 성공
        if (result.data.code === '200') {
          alert('신고 완료');
          // 리렌더링을 위한 상태
          reviewDispatch(reRenderReview()); // 리렌더 상태 변경
        }
        // 리뷰 작성 후, 이동하기
      } catch (error) {
        alert('신고 실패');
        console.log(error);
        return false;
      }
    }
  }, [isLogin, reviewDispatch, review]);

  return (
    <>
      {/* 게시글 삭제, 수정으로 인해 리뷰가 하나도 없을 경우에는
      리뷰가 생성될 수 없다.
    */}
      {Object.keys(review).length !== 0 ? (
        <>
          <div
            style={style}
            className={`review m-3 d-flex align-items-center ${hover ? 'hover' : ''}`}
          >
            {/* 리뷰 유저정보 */}
            <div className="review-user d-flex flex-column align-items-center">
              <div className="review-user-img img-box">
                <img
                  src={
                    review.member.profilePhoto
                      ? review.member.profilePhoto
                      : 'https://www.w3schools.com/w3images/avatar2.png'
                  }
                  alt="user"
                ></img>
              </div>
              <p className="review-user-title">
                {/* {review.nickName ? review?.nickName : review?.member.nickName} */}
                {review?.member.nickName}
              </p>
            </div>
            {/* 리뷰 콘텐츠 */}
            <div className="review-contents-container flex-grow-1 d-flex flex-column justify-content-between">
              <div className="review-contents-header">
                <span className="review-date">
                  {review?.createdAt ? review?.createdAt.slice(0, 10) : ''}
                </span>
                <span className="review-star">
                  {/* 별점
            rating은 db에서 가져온 리뷰의 별점 점수이다.
          */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Stars key={i} idx={i} rating={review?.reviewStars} />
                  ))}
                </span>
              </div>
              {/* 리뷰 컨텐츠가 클릭 시, 상세 리뷰 모달 오픈 */}
              <div className="review-content flex-grow-1" onClick={handleClickReview}>
                {review?.reviewContents}
              </div>
              {
                // 내 리뷰일 경우 버튼 숨김
                isReviewed ? (
                  <>
                    <Button
                      size="sm"
                      style={{ width: '100px', alignSelf: 'flex-end' }}
                      onClick={handleClickModify}
                    >
                      수정하기
                    </Button>
                  </>
                ) : (
                  <div className="review-btns d-flex align-items-center justify-content-end">
                    {/* 좋아요 버튼 */}
                    <button className="review-btn" onClick={handleClickLike}>
                      <HandThumbsUp size={20} />
                    </button>
                    <span className="review-like">{review?.reviewLikes}</span>
                    {/* 신고 버튼 */}
                    <button className="review-btn review-btn--alert" onClick={handleClickReport}>
                      <ExclamationCircle size={20} />
                    </button>
                  </div>
                )
              }
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(ReviewItem);
// export default ReviewItem;
