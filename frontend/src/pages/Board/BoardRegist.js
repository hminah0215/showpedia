import React, { useState, useMemo, useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// 글쓰기 에디터
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// sweetalert
import Swal from 'sweetalert2';

// 민아) 7/27, 게시글 등록
const BoardRegist = () => {
  const history = useHistory();

  // 에디터에 입력한 내용
  const [editorContents, setEditorContents] = useState('');

  // const [value, setValue] = useState(''); // 기본적으로 에디터에 들어가는 contents

  // 단일 게시글 정보 구조 정의 및 초기화
  const [board, setBoard] = useState({
    boardTitle: '',
    boardCategory: '',
    boardContents: '',
    memberId: ''
  });

  // 에디터내 이미지 처리를 위한 ref
  const imageRef = useRef();

  // quill 메서드를 사용하기 위한 ref
  const quillRef = useRef();

  // 에디터 글 onChange
  const onChangeContents = (boardContents) => {
    setEditorContents(boardContents);
  };

  // 이미지를 따로 처리해 저장하기 때문에 imageHandler를 만든다
  const imageHandler = () => {
    console.log('이미지 핸들러');
    // 히든으로 숨겨진 input을 선택하도록 한다.
    imageRef.current.click(); // 선택을 input으로 하게함
  };

  // 히든 인풋에 현재 선택된 이미지 값 넣어주기
  const onChangeImageInput = (e) => {
    e.preventDefault();

    // server에서 multer 사용을 위한 formData를 만든다.
    const imageFormData = new FormData();
    console.log('히든인풋창 온체인지 핸들러 e', e.target.files);

    // e.target.files에 있는 파일들을 멀터에 저장해야댐.
    imageFormData.append('img', e.target.files[0]);

    // for (let key of imageFormData.keys()) {
    //   console.log('이미지핸들러key', key);
    // }

    // for (let value of imageFormData.values()) {
    //   console.log('이미지핸들러value', value);
    // }

    // 멀터에 이미지를 저장하고 이미지 경로 URL을 받아온다.
    axios
      .post('http://localhost:3005/board/uploads', imageFormData)
      .then((res) => {
        // 성공하면 보내주는 데이터 res
        console.log('멀터 이미지 res', res.data);
        console.log('이 url을 에디터객체에 넣어야한다.', res.data.url);
        console.log('지금 에디터 ref', quillRef.current);

        const IMG_URL = res.data.url;

        // URL을 에디터 DOM에 접근해 내부에 추가한다.
        const editor = quillRef.current.getEditor();
        editor.root.innerHTML = editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 입력요소와 useState간 데이터 바인딩 적용
  // board 내용을 복사해서 그 안의 name 이름의 키의 값을 value로 바꿔 저장!
  // 리액트에서는 값을 직접 수정하면 안되고 이렇게 복사해서 수정하는 방식을 이용한다.
  const onChangeRegist = (e) => {
    // const { name, value } = e.target;
    setBoard({ ...board, [e.target.name]: e.target.value });
  };

  // useMemo를 꼭 사용해야 툴바가 정한대로 나온다.
  const modules = useMemo(() => {
    return {
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
    };
  }, []);

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

  // 게시글 등록버튼
  const onSave = async () => {
    let newBoard = {
      boardTitle: board.boardTitle,
      boardCategory: board.boardCategory,
      boardContents: editorContents,
      memberId: board.memberId
    };

    // console.log('editorContents?', editorContents);

    if (newBoard.boardTitle.length === 0 || newBoard.boardContents.length === 0) {
      // alert('게시글 제목과 내용을 입력해주세요!');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '게시글 제목과 내용을 입력해주세요!'
      });
      return false;
    }

    if (
      newBoard.boardCategory.length === 0 ||
      newBoard.boardCategory === '카테고리를 선택해주세요.'
    ) {
      // alert('카테고리를 선택해주세요.');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '카테고리를 꼭 선택해주세요!'
      });
      return false;
    }

    // axios post
    await axios
      .post('http://localhost:3005/board/regist', newBoard)
      .then((result) => {
        if (result.data.code === '200') {
          // alert('게시글 등록 성공');
          Swal.fire({
            icon: 'success',
            title: '등록완료!',
            text: '게시글이 등록되었습니다.'
          });

          // 게시글 목록으로 돌아가기
          history.push('/board');
        } else {
          Swal.fire('에러발생', '게시글등록 에러발생, 관리자에게 문의해주세요.', 'question');
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
        ref={quillRef}
        name="boardContents"
        // id="editor"
        modules={modules}
        formats={formats}
        value={editorContents}
        style={{ height: '500px' }}
        placeholder={'글 내용을 입력해주세요! 바른말 고운말 :)'}
        onChange={onChangeContents}
      />
      <br />
      {/* <p>여기에 input이 히든으로 존재</p> */}
      <input hidden type="file" ref={imageRef} onChange={onChangeImageInput} />
      <br />
      <Button style={{ marginTop: '2rem', marginBottom: '2rem', width: '100%' }} onClick={onSave}>
        등록
      </Button>
    </Container>
  );
};

export default BoardRegist;
