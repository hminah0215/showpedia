import React, { useEffect, useState } from 'react';
import { getReviewList } from '../../redux/review';
import { useSelector, useDispatch } from 'react-redux';
// 부트스트랩
import { Container, Button } from 'react-bootstrap';
// 참조 컴포넌트
import ReviewItem from './ReviewItem';
import NotFound from '../NotFound/NotFound';
// etc
import axios from 'axios';

/* 
  showId - [Content.js] / 공연 Id
  handleShow - [Contents.js] / 모달을 보여주기 위한 이벤트 핸들러
*/
const ReviewContainer = ({ showId, handleShow }) => {
  // 리뷰 리스트를 담는 리덕스 state
  const reviewList = useSelector((state) => state.review.reviewList);
  // 리렌더링을 판단하는 리덕스 state
  const reRender = useSelector((state) => state.review.rerender);
  // 리뷰의 유무를 경우를 판단하는 state
  const [hasReview, setHasReview] = useState({
    has: true,
    msg: '리뷰가 없습니다!'
  });
  // 더보기 버튼을 눌렀을 때, 서버에 전달할 리뷰 개수를 위한 state
  const [addReview, setAddReview] = useState(2);

  // 리덕스 디스패치
  const reviewDispatch = useDispatch();

  // 첫 렌더링 때, 해당 공연id에 맞는 리뷰를 가져온다.
  useEffect(() => {
    const URL = 'http://localhost:3005/review/reviewlist/' + showId;
    const fetchReviewList = async () => {
      try {
        const result = await axios.get(URL);
        // console.log('가져온 리뷰 리스트 정보', result);
        if (result.status === 500) {
          setHasReview({
            has: false,
            msg: '리뷰를 불러오는 데 실패했습니다..'
          });
          return;
        }
        // 리뷰가 없는 상태
        if (result.data.data.length === 0) {
          setHasReview({
            ...hasReview,
            has: false
          });
        }
        // setReviewList(result.data.data);
        reviewDispatch(getReviewList(result.data.data));
        return;

        // 에러 처리
      } catch (error) {
        setHasReview({
          has: false,
          msg: '리뷰를 불러오는 데 실패했습니다..'
        });
        return;
      }
    };
    fetchReviewList();
    // console.log('리뷰있어?', hasReview);
  }, [reRender]);

  // 클릭 시, 리뷰를 더 가져오는 이벤트 핸들러
  const handleClickAdd = () => {
    const URL = 'http://localhost:3005/review/reviewlist/' + showId + `?page=${addReview}`;
    const fetchReviewList = async () => {
      try {
        const result = await axios.get(URL);
        if (result.status === 500) {
          setHasReview({
            has: false,
            msg: '리뷰를 불러오는 데 실패했습니다..'
          });
          return;
        }
        // 리뷰가 없는 상태
        if (result.data.data.length === 0) {
          setHasReview({
            ...hasReview,
            has: false
          });
        }
        // setReviewList(result.data.data);
        reviewDispatch(getReviewList(result.data.data));
        setHasReview({
          has: true
        });
        return;

        // 에러 처리
      } catch (error) {
        setHasReview({
          has: false,
          msg: '리뷰를 불러오는 데 실패했습니다..'
        });
        return;
      }
    };
    fetchReviewList();
    setAddReview((prev) => prev + 1);
  };

  return (
    <Container className="mb-4 d-flex flex-column align-items-center">
      <h3 className="main-title align-self-baseline">리뷰</h3>
      {/* 서버에서 가져온 데이터 개수만큼 반복 */}
      {hasReview.has ? (
        <>
          {reviewList.map((review) => (
            <ReviewItem btn key={review.reviewNo} review={review} handleShow={handleShow} hover />
          ))}
          <Button onClick={handleClickAdd}>더보기</Button>
        </>
      ) : (
        <>
          <NotFound msg={hasReview.msg} />
        </>
      )}
    </Container>
  );
};

export default ReviewContainer;
