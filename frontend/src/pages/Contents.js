import React from 'react';
import { Container } from 'react-bootstrap';
import ReviewContainer from '../components/Reveiw/ReviewContainer';
import MyReview from '../components/Reveiw/MyReview';
import ShowContainer from '../components/Show/ShowContainer';

const Contents = () => {
  return (
    <>
      {/* 공연 정보 항목 */}
      <ShowContainer />
      {/* 리뷰 항목 */}
      <Container className="d-flex align-items-center flex-column">
        <MyReview />
        <ReviewContainer />
      </Container>
    </>
  );
};

export default Contents;
