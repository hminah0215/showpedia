import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import ReviewItem from './ReviewItem';
// etc
import axios from 'axios';
import NotFound from '../NotFound/NotFound';

const ReviewContainer = () => {
  // 리뷰 리스트를 담을 state
  const [reviewList, setReviewList] = useState([]);
  // 리뷰가 없을 경우를 판단하는 state
  const [hasReview, setHasReview] = useState({
    has: true,
    msg: '리뷰가 없습니다!'
  });

  // 첫 렌더링 때, 해당 id에 맞는 리뷰를 가져온다.
  useEffect(() => {
    const URL = 'http://localhost:3005/review';
    const fetchReviewList = async () => {
      try {
        const result = await axios.get(URL);
        setReviewList(result.data.data);
      } catch (error) {
        setHasReview({
          has: false,
          msg: '리뷰를 불러오는 데 실패했습니다..'
        });
      }
    };
    fetchReviewList();
  }, []);

  return (
    <Container className="mb-4 d-flex flex-column align-items-center">
      <h3 className="main-title align-self-baseline">리뷰</h3>
      {/* 서버에서 가져온 데이터 개수만큼 반복 */}
      {hasReview.has ? (
        <>
          {reviewList.map((review) => (
            <ReviewItem btn key={review.reviewNo} review={review} />
          ))}
          <Button>더보기</Button>
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
