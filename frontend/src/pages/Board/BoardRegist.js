import React, { useState, useMemo } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploader from 'quill.imageUploader.js';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

ReactQuill.register('modules/imageUploader', ImageUploader);

// ReactQuill.register('modules/imageUploader', ImageUploader);
// 민아) 7/27, 게시글 등록
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

  // 이미지제어
  // const imageHandler = () => {
  //   this.quillEditor = this.quillRef.getEditor();
  //   // input file 태그를 만든다.
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();
  //   input.onchange = async function () {
  //     const file = input.files[0];
  //     console.log('업로드하려는 이미지:', file);

  //     const formData = new FormData();
  //   };

  // 에디터 툴바 모듈과 포맷
  // const modules = {
  //   toolbar: {
  //     container: [
  //       [{ header: [1, 2, false] }],
  //       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //       [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  //       ['link', 'image'],
  //       ['clean']
  //     ]
  //   }
  // };
  // };
  // useMemo 사용해야 툴바가 정한대로 나온다.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean']
        ],
        ImageUploader: {
          upload: async (file) => {
            const bodyFormData = new FormData();
            bodyFormData.append('image', file);
            //본문에 이미지가 <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMVFRUXFhcWF
            // 이런식으로 글로 등록됨
            console.log('bodyFormData', bodyFormData);
            const response = await axios({
              method: 'post',
              url: "'http://localhost:3005/board/uploads",
              data: bodyFormData,
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log('이미지업로드 axios', response);
            return response.data.data.url;
          }
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
        modules={modules}
        formats={formats}
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
