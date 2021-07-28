import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// bootstrap
import { Container, Button } from 'react-bootstrap';
// 참조 컴포넌트
import ReviewContainer from '../components/Reveiw/ReviewContainer';
import ReviewItem from '../components/Reveiw/ReviewItem';
import MyReview from '../components/Reveiw/MyReview';
import ShowContainer from '../components/Show/ShowContainer';
import NotFound from '../components/NotFound/NotFound';
import CustomModal from '../components/Modal/CustomModal';
import { useSelector } from 'react-redux';
// etc

const Contents = () => {
  // 공연 상세정보 fetch 실패 여부를 판단하는 state
  const [isFetch, setIsFetch] = useState(true);

  // 공연 id를 URL에서 가져온다.
  let location = useLocation();
  const showId = location.pathname.split('/')[2];

  // 모달 온오프를 위한 state
  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  // 리뷰 리덕스에서 리뷰 상태 가져오기
  const modalReviewData = useSelector((state) => state.review.review);
  console.log('모달 데이터', modalReviewData);

  return (
    <>
      {isFetch ? (
        <>
          {/* 공연 정보 항목 */}
          <Button variant="primary" onClick={handleShow}>
            모달 테스트용 버튼
          </Button>

          <CustomModal handleClose={handleClose} show={modal}>
            {/* 모달 안에 들어갈 내용 children */}
            <ReviewItem style={{ minWidth: '100%', height: '100%' }} review={modalReviewData} />
          </CustomModal>

          <ShowContainer setIsFetch={setIsFetch} showId={showId} />
          {/* 리뷰 항목 */}
          <Container className="d-flex align-items-center flex-column">
            <MyReview showId={showId} handleShow={handleShow} />
            <ReviewContainer showId={showId} handleShow={handleShow} />
          </Container>
        </>
      ) : (
        <NotFound msg="공연 정보를 찾을 수 없습니다." />
      )}
    </>
  );
};

export default Contents;
