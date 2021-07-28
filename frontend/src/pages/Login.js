import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/auth';

const Login = (props) => {
  const [memberId, setMemberId] = useState('');
  const [pwd, setPwd] = useState('');

  const dispatch = useDispatch();

  // 아이디 입력 onChange 이벤트
  const onIdHandler = (e) => {
    setMemberId(e.currentTarget.value);
  };

  // 비밀번호 입력 onChange 이벤트
  const onPasswordHanlder = (e) => {
    setPwd(e.currentTarget.value);
  };

  // 로그인 폼 이벤트
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // 로그인을 진행하기위해서
    // 첫번째 useDispatch(액션) 을 활용해서 액션을 dispatch해준다
    const body = {
      memberId: memberId,
      pwd: pwd
    };

    // 로그인을 실행하고, 성공하면 메인으로 이동한다.
    dispatch(loginUser(body));
    props.history.push('/');
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
              type="email"
              name="memberId"
              value={memberId}
              onChange={onIdHandler}
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
              value={pwd}
              onChange={onPasswordHanlder}
              placeholder="비밀번호를 입력해주세요."
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ width: '100%', marginBottom: '1rem' }}>
            로그인
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
