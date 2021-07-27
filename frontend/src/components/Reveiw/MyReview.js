import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ReviewItem from './ReviewItem';
// css
import './MyReview.css';
import WriteReview from './WriteReview';
//etc
import axios from 'axios';

const MyReview = ({ showId }) => {
  // 리뷰 작성 창을 위한 state
  const [write, setWrite] = useState(false);
  // 내 리뷰가 존재하는지 판단하는 상태
  const [isReviewed, setIsReviewed] = useState(false);
  // 가져온 내 리뷰 데이터를 저장하는 state
  const [myReview, setMyReview] = useState({});

  // 내 리뷰가 존재하는지 판단하기 위해서 첫 렌더링 시, 내 리뷰가 있다면 찾아온다.
  useEffect(() => {
    // memberId는 백엔드에서 판단 가능
    const URL = `http://localhost:3005/review?showId=${showId}`;

    const fetchReview = async () => {
      try {
        const result = await axios.get(URL);
        // console.log('가져온 리뷰 데이터 정보22', result);

        // 리뷰가 없는 상태
        if (result.data.data.length === 0) {
          setIsReviewed(false);
        }
        setMyReview(result.data.data);
        setIsReviewed(true);
        return;

        // 에러 처리
      } catch (error) {
        return;
      }
    };
    fetchReview();
  }, []);

  return (
    <Container className="mb-4 d-flex justify-content-center  align-items-center flex-column">
      {
        // 리뷰 여부 판별 isReviewed
        isReviewed ? (
          <>
            <h3 className="main-title align-self-baseline">내 리뷰</h3>
            <ReviewItem isReviewed review={myReview} />
          </>
        ) : (
          <>
            {
              // 리뷰를 작성해볼까요 클릭한 경우
              write ? (
                <>
                  <h3 className="main-title align-self-baseline"> 리뷰 작성하기</h3>
                  <WriteReview setIsReviewed={setIsReviewed} />
                </>
              ) : (
                <>
                  <h3 className="main-title align-self-baseline">내 리뷰</h3>
                  <button
                    className="review-btn--write m-4"
                    onClick={() => {
                      setWrite(true);
                    }}
                  >
                    아직 리뷰를 작성하지 않았어요! 리뷰를 작성해 볼까요? (click)
                  </button>
                </>
              )
            }
          </>
        )
      }
    </Container>
  );
};

export default MyReview;
