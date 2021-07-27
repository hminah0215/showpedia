import React from 'react';
import { Button, Col, Form, Image } from 'react-bootstrap';

const registerForm = () => {
  return (
    <Form>
      <h3 style={{ textAlign: 'center', marginTop: '1rem' }}>회원가입</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail" style={{ marginTop: '2rem' }}>
        <Form.Label>이메일(아이디)</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control type="password" placeholder="비밀번호를 입력해주세요." />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>닉네임</Form.Label>
        <Form.Control type="text" placeholder="사용하실 닉네임을 입력해주세요." />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>프로필 이미지</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      {/* 프로필이미지로 선택한 사진을 보여주고 싶음.. 이건 좀더 생각해봐야겠음  */}
      <Col xs={6} md={4}>
        <Image src="${}/171x180" rounded />
      </Col>

      <Button variant="primary" type="submit" style={{ width: '100%', marginBottom: '1rem' }}>
        회원가입
      </Button>
    </Form>
  );
};

export default registerForm;
