import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Alert, Button, Form } from 'react-bootstrap';

const Comment = ({ boardNo }) => {
  // alert('댓글을 달 게시글 번호는??' + boardNo);

  // 댓글 정보를 담을 useState
  const [bcomment, setBcomment] = useState('');
  const [showComment, setShowcomment] = useState([]); // 댓글 목록데이터를 담을

  // 리렌더 상태를 담는 state
  const [reRender, setReRender] = useState(false);

  const [nullError, setNullError] = useState(false);

  // 댓글 textarea onchange 이벤트
  const changeComment = (e) => {
    e.preventDefault();
    setBcomment(e.target.value);
    // console.log('등록할댓글', bcomment);
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
        console.log('댓글등록 result', result);

        if (result.data.code === '200') {
          // 댓글등록후 바로 추가된 댓글이 보이도록, reRender useState를 만들고 그 값을 true로 바꾼다.
          setReRender(!reRender);

          // 댓글등록이 끝나면 textarea 비워주기
          setBcomment('');

          setNullError(false); // 댓글등록이 완료되면 에러메시지상태를 false

          alert('댓글을 등록하였습니다!');
        } else {
          alert('댓글등록 실패, 관리자에게 문의하세요.');
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
        console.log('댓글목록 데이터', res);

        if (res.data.code === '200') {
          setShowcomment(res.data.data);
        }

        console.log('뿌려줄 댓글 데이터', showComment);
      })
      .catch((err) => {
        console.error(err);
      });
    //
  }, [reRender]); // 댓글등록하면 reRender상태를 true로 바꾼다. 새로 등록한 댓글이 바로 보이도록 두번째인자 추가

  return (
    <div>
      <h4>댓글</h4>
      <hr />
      {/* 여기는 댓글 목록을 보여줄 공간으로 생각함 */}
      {/* 댓글이 없으면 아예 랜더링 안되게!  */}

      {showComment.length !== 0 ? (
        showComment.map((item) => {
          let regDate = item.createdAt.slice(0, 10);
          return (
            <Alert variant="success" key={item.boardCommentNo}>
              <Alert.Heading>{item.member.nickName}</Alert.Heading>
              <p>{item.boardCommentContents}</p> <hr />
              <p className="mb-0">{regDate}</p>
            </Alert>
          );
        })
      ) : (
        <></>
      )}

      {/* 댓글작성 form  */}
      <Form style={{ display: 'flex', alignItems: 'center' }} onSubmit={onSaveComment}>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: 'gray' }}>
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
            <Form.Label style={{ color: 'red' }}>댓글내용을 입력해주세요.</Form.Label>
          )}
        </Form.Group>
        &nbsp;
        <Button onClick={onSaveComment} style={{ height: '50%' }}>
          댓글등록
        </Button>
      </Form>
    </div>
  );
};

export default Comment;
