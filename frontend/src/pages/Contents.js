import React from 'react';
import { Container } from 'react-bootstrap';
import ReviewContainer from '../components/Reveiw/ReviewContainer';
import MyReview from '../components/Reveiw/MyReview';
import ShowContainer from '../components/Show/ShowContainer';

const Contents = () => {
  return (
    <Container className="d-flex align-items-center flex-column">
      <ShowContainer />
      <MyReview />
      <ReviewContainer />
    </Container>
  );
};

export default Contents;
