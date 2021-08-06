import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../redux/auth';

// CSS
import '../lib/styles/Login.css';

// sweetAlert
import Swal from 'sweetalert2';

const Login = () => {
  const [member, setMember] = useState({
    memberId: '',
    pwd: ''
  });

  const history = useHistory();

  const dispatch = useDispatch();

  // onChange 이벤트
  const onChLogin = useCallback((e) => {
    // setMember({ ...member, [e.target.name]: e.target.value });
    setMember((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // 로그인 폼 이벤트
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      // 로컬 로그인 axios post
      axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
      axios
        .post('http://localhost:3005/login', member)
        .then((result) => {
          if (result.data.code === 200) {
            // alert('로그인 성공');

            Swal.fire({
              position: 'top-middle',
              icon: 'success',
              title: '로그인 완료! 반갑습니다 :)',
              showConfirmButton: false,
              timer: 1500
            });

            // 로그인이 성공하면 쿠키에 jwt 토큰값을 넣는다.
            document.cookie = 'member=' + result.data.data;

            // 로그인 dispatch를 실행하고,  메인으로 이동한다.
            dispatch(loginUser('true'));
            history.push('/');
          } else {
            // alert('백엔드 에러 발생 - 로그인 문제');
            Swal.fire('에러발생', '로그인 에러발생, 관리자에게 문의해주세요.', 'question');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [member, dispatch, history]
  );

  return (
    <Container className="my-5 d-flex justify-content-center align-items-center ">
      <div className="login-container">
        <h3 className="login-title">Log in</h3>
        <hr style={{ marginTop: '0' }} />
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="text"
              name="memberId"
              value={member.memberId}
              onChange={onChLogin}
              placeholder="아이디를 입력해주세요."
            />
            <Form.Text className="text-muted">
              회원가입시 등록한 아이디는 이메일 포맷입니다.
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

          <Button type="submit" className="login-btn">
            로그인
          </Button>
          <Button href="http://localhost:3005/kakao" type="submit" className="btn-yellow login-btn">
            카카오 로그인
            {/* cors설정도 하고, 디벨로퍼페이지에서 3000번 포트도 등록했는데 에러발생해서 찾아보니 
          클라이언트에서 rest api 서버로 요청할때는 axios,fetch 등이 아닌 a태그의 href를 사용해야한다고 한다. 
          https://www.inflearn.com/questions/30479 */}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default React.memo(Login);
