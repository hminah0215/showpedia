import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ReviewItem from './ReviewItem';
// css
import './MyReview.css';
import WriteReview from './WriteReview';
//etc
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const MyReview = ({ showId, handleShow, setModal }) => {
  const history = useHistory();
  // 리뷰 작성 창을 위한 state
  const [write, setWrite] = useState(false);
  // 내 리뷰가 존재하는지 판단하는 state
  const [isReviewed, setIsReviewed] = useState(false);
  // 가져온 내 리뷰 데이터를 저장하는 state
  const [myReview, setMyReview] = useState({});
  // 리렌더링을 위한 상태
  const reRender = useSelector((state) => state.review.rerender);

  // 내 리뷰가 존재하는지 판단하기 위해서 첫 렌더링 시, 내 리뷰가 있다면 찾아온다.
  useEffect(() => {
    // memberId는 백엔드에서 판단 가능
    const URL = `http://localhost:3005/review?showId=${showId}`;
    // 아이디는 서버에서 임의로 설정중
    const fetchReview = async () => {
      try {
        const result = await axios.get(URL);
        // 리뷰가 없는 상태
        // 개인 리뷰를 가져오는 데 실패한 경우
        // 로그인이 되지않았다면 백엔드 서버에서 data를 넘겨주지 않는다.
        // 1. 로그인 상태지만 리뷰가 없음 => data가 null
        // 2. 로그인 상태가 아님 => tokenTest 미들웨어에서 code 400
        if (!result.data.data || result.data.code !== '200') {
          setIsReviewed(false);
          setMyReview({ msg: '로그인을 진행해주세요..' });
          return;
        }
        // 개인 리뷰가 존재하는 경우
        setMyReview(result.data.data);
        setIsReviewed(true);
        return;

        // 에러 처리
      } catch (error) {
        return;
      }
    };
    fetchReview();
  }, [reRender]);

  return (
    <Container className="mb-4 d-flex justify-content-center  align-items-center flex-column">
      {
        // 리뷰 여부 판별 isReviewed
        isReviewed ? (
          <>
            <h3 className="main-title align-self-baseline">내 리뷰</h3>
            <ReviewItem isReviewed review={myReview} handleShow={handleShow} setModal={setModal} />
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
                      if (myReview.msg) history.push('/login');
                      setWrite(true);
                    }}
                  >
                    {myReview.msg
                      ? myReview.msg
                      : '아직 리뷰를 작성하지 않았어요! 리뷰를 작성해 볼까요? (click)'}
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
