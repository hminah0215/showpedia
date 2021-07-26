import React from 'react';
// 부트스트랩 icons
import { StarFill, HandThumbsUp, ExclamationCircle, PencilSquare } from 'react-bootstrap-icons';
// css
import './ReviewItem.css';
// 참조
import Stars from '../Stars/Stars';

const ReviewItem = ({ btn, modify }) => {
  return (
    <div className="review m-3 d-flex align-items-center">
      <div className="review-user d-flex flex-column align-items-center">
        <div className="review-user-img img-box ">
          <img src="https://i.pinimg.com/736x/63/03/ce/6303ce3888e3dce2532ba870651d4870.jpg"></img>
        </div>
        <p className="review-user-title">UserName</p>
      </div>

      <div className="review-contents flex-grow-1 d-flex flex-column justify-content-between">
        <div className="review-contents-header">
          <span className="review-date">2021.07.05</span>
          <span className="review-star">
            {/* 별점
              rating은 db에서 가져온 리뷰의 별점 점수이다.
            */}
            {[1, 2, 3, 4, 5].map((i) => (
              <Stars key={i} idx={i} rating={2} />
            ))}
          </span>
          {/* 내 리뷰일 경우 - 수정 버튼 */}
          {modify ? (
            <button className="review-btn review-btn--modify">
              <PencilSquare size={20} />
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="review-content">
          어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구
          어250자를 넘길 경우 잘라서 넘길꺼니까 크기 박살은 걱정마시오
          어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구
          어250자를 넘길 경우 잘라서 넘길꺼니까 크기 박살은 걱정마시오
          어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구
          어250자를 넘길 경우 잘라서 넘길꺼니까 크기 박살은 걱정마시오
        </div>
        {
          // 내 리뷰일 경우 버튼 숨김
          btn ? (
            <div className="review-btns">
              <button className="review-btn">
                <HandThumbsUp size={20} />
              </button>
              <button className="review-btn review-btn--alert">
                <ExclamationCircle size={20} />
              </button>
            </div>
          ) : (
            <></>
          )
        }
      </div>
    </div>
  );
};

export default ReviewItem;
