import React from 'react';
import { Container } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';

// 에러를 나타내는 컴포넌트
const NotFound = ({ msg }) => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <QuestionCircle className="m-4" size={96} color="#dee2e6" />
      <span className="pb-2">{msg}</span>
    </Container>
  );
};

export default NotFound;
