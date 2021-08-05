import React, { useEffect, useMemo, useRef, useState } from 'react';

import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

import ReactQuill from 'react-quill'; // quill에디터
import 'react-quill/dist/quill.snow.css'; // quill에디터 테마

// sweetAlert
import Swal from 'sweetalert2';

const BoardModify = () => {
  const history = useHistory();

  // 에디터내 이미지 처리를 위한 ref
  const imageRef = useRef();

  // quill 메서드를 사용하기 위한 ref
  const quillRef = useRef();

  // 리렌더 상태를 담는 state
  const [reRender, setReRender] = useState(false);

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
  };

  // 이미지를 따로 처리해 저장하기 때문에 imageHandler를 만든다
  const imageHandler = () => {
    // 히든으로 숨겨진 input을 선택하도록 한다.
    imageRef.current.click(); // 선택을 input으로 하게함
  };

  // 제목,카테고리 등 내용변화 onChange
  const onChangeRegist = (e) => {
    // const { name, value } = e.target;
    setExBoard({ ...exBoard, [e.target.name]: e.target.value });
  };

  // 히든 인풋에 현재 선택된 이미지 값 넣어주기
  const onChangeImageInput = (e) => {
    e.preventDefault();

    // server에서 multer 사용을 위한 formData를 만든다.
    const imageFormData = new FormData();
    // e.target.files에 있는 파일들을 멀터에 저장해야댐.
    imageFormData.append('img', e.target.files[0]);

    // 멀터에 이미지를 저장하고 이미지 경로 URL을 받아온다.
    axios
      .post('http://localhost:3005/board/uploads', imageFormData)
      .then((res) => {
        // 성공하면 보내주는 데이터 res

        const IMG_URL = res.data.url;

        // URL을 에디터 DOM에 접근해 내부에 추가한다.
        const editor = quillRef.current.getEditor();
        editor.root.innerHTML = editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 주소에서 현재 게시글 번호를 가져옴
  let location = useLocation();
  const boardNo = location.pathname.split('/')[3];

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

          // 불러온 기존내용을 setExBoard에 담는다.
          setExBoard(exContents);

          // 에디터에 원래 내용을 뿌려주기 위해 setEditorContents에 게시글 내용은 별도로 담음
          setEditorContents(exBoard.boardContents);

          // 에디터에 기존 글 내용이 바로 뿌려지지않아, reRender useState를 만들고 그 값을 true로 바꾼다.
          setReRender(true);
        } else {
          Swal.fire(
            '에러발생',
            '게시글 기존 내용 불러오기 에러발생, 관리자에게 문의해주세요.',
            'question'
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [boardNo, reRender]); // 에디터에 기존내용이 바로 뿌려지도록 reRender state가 바뀔때마다 동작

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['image', 'link'],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }]
        ],
        handlers: {
          image: imageHandler // 이미지 핸들러
        }
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
      // alert('게시글 제목과 내용을 입력해주세요!');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '게시글 제목과 내용을 입력해주세요!'
      });
      return false;
    }

    if (
      updateBoard.boardCategory.length === 0 ||
      updateBoard.boardCategory === '카테고리를 선택해주세요.'
    ) {
      // alert('카테고리를 선택해주세요.');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '카테고리를 꼭 선택해주세요!'
      });
      return false;
    }

    // axios put 수정
    axios
      .put(`http://localhost:3005/board/${boardNo}`, updateBoard)
      .then((result) => {
        console.log('게시글 수정===>', result);

        if (result.data.code === '200') {
          // alert('게시글 수정 성공');
          Swal.fire({
            icon: 'success',
            title: '등록완료!',
            text: '게시글이 등록되었습니다.'
          });

          // 게시글 목록으로 돌아가기
          history.push('/board');
        } else {
          // alert('백엔드 에러 발생 - 게시글수정');
          Swal.fire('에러발생', '게시글수정 에러발생, 관리자에게 문의해주세요.', 'question');
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
        ref={quillRef}
        name="boardContents"
        modules={modules}
        formats={formats}
        value={editorContents}
        style={{ height: '500px' }}
        onChange={onChangeContents}
      />
      <br />
      {/* <p>여기에 input이 히든으로 존재</p> */}
      <input hidden type="file" ref={imageRef} onChange={onChangeImageInput} />
      <br />
      <Button style={{ marginTop: '2rem', width: '20%' }} onClick={onUpdate}>
        등록
      </Button>
    </Container>
  );
};

export default BoardModify;
