import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// 부트스트랩
import { Container } from 'react-bootstrap';
// css
import './MyReview.css';
// 참조 컴포넌트
import WriteReview from './WriteReview';
import ReviewItem from './ReviewItem';
//etc
import axios from 'axios';

/*
  [props] - [부모 컴포넌트] / [설명]
  ------------------------------------------------------------
  showId - [Contents.js] / 리뷰 검색을 위해서 사용되는 공연 Id
  write - [Contents.js] / 리뷰 쓰기 상태를 구분하는 state
  setWrite - [Contents.js] / 리뷰 쓰기 상태를 변경하는 함수
  handleShow - [Contents.js] / 모달을 보여주는 이벤트 핸들러
  setModal - [Contents.js] / 모달창의 상태를 변경하는 메서드
*/

const MyReview = ({ showId, handleShow, setModal, write, setWrite }) => {
  const history = useHistory();

  // 내 리뷰가 존재하는지 판단하는 state
  const [isReviewed, setIsReviewed] = useState(false);
  // 가져온 내 리뷰 데이터를 저장하는 state
  const [myReview, setMyReview] = useState({});
  // 리덕스
  // 리뷰 데이터들이 변경될 경우, 리렌더링을 진행하기위한 리덕스 state
  const reRender = useSelector((state) => state.review.rerender);

  // 내 리뷰가 존재하는지 판단하기 위해서 첫 렌더링 시, 내 리뷰가 있다면 찾아온다.
  useEffect(() => {
    // memberId는 백엔드 tokenTest에서 체크가 가능하다.
    const URL = `http://localhost:3005/review?showId=${showId}`;
    // axios
    const fetchReview = async () => {
      try {
        const result = await axios.get(URL);
        // 리뷰가 없는 상태
        // 1. 로그인 상태가 아님 => tokenTest 미들웨어에서 code 400
        // code가 200이 아닌 경우 - 로그인 인증 실패
        if (result.data.code !== '200') {
          setIsReviewed(false);
          setMyReview({ msg: '로그인을 진행해주세요..' });
          return;
        }

        // 2. 로그인 상태지만 리뷰가 없음 백엔드에서 data에 문자열을 보낸다
        // code는 200 이지만 데이터가 없는 경우
        if (typeof result.data.data === 'string') {
          setMyReview({});
          setIsReviewed(false);
          return;
        }

        // 3. 개인 리뷰가 존재하는 경우
        setMyReview(result.data.data);
        setIsReviewed(true);
        return;

        // 에러 처리
      } catch (error) {
        setIsReviewed(false);
        setMyReview({ msg: '잠시후 다시 시도해주세요..' });
        return;
      }
    };
    fetchReview();
  }, [reRender, showId]);

  return (
    <Container className="mb-4 d-flex justify-content-center  align-items-center flex-column">
      {
        // 리뷰 여부 판별 isReviewed
        isReviewed ? (
          <>
            {/* 리뷰가 존재한다면 리뷰를 보여준다. */}
            <h3 className="main-title align-self-baseline">내 리뷰</h3>
            <ReviewItem isReviewed review={myReview} handleShow={handleShow} setModal={setModal} />
          </>
        ) : (
          <>
            {/* 리뷰가 존재하지 않는다면 리뷰 작성 버튼을 보여준다. */}
            {
              // write - 디폴트 false
              write ? (
                <>
                  {/* 리뷰 작성 컴포넌트 */}
                  <h3 className="main-title align-self-baseline"> 리뷰 작성하기</h3>
                  <WriteReview setIsReviewed={setIsReviewed} setWrite={setWrite} />
                </>
              ) : (
                <>
                  {/* 리뷰 작성 버튼 컴포넌트 */}
                  <h3 className="main-title align-self-baseline">내 리뷰</h3>
                  {/* 버튼을 클릭하면 write를 true로 설정한다. */}
                  <button
                    className="review-btn--write m-4"
                    onClick={() => {
                      // msg가 있는 경우 - 로그인이되지않은 상태기 때문에 login 페이지로 이동
                      if (myReview.msg) history.push('/login');
                      // 리뷰 작성 Write 상태로 만든다
                      setWrite(true);
                    }}
                  >
                    {/*
                      버튼 안에 쓰일 메세지 
                      myReview에 msg가 존재한다면, myReview가 없거나 에러가 난 상태이다. 
                    */}
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
