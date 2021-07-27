import React from 'react';
import { Form, Button } from 'react-bootstrap';

/* 회원가입 또는 로그인 폼을 보여줌 */
const loginForm = () => {
  return (
    <Form>
      <h3 style={{ textAlign: 'center', marginTop: '1rem' }}>Log in</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail" style={{ marginTop: '2rem' }}>
        <Form.Label>이메일</Form.Label>
        <Form.Control type="email" placeholder="아이디를 입력해주세요." />
        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control type="password" placeholder="비밀번호를 입력해주세요." />
      </Form.Group>

      <Button variant="primary" type="submit" style={{ width: '100%', marginBottom: '1rem' }}>
        로그인
      </Button>

      <Button variant="warning" type="submit" style={{ width: '100%', marginBottom: '1rem' }}>
        카카오 로그인
      </Button>
      <hr />
      <Button variant="link" className="btnSign" style={{ width: '100%', marginBottom: '1rem' }}>
        회원가입
      </Button>
    </Form>
  );
};

export default loginForm;
