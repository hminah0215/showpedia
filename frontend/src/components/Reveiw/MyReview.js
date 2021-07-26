import React from 'react';
import { Container } from 'react-bootstrap';
import ReviewItem from './ReviewItem';

const MyReview = () => {
  return (
    <Container className="mb-4">
      <h3 className="main-title">내 리뷰</h3>
      <ReviewItem />
    </Container>
  );
};

export default MyReview;
