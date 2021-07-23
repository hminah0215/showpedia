import React from 'react';

import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ background: '#495057' }}>
      <Container>
        <ul>
          <li>
            회사소개 | 쇼핑가이드 | 개인정보보호정책 | 이용약관 출처:
            (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)
          </li>
          <li>깃허브</li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
