import React, { useState } from 'react';
// 리덕스
import { useSelector, useDispatch } from 'react-redux'; // 리덕스 훅스
import { getShowList, resetShowList, isLoading, setCondition } from '../../redux/show'; // 액션생성함수
// react-bootstrap
import { Nav, Navbar, FormControl, Button, Container } from 'react-bootstrap';
// 리액트 라우터
import { useHistory } from 'react-router-dom';
// 커스텀 CSS
import './Header.css';
// 컴포넌트
import SearchModal from '../Modal/SearchModal';
// etc
import axios from 'axios';

const Header = () => {
  // 페이지 이동을 위한 history
  const history = useHistory();
  // 검색 조건 모달의 열림/닫힘을 위한 state
  const [search, setSearch] = useState(false);
  // 서버에 보낼 검색조건을 위한 state
  const condition = useSelector((state) => state.show.condition);

  // 리덕스- 전역 상태
  // 상태 가져오기 = useSelector(state => state.리듀스함수명.상태)
  // dispatch 가져오기
  const showDispatch = useDispatch();

  // input을 변경하는 핸들러
  const handleChangeInput = (e) => {
    // 체크박스 예외처리
    if (e.target.name === 'kidstate') {
      showDispatch(setCondition(e.target.name, e.target.checked));
    } else {
      showDispatch(setCondition(e.target.name, e.target.value));
    }
  };

  // 서버에서 검색 조건 찾아오는 이벤트 핸들러
  // 리덕스 비동기처리 미들웨어를 사용하지 않기 때문에 여기서 비동기 처리를 한 후, 가져온 데이터를 리덕스 상태에 저장한다.
  const handleClickSearchButton = async () => {
    // 현재 들어있는 검색 결과값들 초기화하기
    showDispatch(resetShowList());
    // 현재 상태를 로딩 상태로 설정하기
    showDispatch(isLoading());
    // 검색 결과 페이지로 이동하기
    history.push('/search?page=1');

    // 백엔드에서 리스트 가져오기
    const URL = `http://localhost:3005/show/result`;
    try {
      const result = await axios.post(URL, condition);
      // console.log('데이터가 없는 경우 서버에서는 어떻게 던져줍니까?', result.data.data); // undefined
      const showList = result.data.data ? result.data.data : { msg: '검색 결과가 없습니다' }; // undefined로 넘어올 경우 처리해주기

      // 리덕스 상태에 검색 결과 저장하기
      showDispatch(getShowList(showList));
    } catch (error) {
      // console.log('공연 리스트를 가져오는데 실패했습니다');
      showDispatch(getShowList({ msg: '검색에 실패했습니다..' }));
      return false;
    }
  };

  return (
    <>
      <SearchModal
        search={search}
        setSearch={setSearch}
        condition={condition}
        handleChangeInput={handleChangeInput}
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
              <Nav.Link href="/board" style={{ minWidth: '70px' }} className="text-center">
                게시판
              </Nav.Link>
            </Nav>
            {/* 검색창 */}
            <div className="input-group searchbar">
              <FormControl
                type="search"
                placeholder="공연명을 입력해주세요"
                aria-label="Search"
                name="shprfnm"
                onChange={handleChangeInput}
              />
              <Button className="btn-custom--outline" onClick={() => setSearch(true)}>
                설정
              </Button>
              <Button className="btn-custom" onClick={handleClickSearchButton}>
                검색
              </Button>
            </div>
            {/* 회원가입 / 로그인 */}
            <Nav>
              <Nav.Link href="/login" style={{ minWidth: '70px' }} className="textCenter">
                로그인
              </Nav.Link>
              <Button href="/regist" className=".btn-custom" style={{ minWidth: '90px' }}>
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
