import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Alert, Button, Form, Table } from 'react-bootstrap';

const Comment = ({ boardNo }) => {
  // alert('댓글을 달 게시글 번호는??' + boardNo);

  // 댓글 정보를 담을 useState
  const [bcomment, setBcomment] = useState('');
  const [showComment, setShowcomment] = useState([{}]); // 댓글 목록데이터를 담을

  // 리렌더 상태를 담는 state
  const [reRender, setReRender] = useState(false);

  const isLogin = useSelector((state) => state.auth.isLogin); // 로그인여부 확인

  // 댓글 textarea onchange 이벤트
  const changeComment = (e) => {
    e.preventDefault();
    setBcomment(e.target.value);
    // console.log('등록할댓글', bcomment);
  };

  // textarea 입력된 글의 바이트수 제한
  const checkByte = (obj) => {
    const maxByte = 100; // 최대 100바이트
    const text_val = bcomment; // 입력한 문자
    const text_len = text_val.length; // 입력한 문자수

    let totalByte = 0;
    for (let i = 0; i < text_len; i++) {
      const each_char = text_val.charAt(i);
      const uni_char = escape(each_char); // 유니코드 형식으로 변환
      if (uni_char.length > 4) {
        // 한글 : 2Byte
        totalByte += 2;
      } else {
        // 영문,숫자,특수문자 : 1Byte
        totalByte += 1;
      }
    }

    if (totalByte > maxByte) {
      alert('최대 100Byte까지만 입력가능합니다.');
      document.getElementById('nowByte').innerText = totalByte;
      document.getElementById('nowByte').style.color = 'red';
    } else {
      document.getElementById('nowByte').innerText = totalByte;
      document.getElementById('nowByte').style.color = 'green';
    }
  };

  // 등록버튼 이벤트
  const onSaveComment = (e) => {
    e.preventDefault();

    const newComment = {
      boardCommentContents: bcomment,
      boardNo: boardNo
    };

    axios
      .post('http://localhost:3005/comments', newComment)
      .then((result) => {
        console.log('댓글등록 result', result);

        if (result.data.code === '200') {
          // 댓글등록을 성공하면 새로작성한 댓글을 목록에 추가해준다.
          setShowcomment([...showComment, showComment]);
          console.log('댓글등록후 바로추가', showComment);

          // setShowcomment(showComment.concat(result.data.data));
          // concat이나 위에 거나 둘중 하나는 먹혀야하는거 아니냐? 왜 됐다 안됐다 그러냐

          // 댓글등록후 바로 추가된 댓글이 보이도록, reRender useState를 만들고 그 값을 true로 바꾼다.
          setReRender(true);

          // 댓글등록이 끝나면 textarea 비워주기
          // document.getElementById('commentTextArea').value = '';
          setBcomment('');

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
          // console.log('댓글 nickname', res.data.data.member.nickName);

          // let regDate =  res.data.data.createdAt.slice(0, 10);
          let cList = {
            boardCommentNo: res.data.data.boardCommentNo,
            boardCommentContents: res.data.data.boardCommentContents,
            // nickName: res.data.data.member.nickName,
            createdAt: res.data.data.createdAt
          };

          // setShowcomment(cList); // 이렇게 정의해서 담으면 왜 안될까 ㅠㅠㅠ
          setShowcomment(res.data.data);
        }

        console.log('뿌려줄 댓글 데이터', showComment);

        // 현재 로그인된 사용자 아이디와, 게시글을 작성했던 사람의 아이디가 동일하면!?
        // if (loginMemberId === res.data.data.memberId) {
        //   setIsModify(true); // 수정가능한 상태 true 체크
        // }
        // console.log(
        //   '게시글작성한사람 아이디 & 현재로그인한 사람아이디',
        //   res.data.data.memberId,
        //   loginMemberId
        // );
        // console.log('게시글수정가능?', isModify);
      })
      .catch((err) => {
        console.error(err);
      });
    //
  }, [reRender]);

  return (
    <div>
      <h4>댓글</h4>
      <hr />
      {/* 여기는 댓글 목록을 보여줄 공간으로 생각함 */}

      <Table bordered hover>
        <thead>
          <tr>
            {/* <th>작성자</th> */}
            <th>내용</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {showComment.map((item, index) => {
            // 작성일 2021-07-31 이렇게 까지만 잘라서 보여주기
            // let regDate = item.createdAt.slice(0, 10);

            return (
              <tr key={item.boardCommentNo}>
                {/* <td>{item.nickName}</td> */}
                <td>{item.boardCommentContents}</td>
                <td>{item.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* 댓글작성 form  */}
      <Form style={{ display: 'flex', alignItems: 'center' }} onSubmit={onSaveComment}>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: 'gray' }}>
            <span id="nowByte">0</span>/100bytes
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            cols={100}
            id="commentTextArea"
            onChange={changeComment}
            value={bcomment}
            placeholder="코멘트를 작성해 주세요"
            onKeyPress={checkByte}
          />
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
