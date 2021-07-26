import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReviewItem from './ReviewItem';
// css
import './MyReview.css';
import WriteReview from './WriteReview';

const MyReview = () => {
  // 리뷰 작성 창을 위한 state
  const [write, setWrite] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  return (
    <Container className="mb-4 d-flex justify-content-center  align-items-center flex-column">
      {
        // 리뷰 여부 판별 isReviewed
        true ? (
          <>
            <h3 className="main-title align-self-baseline">내 리뷰</h3>
            <ReviewItem isReviewed />
          </>
        ) : (
          <>
            {
              // 리뷰를 작성해볼까요 클릭한 경우
              write ? (
                <WriteReview />
              ) : (
                <>
                  <button
                    className="review-btn--write"
                    onClick={() => {
                      setWrite(true);
                    }}
                  >
                    아직 리뷰를 작성하지 않았어요! 리뷰를 작성해 볼까요? (click)
                  </button>
                </>
              )
            }
          </>
        )
      }
    </Container>
  );
};

export default MyReview;
