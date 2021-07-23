import React from 'react';

import { Nav, Navbar, FormControl, Button, Container } from 'react-bootstrap';

// 커스텀 CSS
import './Header.css';

const Header = () => {
  return (
    <Navbar expand='md' sticky='top' className='py-3 header'>
      <Container>
        {/* 로고 */}
        <Navbar.Brand href='/'>
          <img src='/img/logo.png' alt='' height='28' />
        </Navbar.Brand>
        {/* 토글 */}
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll' className='justify-content-between'>
          {/* 네비게이션 항목들 */}
          <Nav>
            <Nav.Link
              href='/board'
              style={{ minWidth: '70px' }}
              className='textCenter'
            >
              게시판
            </Nav.Link>
          </Nav>
          {/* 검색창 */}
          <div className='input-group searchBar'>
            <FormControl
              type='search'
              placeholder='공연명을 입력해주세요'
              aria-label='Search'
            />
            <Button className='bgColor--outline'>설정</Button>
            <Button className='bgColor'>검색</Button>
          </div>
          {/* 회원가입 / 로그인 */}
          <Nav>
            <Nav.Link
              href='/login'
              style={{ minWidth: '70px' }}
              className='textCenter'
            >
              로그인
            </Nav.Link>
            <Button
              href='/regist'
              className='bgColor'
              style={{ minWidth: '90px' }}
            >
              회원가입
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
