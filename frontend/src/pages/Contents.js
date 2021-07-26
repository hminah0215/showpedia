import React from 'react';
import { Container } from 'react-bootstrap';
import ReviewContainer from '../components/Reveiw/ReviewContainer';
import MyReview from '../components/Reveiw/MyReview';

const Contents = () => {
  return (
    <Container className="d-flex align-items-center flex-column">
      <MyReview />
      <ReviewContainer />
    </Container>
  );
};

export default Contents;
