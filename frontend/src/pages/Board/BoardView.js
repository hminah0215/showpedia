import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// 부트스트랩
import { Alert, Badge, Button, Container } from 'react-bootstrap';
import { Clock, ExclamationTriangle, Eye } from 'react-bootstrap-icons';

// ext
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';

// 댓글
import Comment from '../../components/Board/Comment';

import NotFound from '../../components/NotFound/NotFound';

// sweetAlert
import Swal from 'sweetalert2';

const BoardView = ({ history }) => {
  // 백엔드에서 가져올 게시글 데이터 구조정의
  const [boardView, setBoardView] = useState({});

  // 수정
  const [isModify, setIsModify] = useState(false);

  // 로그인한 멤버아이디 확인
  const loginMemberId = useSelector((state) => state.auth.loginMemberId);

  // 게시글 번호를 url에서 가져온다.
  let location = useLocation();
  const boardNo = location.pathname.split('/')[3];

  useEffect(() => {
    // 게시글 상세보기
    axios
      .get(`http://www.showpedia.xyz:3005/board/view/${boardNo}`)
      .then((res) => {
        if (res.data.code === '200') {
          let regDate = res.data.data.createdAt.slice(0, 10);

          // 저장할 내용을 정의해서
          let view = {
            boardNo: res.data.data.boardNo,
            memberId: res.data.data.memberId,
            boardTitle: res.data.data.boardTitle,
            boardCategory: res.data.data.boardCategory,
            boardContents: res.data.data.boardContents,
            boardReports: res.data.data.boardReports,
            boardHits: res.data.data.boardHits + 1,
            createdAt: regDate,
            nickName: res.data.data.member.nickName
          };

          setBoardView(view); // 담는다.
        } else {
          Swal.fire('에러발생', '게시글 상세보기 에러발생, 관리자에게 문의해주세요.', 'question');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // 현재 로그인된 사용자 아이디와, 게시글을 작성했던 사람의 아이디 비교
  useEffect(() => {
    if (loginMemberId === boardView.memberId) {
      setIsModify(true);
    } else {
      setIsModify(false);
    }
  }, [loginMemberId, boardView]);

  // 게시글 삭제버튼 이벤트
  const deleteBoard = () => {
    // sweetAlret 적용해서 삭제인지 물어보기
    Swal.fire({
      title: '게시글을 삭제하시겠습니까?',
      text: '삭제하면 되돌릴 수 없어요!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니요'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://www.showpedia.xyz:3005/board/${boardNo}`)
          .then((result) => {
            Swal.fire('게시글 삭제완료!', '게시글 목록으로 돌아갑니다.', 'success');
            history.push('/board');
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  // 신고버튼 이벤트
  const handleClickReport = () => {
    // db수정하기
    const URL = `http://www.showpedia.xyz:3005/board/${boardNo}`;

    Swal.fire({
      title: '게시글을 신고하시겠습니까?',
      text: '눈살을 찌푸리게 만드는 글을 신고해주세요.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네, 신고합니다.',
      cancelButtonText: '아니요'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(URL, {
            ...BoardView,
            opt: 'report', // 신고이면 report 전달
            reportMember: loginMemberId, // 신고한 사람과 게시글 작성자 아이디비교를 위해 전달
            boardReports: boardView.boardReports // 기존의 신고수를 전달해서 백엔드에서 +1
          })
          .then((result) => {
            if (result.data.code !== '200' && result.data.code === '400') {
              // return alert('본인글에는 신고를 할 수 없습니다.');
              return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '본인글에는 신고할 수 없습니다.'
              });
            }

            // 신고결과가 ok이면 신고수 +1
            if (result.data.code === '200') {
              Swal.fire('신고 완료!', '올바른 인터넷 문화를 위해 노력하겠습니다.', 'success');
              setBoardView({ ...boardView, boardReports: boardView.boardReports + 1 });
            }
          })
          .catch((err) => {
            Swal.fire('신고실패', '관리자에게 문의해주세요.', 'error');
            console.error(err);
            return false;
          });
      }
    });
  };

  return (
    <Container className="my-5 d-flex flex-column justify-content-center ">
      {boardView ? (
        <>
          {/* 제목, 작성자, 조회수, 신고수, 작성일  */}
          <div>
            <div className="d-flex gap-2 flex-wrap justify-content-between">
              {/* 제목 / 작성자 */}
              <div className="d-flex align-items-center">
                <h5 className="m-0">{boardView.boardTitle}</h5>
                <Badge className="ms-3" bg="secondary">
                  {boardView.nickName}
                </Badge>
              </div>
              {/* 조회수 / 신고수 / 작성일 */}
              <div>
                <span className="me-4">
                  <Eye className="me-1" />
                  {boardView.boardHits}
                </span>
                <span className="me-4">
                  <ExclamationTriangle className="me-1" style={{ color: 'red' }} />
                  {boardView.boardReports}
                </span>
                {/* 작성일 */}
                <span>
                  <Clock className="me-1" />
                  {boardView.createdAt}
                </span>
              </div>
            </div>
          </div>
          <hr />

          {/* 게시글 내용 */}
          <Alert variant="light">
            {/* 내용 : 에디터를 통해 게시글을 쓰면 <p>안녕</p>처럼 html태그가 다 저장되서 보일때도 태그들이 보인다.
            그래서 깔끔하게 ReactHtmlParser를 통해 컨텐츠의 value를 감싸준다! */}
            <div>{ReactHtmlParser(boardView.boardContents)}</div>
          </Alert>
        </>
      ) : (
        <NotFound msg="해당 게시글이 존재하지않습니다." />
      )}

      {/* 목록으로 돌아가기, 수정,삭제, 신고 버튼 */}
      <div className="d-flex justify-content-center align-items-center my-4">
        {/* 목록으로 돌아가기 버튼 */}
        <Button variant="outline-secondary" onClick={() => history.goBack()}>
          목록으로 돌아가기
        </Button>
        {/* 글쓴 사람에게만 보이는 수정버튼 */}
        {isModify && (
          <Button
            className="mx-3"
            onClick={() => history.push({ pathname: `/board/modify/${boardView.boardNo}` })}
          >
            수정
          </Button>
        )}
        {/* 글쓴 사람에게만 보이는 삭제버튼 */}
        {isModify && (
          <Button variant="danger" onClick={deleteBoard}>
            삭제
          </Button>
        )}
        {/* 글쓴이는 본인글에 신고버튼을 볼 수 없다. */}
        {isModify || (
          <button
            className="review-btn review-btn--alert ms-4"
            onClick={handleClickReport}
            style={{ width: '30px', height: '30px' }}
          >
            <ExclamationTriangle size={30} />
          </button>
        )}
      </div>

      {/* 댓글 등록 */}
      <Comment className="" boardNo={boardNo}></Comment>
    </Container>
  );
};

export default BoardView;
