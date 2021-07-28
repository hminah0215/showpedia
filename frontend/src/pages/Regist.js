import React, { useState } from 'react';
import { Button, Col, Container, Form, Image } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { registUser, checkId } from '../redux/auth';

const Regist = (props) => {
  const [memberId, setMemberId] = useState('');
  const [pwd, setPwd] = useState('');
  const [nickName, setNickname] = useState('');
  const [ConfirmPasword, setConfirmPasword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  // 아이디 중복체크, 비밀번호 입력확인
  // true 상태여야 회원가입이 가능하다.
  const [checkId, setCheckId] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // const [idError, setIdError] = useState('');

  // 디스패치 사용
  const dispatch = useDispatch();

  // id / nickName / 비밀번호 / 비밀번호 확인/ 프로필이미지 onChange이벤트
  const onIdHandler = (e) => {
    setMemberId(e.target.value);
    console.log('setMemberId');
  };
  const onNickHandler = (e) => {
    setNickname(e.target.value);
    console.log('setNickname');
  };
  const onPasswordHanlder = (e) => {
    setPwd(e.target.value);
    console.log('setPwd');
  };
  const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.target.value);
    console.log('setConfirmPasword');
  };
  const onPhotoHandler = (e) => {
    setProfilePhoto(e.target.value);
    console.log('setProfilePhoto');
  };

  // 회원가입 form 이벤트
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (memberId !== checkId) {
      return setCheckId(true);
    }

    if (pwd !== ConfirmPasword) {
      return setPasswordError(true);
    }

    if (pwd === ConfirmPasword) {
      let body = {
        memberId: memberId,
        nickName: nickName,
        pwd: pwd,
        profilePhoto: profilePhoto
      };

      dispatch(registUser(body));

      alert('가입이 정상적으로 완료되었습니다');
      props.history.push('/login');
    } else {
      alert('비밀번호가 일치하지 않습니다');
    }
  };
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
        <Form onSubmit={onSubmitHandler}>
          <h3 style={{ textAlign: 'center', marginTop: '1rem' }}>회원가입</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{ marginTop: '2rem' }}>
            <Form.Label>이메일(아이디)</Form.Label>
            <Form.Control
              type="email"
              value={memberId}
              onChange={onIdHandler}
              placeholder="name@example.com"
            />
            {checkId && (
              <div style={{ color: 'red' }}> 중복된 아이디 입니다.다른아이디를 입력해주세요.</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              value={pwd}
              onChange={onPasswordHanlder}
              placeholder="비밀번호를 입력해주세요."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              value={ConfirmPasword}
              onChange={onConfirmPasswordHandler}
              placeholder="비밀번호를 다시 입력해주세요"
            />
            {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              type="text"
              value={nickName}
              onChange={onNickHandler}
              placeholder="사용하실 닉네임을 입력해주세요."
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>프로필 이미지</Form.Label>
            <Form.Control type="file" value={profilePhoto} onChange={onPhotoHandler} />
          </Form.Group>

          {/* 프로필이미지로 선택한 사진을 보여주고 싶음.. 이건 좀더 생각해봐야겠음  */}
          <Col xs={6} md={4}>
            <Image src="profilePhoto/171x180" rounded />
          </Col>

          <Button variant="primary" type="submit" style={{ width: '100%', marginBottom: '1rem' }}>
            회원가입
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Regist;
