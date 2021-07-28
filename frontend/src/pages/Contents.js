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

  const test = {
    memberId: '테스트용',
    createdAt: '2020-12-22',
    reviewStars: 4,
    reviewContents:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.sdfsfsdfsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    reviewLikes: 333
  };

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
            <ReviewItem style={{ minWidth: '100%', height: '100%' }} review={test} />
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
