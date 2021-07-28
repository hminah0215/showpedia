import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import ReviewItem from './ReviewItem';
// etc
import axios from 'axios';
import NotFound from '../NotFound/NotFound';

const ReviewContainer = ({ showId, hover, handleShow }) => {
  // 리뷰 리스트를 담을 state
  const [reviewList, setReviewList] = useState([]);
  // 리뷰가 없을 경우를 판단하는 state
  const [hasReview, setHasReview] = useState({
    has: true,
    msg: '리뷰가 없습니다!'
  });
  // 리뷰 더보기 상태
  const [addReview, setAddReview] = useState(2);

  // 첫 렌더링 때, 해당 공연id에 맞는 리뷰를 가져온다.
  useEffect(() => {
    const URL = 'http://localhost:3005/review/reviewlist/' + showId;
    const fetchReviewList = async () => {
      try {
        const result = await axios.get(URL);
        console.log('가져온 리뷰 데이터 정보', result);
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
        setReviewList(result.data.data);
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
  }, []);

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
        setReviewList(result.data.data);
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
