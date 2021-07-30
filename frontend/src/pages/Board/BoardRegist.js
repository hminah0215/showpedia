import React, { useState, useMemo } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploader from 'quill-image-uploader';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

Quill.register('modules/imageUploader', ImageUploader);

// 민아) 7/27, 게시글 등록
const BoardRegist = () => {
  const history = useHistory();

  // 에디터에 입력한 내용
  const [editorContents, setEditorContents] = useState('');

  // 에디터 글 onChange
  const onChangeContents = (boardContents) => {
    // 글에 이미지 첨부시 이미지태그가 엄청 길게 들어가니까 이미지 태그는 자름!
    // const img_tag = /<IMG(.*?)>/gi;
    // boardContents = boardContents.replace(img_tag, '');
    // 이렇게 하면 이미지 정보가 아예 없어지네
    setEditorContents(boardContents);
    console.log(boardContents);
  };

  // 단일 게시글 정보 구조 정의 및 초기화
  const [board, setBoard] = useState({
    boardTitle: '',
    boardCategory: '',
    boardContents: '',
    memberId: ''
  });

  // 입력요소와 useState간 데이터 바인딩 적용
  // board 내용을 복사해서 그 안의 name 이름의 키의 값을 value로 바꿔 저장!
  // 리액트에서는 값을 직접 수정하면 안되고 이렇게 복사해서 수정하는 방식을 이용한다.
  const onChangeRegist = (e) => {
    // const { name, value } = e.target;
    setBoard({ ...board, [e.target.name]: e.target.value });
    console.log('등록할내용', board);
  };

  // 이미지제어
  const imageHandler = () => {
    // input file 태그를 만든다.
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    // input.setAttribute('ref', '{fileInput}');
    console.log('input?', input);
    input.click();

    //  input file 태그 onchange
    input.onchange = (e) => {
      const files = e.target.files;
      console.log('files??', files);
      console.log('files모냐', files[0].name);
      let formData = new FormData();
      formData.append('filename', files[0].name);

      for (let key of formData.keys()) {
        console.log('이미지핸들러key', key);
      }

      for (let value of formData.values()) {
        console.log('이미지핸들러value', value);
      }

      // 여기까지 잘 되는데... 여기서 저 formData만 넘길 수 있으면 되는데 ㅠㅠㅠㅠ

      const config = {
        header: { 'content-type': 'multipart/form-data' }
      };

      // 파일등록
      axios
        .post('http://localhost:3005/board/uploads', formData, config)
        .then((result) => {
          console.log('image result', result);
          // 여기서 게시글 번호를 같이 넘겨줘야하는데...
          // 이미지 핸들러가 저장 버튼 누르기 전에 정의되서..흠...
          // 어떻게 가져와야할까?
        })
        .catch((err) => {});
    };
  };

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
        // 이걸쓰면 이미지가 눈에 안보이고... 콘솔에 파일명은 잘 찍히고....
        // handlers: {
        //   image: imageHandler
        // },

        // 이걸쓰면 사진은 눈에 보이는데, 콘솔에 파일명이 안찍히고...
        imageUploader: imageHandler
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
      boardContents: editorContents,
      memberId: board.memberId
    };

    // console.log('formdata있나요?', formData);

    if (newBoard.boardTitle.length === 0 || newBoard.boardContents.length === 0) {
      alert('게시글 제목과 내용을 입력해주세요!');
      return false;
    }
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };

    // axios post
    axios
      .post('http://localhost:3005/board/regist', newBoard, config)
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
        id="editor"
        modules={modules}
        formats={formats}
        value={editorContents}
        style={{ height: '500px' }}
        placeholder={'플레이스 홀더임'}
        // onChange={(content, delta, source, editor) => onChangeContents(editor.getHTML())}
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
