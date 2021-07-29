import React, { useState, useMemo, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// 민아) 7/27, 게시글 등록 - ckEditor 사용
const BoardRegist = () => {
  const history = useHistory();

  // 에디터에 입력한 내용
  const [editorContents, setEditorContents] = useState('');

  // 에디터 글 onChange
  const onChangeContents = (boardContents) => {
    setEditorContents(boardContents);
    console.log(boardContents);
  };

  // 단일 게시글 정보 구조 정의 및 초기화
  const [board, setBoard] = useState({
    boardTitle: '',
    boardCategory: '',
    boardContents: ''
    // memberId: ''  로그인 상태를 유지해야 멤버아이디를 가져올 수 있음
  });

  // 입력요소와 useState간 데이터 바인딩 적용
  // board 내용을 복사해서 그 안의 name 이름의 키의 값을 value로 바꿔 저장!
  // 리액트에서는 값을 직접 수정하면 안되고 이렇게 복사해서 수정하는 방식을 이용한다.
  const onChangeRegist = (e) => {
    // const { name, value } = e.target;
    setBoard({ ...board, [e.target.name]: e.target.value });
    console.log(board);
  };

  const modules = useEffect(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image']
        ],
        handlers: {
          // imgUrl: imageUrlHandler,
          // image: imageHandler
        }
      }
    }),
    []
  );

  // 게시글 등록버튼
  const onSave = () => {
    let newBoard = {
      boardTitle: board.boardTitle,
      boardCategory: board.boardCategory,
      boardContents: editorContents
      // memberId:board.memberId
    };
    if (newBoard.boardTitle.length === 0 || newBoard.boardContents.length === 0) {
      alert('게시글 제목과 내용을 입력해주세요!');
      return false;
    }

    // axios post
    axios
      .post('http://localhost:3005/board/regist', newBoard)
      .then((result) => {
        console.log('게시글등록===>', result);

        if (result.data.code === '200') {
          alert('게시글 등록 성공');

          // 게시글 목록으로 돌아가기
          history.push('/board');
        } else {
          alert('백엔드 에러 발생 - 게시글등록');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container
      className="my-3 container"
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Form>
        <Form.Group className="mb-3" style={{ marginTop: '2rem' }}>
          <Form.Control
            type="text"
            name="boardTitle"
            placeholder="제목을 입력해주세요."
            value={board.boardTitle}
            onChange={onChangeRegist}
            // ref={titleRef}
          />
        </Form.Group>
        <Form.Select
          aria-label="Default select example"
          style={{ marginBottom: '2rem' }}
          onChange={onChangeRegist}
          value={board.boardCategory}
          name="boardCategory"
        >
          <option>카테고리를 선택해주세요.</option>
          <option value="free">자유</option>
          <option value="actor">덕질</option>
          <option value="together">같이가요</option>
        </Form.Select>
      </Form>
      <ReactQuill
        name="boardContents"
        theme="snow"
        modules={modules}
        value={editorContents}
        style={{ height: '500px' }}
        placeholder={'플레이스 홀더임'}
        onChange={onChangeContents}
      />
      <br />
      <Button style={{ marginTop: '2rem', width: '20%' }} onClick={onSave}>
        등록
      </Button>
    </Container>
  );
};

export default BoardRegist;
