import React from 'react';
// 부트스트랩 icons
import { StarFill, HandThumbsUp, ExclamationCircle } from 'react-bootstrap-icons';
// css
import './ReviewItem.css';

const ReviewItem = () => {
  return (
    <div className="review m-3 d-flex align-items-center">
      <div className="review-user d-flex flex-column align-items-center">
        <div className="review-user-img img-box ">
          <img src="https://i.pinimg.com/736x/63/03/ce/6303ce3888e3dce2532ba870651d4870.jpg"></img>
        </div>
        <p className="review-user-title">UserName</p>
      </div>

      <div className="review-contents flex-grow-1 d-flex flex-column justify-content-between">
        <div className="review-contents-header  ">
          <span className="review-date">2021.07.05</span>
          <span className="review-star">
            <StarFill size={15} color={'#845ef7'} />
            <StarFill size={15} color={'#845ef7'} />
            <StarFill size={15} />
            <StarFill size={15} />
            <StarFill size={15} />
          </span>
        </div>
        <div className="review-content">
          어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구
          어250자를 넘길 경우 잘라서 넘길꺼니까 크기 박살은 걱정마시오
          어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구
          어250자를 넘길 경우 잘라서 넘길꺼니까 크기 박살은 걱정마시오
          어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구
          어250자를 넘길 경우 잘라서 넘길꺼니까 크기 박살은 걱정마시오
        </div>
        <div className="review-btns">
          <button className="review-btn">
            <HandThumbsUp size={20} />
          </button>
          <button className="review-btn review-btn--alert">
            <ExclamationCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
