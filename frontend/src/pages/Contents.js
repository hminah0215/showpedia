import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// bootstrap
import { Container } from 'react-bootstrap';

// 참조 컴포넌트
import ReviewContainer from '../components/Reveiw/ReviewContainer';
import ReviewItem from '../components/Reveiw/ReviewItem';
import MyReview from '../components/Reveiw/MyReview';
import ShowContainer from '../components/Show/ShowContainer';
import NotFound from '../components/NotFound/NotFound';
import CustomModal from '../components/Modal/CustomModal';
import WriteReview from '../components/Reveiw/WriteReview';
// etc

const Contents = () => {
  // 공연 id를 URL에서 가져온다.
  let location = useLocation();
  const showId = location.pathname.split('/')[2];

  // 공연 상세정보 fetch 실패 여부를 판단하는 state
  const [isFetch, setIsFetch] = useState(true);
  // 부모 컴포넌트에서 setIsFetch가 너무 자주 바뀐다면 useCallback을 사용해달라는 에러창이 등장
  const handleFetchState = useCallback(() => {
    setIsFetch(false);
  }, []);

  // 모달창 온오프를 위한 state
  const [modal, setModal] = useState({
    state: false,
    option: 'review'
  });
  // 리뷰 작성 창 온오프를 위한 state
  const [write, setWrite] = useState(false);

  // 모달 온오프 이벤트 핸들러
  const handleClose = useCallback(
    () =>
      setModal({
        option: 'review',
        state: false
      }),
    []
  );

  const handleShow = useCallback(
    () =>
      setModal({
        ...modal,
        state: true
      }),
    [modal]
  );

  // 리덕스에서 모달창에서 사용할 review 정보 가져오기
  const modalReviewData = useSelector((state) => state.review.review);

  return (
    <>
      {/* isFetch가 true 경우 공연 정보 렌더링*/}
      {isFetch ? (
        <>
          {/* 리뷰 클릭 시, 나타나는 모달 컴포넌트 */}
          <CustomModal handleClose={handleClose} show={modal.state} title="리뷰 상세보기">
            {/* 모달 안에 들어갈 내용 children */}
            {modal.option === 'review' ? (
              <>
                <ReviewItem
                  style={{ minWidth: '100%', height: '100%' }}
                  review={modalReviewData}
                  click
                  modal
                />
              </>
            ) : (
              // 수정하기 버튼 클릭 시, 나타나는 모달 컴포넌트
              <>
                <WriteReview
                  handleClose={handleClose}
                  modify={modalReviewData}
                  write={write}
                  setWrite={setWrite}
                />
              </>
            )}
          </CustomModal>

          {/* 공연 상세 정보 항목 */}
          <ShowContainer setIsFetch={handleFetchState} showId={showId} />

          {/* 리뷰 항목 */}
          <Container className="d-flex align-items-center flex-column">
            <MyReview
              showId={showId}
              write={write}
              setWrite={setWrite}
              handleShow={handleShow}
              setModal={setModal}
            />
            <ReviewContainer showId={showId} handleShow={handleShow} />
          </Container>
        </>
      ) : (
        <NotFound msg="공연 정보를 찾을 수 없습니다." />
      )}
    </>
  );
};

// export default Contents;
export default React.memo(Contents);
