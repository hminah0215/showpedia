import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// 부트스트랩
import { Button, Form } from 'react-bootstrap';
// css
import './Comment.css';
// 컴포넌트 참조
import BcommentsPagenation from '../../components/Pagination/BcommentsPagenation';
import CommentItem from './CommentItem';
// etc
import Swal from 'sweetalert2';
import axios from 'axios';

const Comment = ({ boardNo }) => {
  // 로그인한 멤버아이디 확인
  const loginMemberId = useSelector((state) => state.auth.loginMemberId);

  // 댓글 정보를 담을 useState
  const [bcomment, setBcomment] = useState(''); // 댓글입력
  const [showComment, setShowcomment] = useState([]); // 댓글 목록데이터를 담을 곳

  // 댓글 수정정보를 담을 useState
  const [updateComment, setUpdateComment] = useState('');

  // 페이지 네이션 처리를 위한 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  // 총데이터를 perPage 만큼 분할해서 보여줄것, 한페이지에 댓글 6개
  const [perPage, setPerPage] = useState(6);

  // 리렌더 상태를 담는 state
  const [reRender, setReRender] = useState(false);

  // 댓글내용빈칸이면 에러메시지를 보여줄 상태
  const [nullError, setNullError] = useState(false);

  // 댓글 등록 textarea onchange 이벤트
  const changeComment = (e) => {
    e.preventDefault();
    setBcomment(e.target.value);
  };

  // 등록버튼 이벤트
  const onSaveComment = (e) => {
    e.preventDefault();

    let newComment = {
      boardCommentContents: bcomment,
      boardNo: boardNo
    };

    // 댓글 내용이 없으면, 댓글입력창 아래에 경고메시지
    if (newComment.boardCommentContents.length <= 0) {
      return setNullError(true);
    }

    axios
      .post('http://localhost:3005/comments', newComment)
      .then((result) => {
        if (result.data.code === '200') {
          // 댓글등록후 바로 추가된 댓글이 보이도록, reRender useState를 만들고 그 값을 true로 바꾼다.
          setReRender(!reRender);

          // 댓글등록이 끝나면 textarea 비워주기
          setBcomment('');

          setNullError(false); // 댓글등록이 완료되면 에러메시지상태를 false

          // alert('댓글을 등록하였습니다!');
          Swal.fire({
            icon: 'success',
            title: '등록완료',
            text: '댓글을 등록하였습니다.'
          });
        } else {
          // alert('댓글등록 실패, 관리자에게 문의하세요.');
          Swal.fire('댓글등록 실패', '관리자에게 문의해주세요.', 'error');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 댓글목록
  useEffect(() => {
    axios
      .get(`http://localhost:3005/comments/${boardNo}`)
      .then((res) => {
        if (res.data.code === '200') {
          setShowcomment(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    //
  }, [reRender, boardNo]); // 댓글등록하면 reRender상태를 true로 바꾼다. 새로 등록한 댓글이 바로 보이도록 두번째인자 추가

  // 해당페이지의 첫번째와 마지막 인덱스 번호값을 구한다.
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;

  // 배열 데이터를 slice 함수로 분할 해서 새로운 배열을 리턴한다.
  function currentPosts(data) {
    let currentPosts = 0;
    currentPosts = data.slice(indexOfFirst, indexOfLast); // 현재페이지
    return currentPosts;
  }

  // 댓글수정 textarea
  const upComment = (e) => {
    e.preventDefault();
    setUpdateComment(e.target.value);
  };

  // 댓글 수정 폼 이벤트
  const onEditComment = (e) => {
    e.preventDefault();

    const commentNo = document.getElementById('commentNo').textContent;

    let editComment = {
      boardCommentContents: updateComment,
      boardCommentNo: commentNo
    };

    // 댓글 내용이 없으면, 댓글입력창 아래에 경고메시지
    if (editComment.boardCommentContents.length <= 0) {
      return setNullError(true);
    }

    axios
      .put('http://localhost:3005/comments', editComment)
      .then((result) => {
        if (result.data.code === '200') {
          // 댓글등록후 바로 추가된 댓글이 보이도록, reRender useState를 만들고 그 값을 true로 바꾼다.
          setReRender(!reRender);

          setUpdateComment('');

          setNullError(false); // 댓글등록이 완료되면 에러메시지상태를 false

          Swal.fire({
            icon: 'success',
            title: '수정완료',
            text: '댓글을 수정하였습니다.'
          });
        } else {
          Swal.fire('댓글수정 실패', '관리자에게 문의해주세요.', 'error');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h5>댓글</h5>
      {/* 댓글작성 form  */}
      <Form onSubmit={onSaveComment}>
        <Form.Group className="mb-3">
          <Form.Label className="checktext" style={{ color: 'gray' }}>
            욕설,비방,도배 등의 댓글은 삭제될 수 있습니다.
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            cols={100}
            id="commentTextArea"
            onChange={changeComment}
            value={bcomment}
            placeholder="코멘트를 작성해 주세요"
          />
          {/* 댓글등록시 내용이 없으면 (nullError가 true이면) 경고메시지 보이기 */}
          {nullError === false ? (
            ''
          ) : (
            <Form.Label className="checktext" style={{ color: 'red' }}>
              댓글내용을 입력해주세요.
            </Form.Label>
          )}
        </Form.Group>
        <Button onClick={onSaveComment}>댓글등록</Button>
      </Form>
      <hr />

      {/* 여기는 댓글 목록을 보여줄 공간으로 생각함 */}
      {/* 댓글이 없으면 아예 랜더링 안되게!  */}
      {showComment.length !== 0 ? (
        // currentPosts 현재 페이지에 보여줄 댓글데이터(댓글리스트 )
        currentPosts(showComment).map((item) => (
          <CommentItem
            item={item}
            key={item.boardCommentNo}
            loginMemberId={loginMemberId}
            setReRender={setReRender}
            reRender={reRender}
            onEditComment={onEditComment}
            upComment={upComment}
            updateComment={updateComment}
            nullError={nullError}
          />
        ))
      ) : (
        <></>
      )}
      {/* 댓글 페이지네이션 */}
      <BcommentsPagenation
        perPage={perPage}
        commentList={showComment.length}
        paginate={setCurrentPage}
      ></BcommentsPagenation>
    </div>
  );
};

export default Comment;
