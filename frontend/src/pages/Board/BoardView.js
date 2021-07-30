import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Button, Container } from 'react-bootstrap';
import { ExclamationCircle } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

const BoardView = ({ history, match }) => {
  // 백엔드에서 가져올 게시글 데이터 구조정의
  const [boardView, setBoardView] = useState({});

  // 수정
  const [isModify, setIsModify] = useState(false);

  // 로그인한 멤버아이디 확인
  const loginMemberId = useSelector((state) => state.auth.loginMemberId);

  // const { boardNo } = match.params;
  // 게시글 번호를 url에서 가져온다.
  let location = useLocation();
  const boardNo = location.pathname.split('/')[3];

  console.log('조회할게시글번호', boardNo);

  useEffect(() => {
    // 게시글 상세보기
    axios
      .get(`http://localhost:3005/board/view/${boardNo}`)
      .then((res) => {
        console.log('게시글 상세보기 데이터', res);

        if (loginMemberId === res.data.data.memberId) {
          setIsModify(true);
        }

        console.log(
          '게시글작성한사람 아이디 & 현재로그인한 사람아이디',
          res.data.data.memberId,
          loginMemberId
        );

        console.log('게시글수정가능?', isModify);

        if (res.data.code === '200') {
          // 게시글 목록 세터함수를 통해 백엔드에서 전달된 json 배열을 데이터로 목록을 갱신한다.
          setBoardView(res.data.data);
        } else {
          alert('백엔드 호출! 에러 발생 - 게시글상세보기');
        }
      })
      .catch((err) => {
        console.error(err);
      });
    //
  }, [loginMemberId]);

  // 게시글 삭제버튼 이벤트
  const deleteBoard = () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      axios
        .delete(`http://localhost:3005/board/${boardNo}`)
        .then((result) => {
          console.log('게시글삭제 res', result);
          alert('게시글이 삭제되었습니다. 목록으로 돌아갑니다.');
          history.push('/board');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // 신고버튼 이벤트
  const handleClickReport = () => {
    console.log('신고버튼클릭!');

    // db수정하기
    const URL = `http://localhost:3005/board/${boardNo}`;

    if (window.confirm('게시글을 신고하시겠습니까?')) {
      try {
        axios
          .put(URL, {
            ...BoardView,
            opt: 'report', // 신고이면 report 전달
            reportMember: loginMemberId, // 신고한 사람과 게시글 작성자 아이디비교를 위해 전달
            boardReports: boardView.boardReports // 기존의 신고수를 전달해서 백엔드에서 +1
          })
          .then((result) => {
            console.log('신고 결과', result);
            if (result.data.code !== '200') {
              if (result.data.code === '400') {
                return alert('본인글에는 신고를 할 수 없습니다.');
              }
              alert('로그인을 해주세요!');
              return;
            }

            if (result.data.code === '200') {
              setBoardView({ ...boardView, boardReports: boardView.boardReports + 1 });
            }

            console.log('신고완료', boardView);
          })
          .catch((err) => {
            alert('신고실패');
            console.error(err);
            return false;
          });
      } catch (error) {}
    }
  };

  return (
    <>
      <Container>
        <h2 align="center">게시글 상세정보</h2>

        <div className="post-view-wrapper">
          {boardView ? (
            <>
              <div className="post-view-row">
                <label>게시글 번호</label>
                <label>{boardView.boardNo}</label>
              </div>
              <div className="post-view-row">
                <label>제목</label>
                <label>{boardView.boardTitle}</label>
              </div>
              <div className="post-view-row">
                <label>작성자</label>
                <label>{boardView.memberId}</label>
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                <label>{boardView.createdAt}</label>
              </div>
              <div className="post-view-row">
                <label>조회수</label>
                <label>{boardView.boardHits}</label>
              </div>
              <div className="post-view-row">
                <label>내용</label>
                {/* 에디터를 통해 게시글을 쓰면 <p>안녕</p>처럼 html태그가 다 저장되서 보일때 안좋으므로
                ReactHtmlParser를 통해 컨텐츠의 value를 감싸준다! */}
                <div>{ReactHtmlParser(boardView.boardContents)}</div>
              </div>
            </>
          ) : (
            '해당 게시글을 찾을 수 없습니다.'
          )}
          {/* 신고 버튼 */}
          <button className="review-btn review-btn--alert" onClick={handleClickReport}>
            <ExclamationCircle size={20} />
          </button>
          <div style={{ color: 'red' }}>신고수 : {boardView.boardReports}</div>
          <br />
          <button
            className="post-view-go-list-btn"
            onClick={() => history.goBack()}
            style={{ marginBottom: '2rem' }}
          >
            목록으로 돌아가기
          </button>
          <br />
          {/* 아이디비교해서 수정여부 true, false  */}
          {isModify && (
            <Button
              style={{ marginRight: '1rem' }}
              onClick={() => history.push({ pathname: `/board/modify/${boardView.boardNo}` })}
            >
              수정
            </Button>
          )}

          {isModify && <Button onClick={deleteBoard}>삭제</Button>}
        </div>
      </Container>
    </>
  );
};

export default BoardView;
