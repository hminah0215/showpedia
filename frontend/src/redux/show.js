// [아영] 1. 액션 타입 만들기
const GET_SHOWLIST = 'show/GET_SHOWLIST'; // 모듈이름/액션이름

// [아영] 2. 액션 생성 함수 만들기
// 외부에서 사용하기 때문에 export
// 액션은 {type:액션타입, payload:다른데이터} 구조를 가진다.
export const getShowList = (showList) => ({ type: GET_SHOWLIST, payload: showList });

// [아영] 3. show리덕스의 초기 상태 만들기
const initialState = {
  showList: [] // 공연 리스트는 배열로 넘어오기 때문에, 초기에는 빈 배열
};

// [아영] 4. 리듀서 함수를 만들기
// 리듀서 함수는 순수 함수여야한다.
//    [같은 입력에 항상 같은 출력 / 내부에 랜덤,비동기X / 파라미터 외의 변수 영향 X]
// const 모듈명 = (초기상태값, action)=>{ // 리듀서 함수 내용 (switch문)}
const show = (state = initialState, action) => {
  // action의 type으로 어떤 행동을 할 지 구분
  switch (action.type) {
    case GET_SHOWLIST:
      return {
        showList: action.payload
      };

    // default에 꼭 retrun state를 써주어야한다.
    default:
      return state;
  }
};

// [아영] 5. 만든 리듀서 내보내기
export default show;
