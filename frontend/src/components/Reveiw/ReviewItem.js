import React, { useCallback } from 'react';
import { setReview, reRenderReview } from '../../redux/review'; // 액션 생성함수
import { useDispatch, useSelector } from 'react-redux';

// 부트스트랩 icons
import { Button } from 'react-bootstrap';
// 참조
import User from './User';
// etc
import axios from 'axios';
import ReviewBtn from './ReviewBtn';
import ReviewHeader from './ReviewHeader';

// sweetAlert
import Swal from 'sweetalert2';

/*
  [props]
  style - css style 객체 prop
  hover - hover 기능 여부
  click - click 시, 모달 창 열림 여부
  handleShow - [Contents.js -> ReviewContainer.js] / 모달창 온오프 핸들러
  isReviewed - [MyReview.js] / 사용자 리뷰 여부에 따른 숨김 버튼
*/

const ReviewItem = ({ setModal, isReviewed, review, style, hover, handleShow, click }) => {
  // 리뷰 디스패치
  const reviewDispatch = useDispatch();
  // 로그인 상태를 나타내는 state
  const isLogin = useSelector((state) => state.auth.isLogin);

  // 리뷰 컨텐츠를 클릭 시, 해당 리뷰 정보를 리덕스 상태에 저장한다
  const handleClickReview = useCallback(() => {
    // 모달에 존재하는 리뷰의 경우 모달을 열지않는다.
    if (click) return;
    // 리덕스에 해당 리뷰 정보 저장하기
    reviewDispatch(setReview(review));
    handleShow(); // 모달창 열기
  }, [click, review, handleShow, reviewDispatch]);

  // 리뷰 수정하기 버튼 클릭 이벤트 핸들러
  const handleClickModify = useCallback(() => {
    // 해당 리뷰 정보를 리덕스에 저장
    reviewDispatch(setReview(review));

    // 모달에 보여지는 컴포넌트를 리뷰 수정 컴포넌트로 변경
    setModal({
      state: true,
      option: 'myReview'
    });
  }, [review, setModal, reviewDispatch]);

  // 좋아요 버튼 클릭 이벤트 핸들러
  const handleClickLike = useCallback(async () => {
    // db 수정하기
    const URL = `http://localhost:3005/review`;
    if (!isLogin)
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '로그인을 해주세요!',
        footer: '<a href="/login">로그인 하러가기</a>'
      });

    try {
      const result = await axios.put(URL, { ...review, opt: 'like' });
      // 로그인 상태가 아닐 경우 & 리뷰 수정에 실패할 경우
      if (result.data.code !== '200') {
        if (result.data.code === '400') {
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '자기 리뷰에는 좋아요를 할 수 없습니다.'
          });
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '로그인을 해주세요!',
          footer: '<a href="/login">로그인 하러가기</a>'
        });
        return;
      }

      // 수정에 성공한 경우
      if (result.data.code === '200') {
        // 모달에 보여지는 리뷰값 다시 설정
        reviewDispatch(setReview({ ...review, reviewLikes: review.reviewLikes + 1 }));
        reviewDispatch(reRenderReview()); // 리렌더 상태 변경
      }
      // 리뷰 작성 후, 이동하기
    } catch (error) {
      Swal.fire('좋아요 실패', '관리자에게 문의해주세요.', 'error');
      return false;
    }
  }, [isLogin, review, reviewDispatch]);

  // 신고 버튼 클릭 이벤트 핸들러
  const handleClickReport = useCallback(async () => {
    // db 수정하기
    const URL = `http://localhost:3005/review`;
    if (!isLogin)
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '로그인을 해주세요!',
        footer: '<a href="/login">로그인 하러가기</a>'
      });

    // 컨펌
    Swal.fire({
      title: '신고하시겠습니까?',
      text: '공연에 맞지않는 리뷰를 신고해주세요. ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네, 신고합니다.',
      cancelButtonText: '아니요'
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const result = await axios.put(URL, { ...review, opt: 'report' });

          // 로그인 여부
          if (result.data.code !== '200') {
            if (result.data.code === '400') {
              return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '자기 리뷰에는 신고를 할 수 없습니다.'
              });
            }
            // alert('로그인을 해주세요!');
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '로그인을 해주세요!',
              footer: '<a href="/login">로그인 하러가기</a>'
            });
            return;
          }
          // 백엔드 통신 성공
          if (result.data.code === '200') {
            // alert('신고 완료');
            Swal.fire('신고완료!', '리뷰를 신고했어요.', 'success');
            // 리렌더링을 위한 상태
            reviewDispatch(reRenderReview()); // 리렌더 상태 변경
          }
          // 리뷰 작성 후, 이동하기
        } catch (error) {
          // alert('신고 실패');
          Swal.fire('신고실패', '관리자에게 문의해주세요.', 'error');
          return false;
        }
      }
    });
  }, [isLogin, reviewDispatch, review]);

  return (
    <>
      {/* 게시글 삭제, 수정으로 인해 리뷰가 하나도 없을 경우에는
      리뷰가 생성될 수 없다.
    */}
      {Object.keys(review).length !== 0 ? (
        <>
          <div
            style={style}
            // hover값이 있다면 className에 hover를 넣는다.
            className={`review m-3 d-flex align-items-center ${hover ? 'hover' : ''}`}
          >
            {/* 리뷰 유저정보 */}
            <User url={review.member.profilePhoto} text={review?.member.nickName} />

            {/* 리뷰 콘텐츠 */}
            <div className="review-contents-container flex-grow-1 d-flex flex-column justify-content-between">
              {/* 리뷰 콘텐츠 헤더 */}
              <ReviewHeader review={review} />
              {/* 리뷰 내용 - 클릭 시, 상세 리뷰 모달 오픈 */}
              <div className="review-content flex-grow-1" onClick={handleClickReview}>
                {review?.reviewContents}
              </div>
              {
                // isReviewed ? 내 리뷰가 존재하는지 판단
                isReviewed ? (
                  <>
                    {/* 내 리뷰면 수정 버튼 */}
                    <Button
                      size="sm"
                      style={{ width: '100px', alignSelf: 'flex-end' }}
                      onClick={handleClickModify}
                    >
                      수정하기
                    </Button>
                  </>
                ) : (
                  // 좋아요, 신고 버튼이 있는 리뷰 버튼 컴포넌트
                  <ReviewBtn
                    handleClickLike={handleClickLike}
                    handleClickReport={handleClickReport}
                    likes={review?.reviewLikes}
                  />
                )
              }
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(ReviewItem);
