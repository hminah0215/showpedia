// 1. 액션 타입 만들기
const CHANGE_FIELD = 'auth/CHANGE_FIELD'; // 모듈이름/액션이름
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// 2. 액션 생성 함수 만들기
// 외부에서 사용하기 때문에 export
// 액션은 {type:액션타입, payload:다른데이터} 구조를 가진다.
export const changeField = ({ form, key, value }) => ({ type: CHANGE_FIELD });

// 3. show리덕스의 초기 상태 만들기
const initialState = {};

// 4. 리듀서 함수를 만들기
// 리듀서 함수는 순수 함수여야한다.
//    [같은 입력에 항상 같은 출력 / 내부에 랜덤,비동기X / 파라미터 외의 변수 영향 X]
// const 모듈명 = (초기상태값, action)=>{ // 리듀서 함수 내용 (switch문)}
const auth = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      return {
        ...state
      };
    default:
      return state;
  }
};

//  5. 만든 리듀서 내보내기
export default auth;
