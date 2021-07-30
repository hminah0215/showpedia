import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

const BoardModify = () => {
  const history = useHistory();

  // 원래 게시글 정보
  const [exBoard, setExBoard] = useState({
    boardTitle: '',
    boardCategory: '',
    boardContents: ''
  });

  // 에디터에 입력한 내용
  const [editorContents, setEditorContents] = useState('');

  // 에디터 글 onChange
  const onChangeContents = (boardContents) => {
    setEditorContents(boardContents);
    console.log(boardContents);
  };

  // 제목,카테고리 등 내용변화 onChange
  const onChangeRegist = (e) => {
    // const { name, value } = e.target;
    setExBoard({ ...exBoard, [e.target.name]: e.target.value });
    console.log('등록할내용', exBoard);
  };

  // 주소에서 현재 게시글 번호를 가져옴
  let location = useLocation();
  const boardNo = location.pathname.split('/')[3];
  console.log('수정할 boardno', boardNo);

  // 원래 게시글 정보를 뿌려준다.
  useEffect(() => {
    // 게시글 상세보기
    axios
      .get(`http://localhost:3005/board/view/${boardNo}`)
      .then((res) => {
        console.log('게시글 수정,원래내용 데이터', res);

        if (res.data.code === '200') {
          let exContents = {
            boardTitle: res.data.data.boardTitle,
            boardCategory: res.data.data.boardCategory,
            boardContents: res.data.data.boardContents
          };

          setExBoard(exContents);

          console.log('exboard??', exBoard);
        } else {
          alert('백엔드 호출! 에러 발생 - 게시글수정,원래내용');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean']
        ]
      }
    }),
    []
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ];

  // 게시글 수정등록버튼
  const onUpdate = () => {
    let updateBoard = {
      boardTitle: exBoard.boardTitle,
      boardCategory: exBoard.boardCategory,
      boardContents: editorContents
    };

    if (updateBoard.boardTitle.length === 0 || updateBoard.boardContents.length === 0) {
      alert('게시글 제목과 내용을 입력해주세요!');
      return false;
    }
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };

    // axios put 수정
    axios
      .put(`http://localhost:3005/board/${boardNo}`, updateBoard, config)
      .then((result) => {
        console.log('게시글 수정===>', result);

        if (result.data.code === '200') {
          alert('게시글 수정 성공');

          // 게시글 목록으로 돌아가기
          history.push('/board');
        } else {
          alert('백엔드 에러 발생 - 게시글수정');
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
            value={exBoard.boardTitle}
            onChange={onChangeRegist}
          />
        </Form.Group>
        <Form.Select
          aria-label="Default select example"
          style={{ marginBottom: '2rem' }}
          onChange={onChangeRegist}
          value={exBoard.boardCategory}
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
        id="editor"
        modules={modules}
        formats={formats}
        value={editorContents}
        defaultValue={exBoard.boardContents}
        style={{ height: '500px' }}
        // placeholder={'플레이스 홀더임'}
        // onChange={(content, delta, source, editor) => onChangeContents(editor.getHTML())}
        onChange={onChangeContents}
      />
      <br />
      <Button style={{ marginTop: '2rem', width: '20%' }} onClick={onUpdate}>
        등록
      </Button>
    </Container>
  );
};

export default BoardModify;
