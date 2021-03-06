// 1. 액션 타입 만들기   모듈이름/액션이름
const REGISTER_USER = 'auth/REGISTER_USER'; // 회원가입
const LOGIN_USER = 'auth/LOGIN_USER'; // 로그인
const LOGOUT_USER = 'auth/LOGOUT_USER'; // 로그아웃
const IS_LOGIN = 'auth/IS_LOGIN'; // 로그인 상태
const LOGIN_MEMBERID = 'auth/LOGIN_MEMBERID'; // 로그인 한 멤버아이디 담아놓음

// 2. 액션 생성 함수 만들기
// 외부에서 사용하기 때문에 export
// 액션은 {type:액션타입, payload:다른데이터} 구조를 가진다.
export const registUser = (dataToSubmit) => {
  return {
    type: REGISTER_USER,
    payload: dataToSubmit
  };
};

export const loginUser = (dataToSubmit) => {
  return {
    type: LOGIN_USER,
    payload: dataToSubmit
  };
};

export const loginMemberId = (enterMemberId) => {
  return {
    type: LOGIN_MEMBERID,
    payload: enterMemberId
  };
};

export const logoutUser = (data) => {
  return {
    type: LOGOUT_USER,
    payload: data
  };
};

export const isLogin = (islogin) => {
  return {
    type: IS_LOGIN,
    payload: islogin
  };
};

// 3. show리덕스의 초기 상태 만들기
const initialState = {
  islogin: false, // 로그인여부
  enterMemberId: '', // 로그인한 사용자 아이디
  loginMemberId: ''
};

// 4. 리듀서 함수를 만들기
// 리듀서 함수는 순수 함수여야한다.
//    [같은 입력에 항상 같은 출력 / 내부에 랜덤,비동기X / 파라미터 외의 변수 영향 X]
// const 모듈명 = (초기상태값, action)=>{ // 리듀서 함수 내용 (switch문)}
const auth = (state = { initialState }, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registerSuccess: action.payload
      };
    case LOGIN_USER:
      return {
        ...state,
        loginSucess: action.payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        logoutSuccess: action.payload
      };
    case IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload
      };
    case LOGIN_MEMBERID:
      return {
        ...state,
        loginMemberId: action.payload
      };
    default:
      return state;
  }
};

// //  5. 만든 리듀서 내보내기
export default auth;
