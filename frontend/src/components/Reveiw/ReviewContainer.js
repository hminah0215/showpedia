import React from 'react';
import { Container } from 'react-bootstrap';
import ReviewItem from './ReviewItem';

const ReviewContainer = () => {
  return (
    <Container>
      <h3 className="main-title">리뷰</h3>
      {/* 서버에서 가져온 데이터 개수만큼 반복 */}
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
    </Container>
  );
};

export default ReviewContainer;
