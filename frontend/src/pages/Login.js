import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../redux/auth';
import KaKaoLogin from 'react-kakao-login';

const Login = () => {
  const [member, setMember] = useState({
    memberId: '',
    pwd: ''
  });

  const history = useHistory();

  const dispatch = useDispatch();

  // onChange 이벤트
  const onChLogin = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  // 로그인 폼 이벤트
  const onSubmitHandler = (e) => {
    e.preventDefault();

    // 로컬 로그인 axios post
    axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
    axios
      .post('http://localhost:3005/login', member)
      .then((result) => {
        console.log('회원로그인===>', result);

        if (result.data.code === 200) {
          // alert('로그인 성공');

          // 로그인이 성공하면 쿠키에 jwt 토큰값을 넣는다.
          document.cookie = 'member=' + result.data.data;
          console.log('로그인 성공, 쿠키' + document.cookie);

          // 로그인 dispatch를 실행하고,  메인으로 이동한다.
          dispatch(loginUser('true'));
          history.push('/');
        } else {
          alert('백엔드 에러 발생 - 로그인 문제');
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <a href="http://localhost:3005/kakao">카카오 로그인</a>
      <div
        style={{
          width: '60%',
          backgroundImage: 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h3 style={{ textAlign: 'center', marginTop: '1rem' }}>Log in</h3>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{ marginTop: '2rem' }}>
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="text"
              name="memberId"
              value={member.memberId}
              onChange={onChLogin}
              placeholder="아이디를 입력해주세요."
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              name="pwd"
              value={member.pwd}
              onChange={onChLogin}
              placeholder="비밀번호를 입력해주세요."
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ width: '100%', marginBottom: '1rem' }}>
            로그인
          </Button>
          {/* cors설정도 하고, 디벨로퍼페이지에서 3000번 포트도 등록했는데 에러발생해서 찾아보니 
          클라이언트에서 rest api 서버로 요청할때는 axios,fetch 등이 아닌 a태그의 href를 사용해야한다고 한다. 
          https://www.inflearn.com/questions/30479 */}
        </Form>
        {/* <KaKaoLogin
          token={'9e8bd5cc80a40d60f3c4a9fbcdab49d3'}
          onSuccess={onKakao}
          style={{ width: '100%', marginBottom: '1rem' }}
        ></KaKaoLogin> */}
        <Button
          variant="warning"
          type="submit"
          style={{ width: '100%', marginBottom: '1rem' }}
          // onSuccess={onKakao}
        >
          <a
            href="http://localhost:3005/kakao"
            style={{ textDecoration: 'none', color: 'black' }}
            // onClick={onKakao}
            // key={'9e8bd5cc80a40d60f3c4a9fbcdab49d3'}
          >
            카카오 로그인
          </a>
        </Button>
      </div>
    </Container>
  );
};

export default Login;
