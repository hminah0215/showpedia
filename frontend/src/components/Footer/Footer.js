import React from 'react';

// custom CSS
import './Footer.css';
// bootstrap
import { Container } from 'react-bootstrap';
// react-bootstrap-icon
import { Github } from 'react-bootstrap-icons';

const Footer = () => {
  return (
    <footer className='footer py-5'>
      <Container className=' d-flex flex-column '>
        <p>
          <span style={{ fontWeight: 'bold' }}>공연 openAPI 출처</span> -
          (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)
        </p>
        <p>
          레포지토리 |&nbsp;
          <a href='https://github.com/hminah0215/showpedia'>
            <Github size={20} color='white' />
          </a>
        </p>
        <div>
          연락처 | 안아영&nbsp;
          <a href='https://github.com/12Ahn22'>
            <Github size={20} color='white' />
          </a>
          &nbsp; | 현민아 &nbsp;
          <a href='https://github.com/hminah0215'>
            <Github size={20} color='white' />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
