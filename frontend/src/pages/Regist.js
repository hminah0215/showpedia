import React from 'react';
import { Container } from 'react-bootstrap';

import RegisterForm from '../components/auth/registerForm';

const Regist = () => {
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
        <RegisterForm></RegisterForm>
      </div>
    </Container>
  );
};

export default Regist;
