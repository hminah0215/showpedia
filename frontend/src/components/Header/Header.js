import React, { useState } from 'react';

import { Nav, Navbar, FormControl, Button, Container } from 'react-bootstrap';

// 커스텀 CSS
import './Header.css';

// 컴포넌트
import SearchModal from '../Modal/SearchModal';

const Header = () => {
  // 검색 조건 모달을 위한 state
  const [search, setSearch] = useState(false);
  // 서버에 보낼 검색조건 데이터
  const [condition, setCondition] = useState({
    stdate: '', // 시작날짜
    eddate: '', // 종료날짜
    shprfnm: '', // 공연명
    shcate: '', // 장르
    signgucode: '', // 지역코드
    kidstate: '', // 아동공연여부 - 체크시 on
    prfstate: '' // 공연상태코드
  });

  // 서버에서 검색 조건 찾아오는 이벤트 핸들러
  const handleClickSearchButton = () => {
    console.log('open api에서 리스트를 가져옵니다.');
    // 가져온 데이터는 전역 상태로 관리한다 (리덕스)
  };

  return (
    <>
      <SearchModal
        search={search}
        setSearch={setSearch}
        condition={condition}
        setCondition={setCondition}
      />
      <Navbar expand="md" sticky="top" className="py-3 header">
        <Container>
          {/* 로고 */}
          <Navbar.Brand href="/">
            <img src="/img/logo.png" alt="" height="28" />
          </Navbar.Brand>
          {/* 토글 */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-between">
            {/* 네비게이션 항목들 */}
            <Nav>
              <Nav.Link href="/board" style={{ minWidth: '70px' }} className="textCenter">
                게시판
              </Nav.Link>
            </Nav>
            {/* 검색창 */}
            <div className="input-group searchBar">
              <FormControl type="search" placeholder="공연명을 입력해주세요" aria-label="Search" />
              <Button className="bgColor--outline" onClick={() => setSearch(true)}>
                설정
              </Button>
              <Button className="bgColor" onClick={handleClickSearchButton}>
                검색
              </Button>
            </div>
            {/* 회원가입 / 로그인 */}
            <Nav>
              <Nav.Link href="/login" style={{ minWidth: '70px' }} className="textCenter">
                로그인
              </Nav.Link>
              <Button href="/regist" className="bgColor" style={{ minWidth: '90px' }}>
                회원가입
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
