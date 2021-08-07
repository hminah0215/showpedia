import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registUser } from '../redux/auth';
// 부트스트랩
import { Button, Container, Form, Image } from 'react-bootstrap';
// CSS
import '../lib/styles/Regist.css';
// etc
import axios from 'axios';
// sweetAlert
import Swal from 'sweetalert2';

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
  const onIdHandler = useCallback((e) => {
    setMemberId(e.target.value);
  }, []);
  const onNickHandler = useCallback((e) => {
    setNickname(e.target.value);
  }, []);
  const onPasswordHanlder = useCallback((e) => {
    setPwd(e.target.value);
  }, []);
  const onConfirmPasswordHandler = useCallback((e) => {
    setConfirmPasword(e.target.value);
  }, []);

  // 프로필 이미지를 저장하는 이벤트 핸들러
  const onPhotoHandler = useCallback((e) => {
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
  }, []);

  // 아이디 중복확인 버튼 이벤트
  // [아영] useCallback의 의존성을 꼭 넣어주어야한다.
  // 그렇지 않으면 memberId 값이 바뀌어 새로운 처리(중복아이디 검색)을 해야하지만
  // 해당 값을 변경하지 않고 처리를 하기 때문에 제대로 반영이 되지않는다.
  const IdDBcheck = useCallback(
    (e) => {
      e.preventDefault();

      const checkData = {
        memberId: memberId
      };

      axios
        .post('http://localhost:3005/checkId', checkData)
        .then((result) => {
          const emailInput = document.getElementById('formBasicEmail').value;

          if (emailInput.length > 0 && result.data.data === false) {
            // 중복된 아이디가 있으면 false 값이 넘어옴.
            return setCheckIdError(true); // 중복체크 여부를 표시함
          } else if (emailInput.length > 0 && result.data.data === true) {
            // 중복된 아이디가 없으면 setCheckIdError(false)...
            return setCheckIdError(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [memberId]
  );

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
        if (result.data.code === 200 && pwd === ConfirmPasword) {
          setPasswordError(false);
          dispatch(registUser(registerUser));
          // alert('가입이 정상적으로 완료되었습니다');
          Swal.fire({
            icon: 'success',
            title: '가입완료!',
            text: 'showPedia와 함께 해주셔서 감사합니다 :)'
          });
          history.push('/login');
        } else {
          Swal.fire('에러발생', '회원가입 에러발생, 관리자에게 문의해주세요.', 'question');
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
                <div className="checktext">아이디 중복확인 버튼을 눌러주세요</div>
              </>
            ) : checkIdError ? (
              <>
                <div className="checktext" style={{ color: 'red' }}>
                  중복된 아이디 입니다.다른아이디를 입력해주세요.
                </div>
              </>
            ) : (
              <>
                <div className="checktext" style={{ color: 'blue' }}>
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
              <div className="checktext" style={{ color: 'red' }}>
                비밀번호가 일치하지 않습니다.
              </div>
            ) : (
              <div className="checktext" style={{ color: 'blue' }}>
                비밀번호가 일치합니다.
              </div>
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
              accept="image/*"
              onChange={onPhotoHandler}
            />
          </Form.Group>
          {/* 프로필 이미지 미리보기 */}
          <div className="regist-profile mb-3">
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

export default React.memo(Regist);
// export default Regist;
