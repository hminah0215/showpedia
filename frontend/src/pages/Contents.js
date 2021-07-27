import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// bootstrap
import { Container } from 'react-bootstrap';
// 참조 컴포넌트
import ReviewContainer from '../components/Reveiw/ReviewContainer';
import MyReview from '../components/Reveiw/MyReview';
import ShowContainer from '../components/Show/ShowContainer';
import NotFound from '../components/NotFound/NotFound';
// etc

const Contents = () => {
  // 공연 상세정보 fetch 실패 여부를 판단하는 state
  const [isFetch, setIsFetch] = useState(true);

  // 공연 id를 URL에서 가져온다.
  let location = useLocation();
  const showId = location.pathname.split('/')[2];

  return (
    <>
      {isFetch ? (
        <>
          {/* 공연 정보 항목 */}
          <ShowContainer setIsFetch={setIsFetch} showId={showId} />
          {/* 리뷰 항목 */}
          <Container className="d-flex align-items-center flex-column">
            <MyReview />
            <ReviewContainer showId={showId} />
          </Container>
        </>
      ) : (
        <NotFound msg="공연 정보를 찾을 수 없습니다." />
      )}
    </>
  );
};

export default Contents;
