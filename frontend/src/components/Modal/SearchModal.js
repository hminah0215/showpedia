// 리액트, 리덕스
import React, { createRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCondition } from '../../redux/show';
// react-bootstrap
import { Row, Col, Modal, Form, Container, Button } from 'react-bootstrap';

/*
[prop]
  [이름] - [부모 컴포넌트] / [설명]
  search - [header.js] / 검색 모달의 열림닫힘 여부
  setSearch - [header.js] / search의 set함수
  handleChangeInput - [header.js] / 검색 조건 상태 변화 저장 함수
*/
const SearchModal = ({ search, setSearch, handleChangeInput }) => {
  // 검색 조건 state
  const condition = useSelector((state) => state.show.condition);
  // 디스패치
  const showDispatch = useDispatch();

  // 아동용 체크박스를 위한 ref
  const checkRef = createRef();

  // 유효성 검사를 위한 ref
  const stdateRef = createRef();
  const eddateRef = createRef();

  // 체크박스 버튼 확인을 위한 토글 액션
  const handleClickActive = useCallback((e) => {
    e.target.classList.toggle('active');
  }, []);

  // 저장 버튼을 누르지 않고 모달창이 닫혔을 때,
  // 검색 조건 초기화
  const handleClickOutter = () => {
    showDispatch(resetCondition());
    // 체크박스 버튼 active 삭제
    checkRef.current.classList.remove('active');
    setSearch(false);
  };

  // 리셋 버튼 이벤트 핸들러
  const handleClickResetButton = () => {
    // 체크박스 버튼 active 삭제
    checkRef.current.classList.remove('active');
    showDispatch(resetCondition());
  };

  // 검색 조건 저장
  const handleClickSaveButton = () => {
    // 필수 요청 변수- 유효성 검사
    if (!condition.stdate) {
      alert('시작 날짜를 입력하세요');
      stdateRef.current.focus();
      return;
    }
    if (!condition.eddate) {
      alert('종료 날짜를 입력하세요');
      eddateRef.current.focus();
      return;
    }
    // 모달 닫기
    setSearch(false);
  };

  // const handleClickActive = (e) => {
  //   e.target.classList.toggle('active');
  // };

  // 장르 코드
  const genre = [
    { title: '연극', code: 'AAAA' },
    { title: '뮤지컬', code: 'AAAB' },
    { title: '무용', code: 'BBBA' },
    { title: '클래식', code: 'CCCA' },
    { title: '오페라', code: 'CCCB' },
    { title: '국악', code: 'CCCC' },
    { title: '복합', code: 'EEEA' }
  ];

  // 지역 코드
  const area = [
    { title: '서울특별시', code: '11' },
    { title: '부산광역시', code: '26' },
    { title: '대구광역시', code: '27' },
    { title: '인천광역시', code: '28' },
    { title: '광주광역시', code: '29' },
    { title: '대전광역시', code: '30' },
    { title: '울산광역시', code: '31' },
    { title: '세종특별자치시', code: '36' },
    { title: '경기도', code: '41' },
    { title: '강원도', code: '42' },
    { title: '충청북도', code: '43' },
    { title: '충청남도', code: '44' },
    { title: '전라북도', code: '45' },
    { title: '전라남도', code: '46' },
    { title: '경상북도', code: '47' },
    { title: '경상남도', code: '48' },
    { title: '제주특별자치도', code: '50' }
  ];

  return (
    <>
      <Modal size="lg" show={search} onHide={handleClickOutter} aria-labelledby="modalTitle">
        <Modal.Header closeButton>
          <Modal.Title id="modalTitle" className="main-title--secondary">
            검색 조건
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="show-grid">
          <Container>
            <Row>
              {/* 공연 시작&종료 날짜 */}
              <Form.Group as={Col} lg="4" md="6" controlId="stdate" className="mt-3">
                <Form.Label>* 시작 날짜</Form.Label>
                <Form.Control
                  ref={stdateRef}
                  required
                  type="date"
                  name="stdate"
                  value={condition.stdate}
                  onChange={handleChangeInput}
                />
              </Form.Group>
              <Form.Group as={Col} lg="4" md="6" controlId="eddate" className="mt-3">
                <Form.Label>* 종료 날짜</Form.Label>
                <Form.Control
                  ref={eddateRef}
                  required
                  type="date"
                  name="eddate"
                  value={condition.eddate}
                  onChange={handleChangeInput}
                />
              </Form.Group>

              {/* 장르 */}
              <Form.Group as={Col} lg="4" md="6" controlId="shcate" className="mt-3">
                <Form.Label>장르</Form.Label>
                <Form.Select
                  aria-label="장르"
                  value={condition.shcate}
                  name="shcate"
                  onChange={handleChangeInput}
                >
                  <option value="">장르를 선택하세요</option>
                  {genre.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* 지역 선택 */}
              <Form.Group as={Col} lg="4" md="6" controlId="signgucode" className="mt-3">
                <Form.Label>지역</Form.Label>
                <Form.Select
                  aria-label="지역시도"
                  name="signgucode"
                  value={condition.signgucode}
                  onChange={handleChangeInput}
                >
                  <option value="">--시 도--</option>
                  {area.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* 아동공연 여부 체크 */}
              <Form.Group as={Col} lg="4" md="4" xs="6" controlId="kidstate" className="mt-3">
                {/* <Form.Label>아동용 공연</Form.Label>
                <Form.Check name='kidstate' className='' /> */}
                <label>
                  <p className="mb-2">아동용 공연</p>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="kidstate"
                    name="kidstate"
                    onChange={handleChangeInput}
                    checked={condition.kidstate}
                  />
                  <label
                    ref={checkRef}
                    className="btn btn-custom--outline"
                    onClick={handleClickActive}
                    htmlFor="kidstate"
                  >
                    아동용 공연
                  </label>
                  <br />
                </label>
              </Form.Group>

              {/* 공연 상태 */}
              <Form.Group as={Col} lg="4" md="4" xs="6" controlId="prfstate" className="mt-3">
                <Form.Label>공연 상태</Form.Label>
                <Form.Select
                  aria-label="공연 상태"
                  name="prfstate"
                  value={condition.prfstate}
                  onChange={handleChangeInput}
                >
                  <option value="">----</option>
                  <option value="01">공연예정</option>
                  <option value="02">공연중</option>
                  <option value="03">공연완료</option>
                </Form.Select>
              </Form.Group>

              {/* 설정 저장 버튼 */}
              <Col lg="8">
                <Button
                  type="submit"
                  className="mt-3 py-2 btn-violet"
                  style={{ width: '100%' }}
                  onClick={handleClickSaveButton}
                >
                  설정 저장
                </Button>
              </Col>

              {/* 리셋 버튼 */}
              <Col lg="4">
                <Button
                  type="submit"
                  className="mt-3 py-2 btn-violet--outline"
                  style={{ width: '100%' }}
                  onClick={handleClickResetButton}
                >
                  리셋
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SearchModal;
// export default React.memo(SearchModal);
