import React from 'react';
import { getReview } from '../../redux/review'; // 액션 생성함수
import { useDispatch } from 'react-redux';

// 부트스트랩 icons
import { HandThumbsUp, ExclamationCircle, PencilSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
// css
import './ReviewItem.css';
// 참조
import Stars from '../Stars/Stars';

const ReviewItem = ({ setModal, isReviewed, review, style, hover, handleShow, click }) => {
  // 리뷰 디스패치
  const reviewDispatch = useDispatch();

  // 클릭 시, 해당 리뷰 정보를 리덕스 상태에 저장한다
  const handleClickReview = () => {
    // 모달에 존재하는 리뷰의 경우 모달을 열지않는다.
    if (click) return;
    // 리덕스에 해당 리뷰 정보 저장하기
    reviewDispatch(getReview(review));
    handleShow(); // 모달창 열기
  };

  return (
    <div style={style} className={`review m-3 d-flex align-items-center ${hover ? 'hover' : ''}`}>
      {/* 리뷰 유저정보 */}
      <div className="review-user d-flex flex-column align-items-center">
        <div className="review-user-img img-box">
          <img src="https://www.w3schools.com/w3images/avatar2.png" alt="user"></img>
        </div>
        <p className="review-user-title">{review?.memberId}</p>
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
                onClick={() => {
                  //
                  console.log('제발 리뷰창 그만!');
                  reviewDispatch(getReview(review));
                  setModal({
                    state: true,
                    option: 'myReview'
                  });
                }}
              >
                수정하기
              </Button>
            </>
          ) : (
            <div className="review-btns d-flex align-items-center justify-content-end">
              <button className="review-btn">
                <HandThumbsUp size={20} />
              </button>
              <span className="review-like">{review?.reviewLikes}</span>
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
