import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registUser } from '../redux/auth';
// 부트스트랩
import { Button, Col, Container, Form, Image } from 'react-bootstrap';
// CSS
import '../lib/styles/Regist.css';
// etc
import axios from 'axios';

// 민아) 7/28, 회원가입
const Regist = () => {
  // 폼 내의 각 입력값을 위한 useState
  const [memberId, setMemberId] = useState('');
  const [pwd, setPwd] = useState('');
  const [nickName, setNickname] = useState('');
  const [ConfirmPasword, setConfirmPasword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  // 아이디 중복체크, 비밀번호 입력확인
  // true 상태여야 회원가입이 가능하다.
  const [checkIdError, setCheckIdError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);

  // 디스패치 사용
  const dispatch = useDispatch();

  // 히스토리
  const history = useHistory();

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

  // 프로필 이미지를 저장하는 이벤트 핸들러
  const onPhotoHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('profilePhoto', e.target.files[0]);

    axios
      .post('http://localhost:3005/uploadProfile', formData, {
        header: { 'content-type': 'multipart/form-data' }
      })
      .then((result) => {
        const IMG_URL = result.data.url;
        setProfilePhoto(`${IMG_URL}`);
      })
      .catch((err) => {});
  };

  // 아이디 중복확인 버튼 이벤트
  const IdDBcheck = (e) => {
    e.preventDefault();

    const checkData = {
      memberId: memberId
    };

    axios
      .post('http://localhost:3005/checkId', checkData)
      .then((result) => {
        console.log('아이디중복체크result', result);

        const emailInput = document.getElementById('formBasicEmail').value;
        console.log('emailInput', emailInput);

        if (emailInput.length > 0 && result.data.data === false) {
          // 중복된 아이디가 있으면 false 값이 넘어옴.
          return setCheckIdError(true); // 중복체크 여부를 표시함
        } else if (emailInput.length > 0 && result.data.data === true) {
          // 중복된 아이디가 없으면 setCheckIdError(false)...
          // useState 정의할때 디폴트 값을 false로 줬는데 그냥 else로 하면
          // 아이디체크 에러메시지가 제대로 안떠서 else if로 조건 씀
          return setCheckIdError(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 회원가입 form 이벤트
  const onSubmitHandler = (e) => {
    e.preventDefault();

    let registerUser = {
      memberId: memberId,
      nickName: nickName,
      pwd: pwd,
      profilePhoto: profilePhoto
    };

    // 중복된 아이디고, 비밀번호 확인도 틀리면 password 에러메시지도 떠야하는데 왜 안뜨나???
    // 비밀번호가 틀렸다는 것은 뜬다.
    if (pwd !== ConfirmPasword) {
      return setPasswordError(true);
    }

    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };

    axios
      .post('http://localhost:3005/regist', registerUser, config)
      .then((result) => {
        console.log('회원가입===>', result);

        // pwd가 비밀번호 확인과 같고, result data code가 200이면 dispatch실행
        // 회원가입 리덕스로 만드는게 필요했을까?? 하는 의문...
        if (result.data.code === 200 && pwd === ConfirmPasword) {
          setPasswordError(false);
          dispatch(registUser(registerUser));
          alert('가입이 정상적으로 완료되었습니다');
          history.push('/login');
        } else {
          alert('회원가입 실패 - 관리자에게 문의하세요.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container className="my-5 container d-flex flex-column justify-content-center align-items-center">
      <div className="regist-container">
        <Form onSubmit={onSubmitHandler}>
          {/* title */}
          <h3 className="regist-title">회원가입</h3>
          <hr style={{ marginTop: '0' }} />
          {/* input */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일(아이디)</Form.Label>
            <div className="regist-email-container">
              <Form.Control
                className="email-input"
                type="email"
                value={memberId}
                onChange={onIdHandler}
                placeholder="name@example.com"
              />
              <button className="email-btn btn-custom--outline" onClick={IdDBcheck}>
                중복확인
              </button>
            </div>

            {/* 삼항연산자 중첩사용! */}
            {checkIdError === undefined ? (
              <>
                <div className="email-checktext">아이디 중복확인 버튼을 눌러주세요</div>
              </>
            ) : checkIdError ? (
              <>
                <div className="email-checktext" style={{ color: 'red' }}>
                  중복된 아이디 입니다.다른아이디를 입력해주세요.
                </div>
              </>
            ) : (
              <>
                <div className="email-checktext" style={{ color: 'blue' }}>
                  사용가능한 아이디 입니다.
                </div>
              </>
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

          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              value={ConfirmPasword}
              onChange={onConfirmPasswordHandler}
              placeholder="비밀번호를 다시 입력해주세요"
            />
            {/* 삼항연산자 중첩사용,패스워드체크 전에는 메시지가 없음 */}
            {passwordError === undefined ? (
              ''
            ) : passwordError ? (
              <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
            ) : (
              <div style={{ color: 'blue' }}>비밀번호가 일치합니다.</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNick">
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
            <Form.Control
              type="file"
              // value={profilePhoto}
              name={profilePhoto}
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              onChange={onPhotoHandler}
            />
          </Form.Group>
          {/* 프로필 이미지 미리보기 */}
          <div
            className="regist-profile mb-3"
            // style={{
            //   width: '60%',
            //   display: 'flex',
            //   flexDirection: 'column',
            //   alignItems: 'center'
            // }}
          >
            {profilePhoto ? (
              <div>
                <Image
                  src={profilePhoto}
                  height="171"
                  width="180"
                  style={{ objectFit: 'cover' }}
                  roundedCircle
                />
              </div>
            ) : (
              <div>
                <Image
                  src="https://via.placeholder.com/150"
                  height="171"
                  width="180"
                  roundedCircle
                />
              </div>
            )}
          </div>
          <Button className="regist-btn" type="submit">
            회원가입
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Regist;
