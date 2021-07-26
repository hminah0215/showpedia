import React from 'react';
import { Container } from 'react-bootstrap';
import ReviewItem from './ReviewItem';

const ReviewContainer = () => {
  return (
    <Container className="mb-4 d-flex flex-column align-items-center">
      <h3 className="main-title align-self-baseline">리뷰</h3>
      {/* 서버에서 가져온 데이터 개수만큼 반복 */}
      <ReviewItem btn />
      <ReviewItem btn />
      <ReviewItem btn />
      <ReviewItem btn />
      <ReviewItem btn />
    </Container>
  );
};

export default ReviewContainer;
