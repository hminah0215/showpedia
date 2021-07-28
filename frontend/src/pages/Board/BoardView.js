import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Container } from 'react-bootstrap';

const BoardView = ({ history, match }) => {
  // 백엔드에서 가져올 게시글 데이터 구조정의
  const [boardView, setBoardView] = useState({});

  // const { boardNo } = match.params;
  // 게시글 번호를 url에서 가져온다.
  let location = useLocation();
  const boardNo = location.pathname.split('/')[2];

  console.log('조회할게시글번호', boardNo);

  useEffect(() => {
    // 게시글 상세보기
    axios
      .get(`http://localhost:3005/board/view/${boardNo}`)
      .then((res) => {
        console.log('백엔드에서 제공된 전체 게시글목록 데이터 구조 파악', res);

        if (res.data.code === '200') {
          // 게시글 목록 세터함수를 통해 백엔드에서 전달된 json 배열을 데이터로 목록을 갱신한다.
          setBoardView(res.data.data);
        } else {
          alert('백엔드 호출! 에러 발생 - 게시글목록');
        }
      })
      .catch((err) => {
        console.error(err);
      });
    //
  }, []);
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
          <button className="post-view-go-list-btn" onClick={() => history.goBack()}>
            목록으로 돌아가기
          </button>
        </div>
      </Container>
    </>
  );
};

export default BoardView;
