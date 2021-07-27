import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReviewContainer from '../components/Reveiw/ReviewContainer';
import MyReview from '../components/Reveiw/MyReview';
import ShowContainer from '../components/Show/ShowContainer';

const Contents = () => {
  // 공연 상세정보 fetch 실패 여부를 판단하는 state
  const [isFetch, setIsFetch] = useState(true);
  return (
    <>
      {isFetch ? (
        <>
          {/* 공연 정보 항목 */}
          <ShowContainer setIsFetch={setIsFetch} />
          {/* 리뷰 항목 */}
          <Container className="d-flex align-items-center flex-column">
            <MyReview />
            <ReviewContainer />
          </Container>
        </>
      ) : (
        <Container>상세 정보를 가져오는데 실패했어요!</Container>
      )}
    </>
  );
};

export default Contents;
