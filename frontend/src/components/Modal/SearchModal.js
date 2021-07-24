import React, { useState } from 'react';

// react-bootstrap
import { Row, Col, Modal, Form, Container, Button } from 'react-bootstrap';

const SearchModal = ({ search, setSearch, condition, setCondition }) => {
  // input 값의 변화를 다루는 이벤트 핸들러
  const onChangeInput = (e) => {
    // 체크박스 예외처리
    if (e.target.name === 'kidstate') {
      setCondition({
        ...condition,
        [e.target.name]: e.target.checked
      });
    } else {
      setCondition({
        ...condition,
        [e.target.name]: e.target.value
      });
    }
  };

  // 저장 버튼을 누르지 않고 모달창이 닫혔을 때,
  // 검색 조건 초기화
  const onClose = () => {
    setCondition({
      stdate: '', // 시작날짜
      eddate: '', // 종료날짜
      shprfnm: '', // 공연명
      shcate: '', // 장르
      signgucode: '', // 지역코드
      kidstate: false, // 아동공연여부 - 체크시 on
      prfstate: '' // 공연상태코드
    });
    setSearch(false);
    console.log('닫힙니다.');
  };

  // 리셋 버튼 이벤트 핸들러
  const onReset = () => {
    setCondition({
      stdate: '', // 시작날짜
      eddate: '', // 종료날짜
      shprfnm: '', // 공연명
      shcate: '', // 장르
      signgucode: '', // 지역코드
      kidstate: false, // 아동공연여부 - 체크시 on
      prfstate: '' // 공연상태코드
    });

    console.log(condition);
  };

  // 검색 조건 저장하기
  const onSave = () => {
    setSearch(false);
    console.log('닫힙니다.');
  };

  return (
    <>
      <Modal size="lg" show={search} onHide={onClose} aria-labelledby="modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="modal-sizes-title-lg" style={{ color: '#6741d9' }}>
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
                  required
                  type="date"
                  name="stdate"
                  value={condition.stdate}
                  onChange={onChangeInput}
                />
              </Form.Group>
              <Form.Group as={Col} lg="4" md="6" controlId="eddate" className="mt-3">
                <Form.Label>* 종료 날짜</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="eddate"
                  value={condition.eddate}
                  onChange={onChangeInput}
                />
              </Form.Group>

              {/* 장르 */}
              <Form.Group as={Col} lg="4" md="6" controlId="shcate" className="mt-3">
                <Form.Label>장르</Form.Label>
                <Form.Select
                  aria-label="장르"
                  value={condition.shcate}
                  name="shcate"
                  onChange={onChangeInput}
                >
                  <option value="reset">장르를 선택하세요</option>
                  <option value="AAAA">연극</option>
                  <option value="AAAB">뮤지컬</option>
                  <option value="BBBA">무용</option>
                  <option value="CCCA">클래식</option>
                  <option value="CCCB">오페라</option>
                  <option value="CCCC">국악</option>
                  <option value="EEEA">복합</option>
                </Form.Select>
              </Form.Group>

              {/* 지역 선택 */}
              <Form.Group as={Col} lg="4" md="6" controlId="signgucode" className="mt-3">
                <Form.Label>지역</Form.Label>
                <Form.Select
                  aria-label="지역시도"
                  name="signgucode"
                  value={condition.signgucode}
                  onChange={onChangeInput}
                >
                  <option>--시 도--</option>
                  <option value="11">서울특별시</option>
                  <option value="26">부산광역시</option>
                  <option value="27">대구광역시</option>
                  <option value="28">인천광역시</option>
                  <option value="29">광주광역시</option>
                  <option value="30">대전광역시</option>
                  <option value="31">울산광역시</option>
                  <option value="36">세종특별자치시</option>
                  <option value="41">경기도</option>
                  <option value="42">강원도</option>
                  <option value="43">충청북도</option>
                  <option value="44">충청남도</option>
                  <option value="45">전라북도</option>
                  <option value="46">전라남도</option>
                  <option value="47">경상북도</option>
                  <option value="48">경상남도</option>
                  <option value="50">제주특별자치도</option>
                </Form.Select>
              </Form.Group>

              {/* 아동공연 여부 체크 */}
              <Form.Group as={Col} lg="4" md="4" xs="6" controlId="kidstate" className="mt-3">
                {/* <Form.Label>아동용 공연</Form.Label>
                <Form.Check name='kidstate' className='' /> */}
                <label>
                  <p style={{ marginBottom: '8px' }}>아동용 공연</p>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="kidstate"
                    name="kidstate"
                    onChange={onChangeInput}
                    checked={condition.kidstate}
                  />
                  <label className="btn btn-outline-secondary " htmlFor="kidstate">
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
                  onChange={onChangeInput}
                >
                  <option>----</option>
                  <option value="01">공연예정</option>
                  <option value="02">공연중</option>
                  <option value="03">공연완료</option>
                </Form.Select>
              </Form.Group>

              {/* 설정 저장 버튼 */}
              <Col lg="8">
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3 py-2 bgColor"
                  style={{ width: '100%' }}
                  onClick={onSave}
                >
                  설정 저장
                </Button>
              </Col>

              {/* 리셋 버튼 */}
              <Col lg="4">
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3 py-2 bgColor--outline"
                  style={{ width: '100%' }}
                  onClick={onReset}
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
