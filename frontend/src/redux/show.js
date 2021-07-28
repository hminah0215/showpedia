import axios from 'axios';
// [아영] 1. 액션 타입 만들기
const GET_SHOWLIST = 'show/GET_SHOWLIST'; // 모듈이름/액션이름
const RESET_SHOWLIST = 'show/RESET_SHOWLIST';
const LOADING = 'show/LOADING';
const LOADED = 'show/LOADED';
const SET_CONDITION = 'show/SET_CONDITION';
const RESET_CONDITION = 'show/RESET_CONDITION';
const SET_SHOW = 'show/SET_SHOW';

// [아영] 2. 액션 생성 함수 만들기
// 외부에서 사용하기 때문에 export
// 액션은 {type:액션타입, payload:다른데이터} 구조를 가진다.
export const getShowList = (showList) => ({ type: GET_SHOWLIST, payload: showList });
export const resetShowList = () => ({ type: RESET_SHOWLIST });
export const isLoading = () => ({ type: LOADING });
export const isLoaded = () => ({ type: LOADED });
export const setCondition = (key, value) => ({
  type: SET_CONDITION,
  payload: {
    key,
    value
  }
});
export const resetCondition = () => ({ type: RESET_CONDITION });
export const setShow = (show) => ({ type: SET_SHOW, payload: show });

// [아영] 3. show리덕스의 초기 상태 만들기
const initialState = {
  showList: [], // 공연 리스트는 배열로 넘어오기 때문에, 초기에는 빈 배열
  loading: true,
  condition: {
    stdate: '', // 시작날짜
    eddate: '', // 종료날짜
    shprfnm: '', // 공연명
    shcate: '', // 장르
    signgucode: '', // 지역코드
    kidstate: '', // 아동공연여부 - 체크시 on
    prfstate: '' // 공연상태코드
  },
  show: {
    mt20id: '',
    prfnm: '공연명', // 공연 이름
    prfpdfrom: '공연 시작일', // 공연 시작일
    prfpdto: '공연 종료일', // 공연 종료일
    fcltynm: '공연 장소', // 공연 장소
    prfcast: '배우들', // 배우들
    prfruntime: '공연 시간', // 공연 시간
    pcseguidance: '공연 가격', // 공연 가격
    poster: '', // poster URL
    sty: '줄거리가 없습니다.' // 줄거리
  }
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
        ...state,
        showList: action.payload
      };
    case RESET_SHOWLIST:
      return {
        ...state,
        showList: []
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case LOADED:
      return {
        ...state,
        loading: false
      };
    case SET_CONDITION:
      return {
        ...state,
        condition: {
          ...state.condition,
          [action.payload.key]: action.payload.value
        }
      };
    case RESET_CONDITION:
      return {
        ...state,
        condition: {
          stdate: '', // 시작날짜
          eddate: '', // 종료날짜
          shprfnm: '', // 공연명
          shcate: '', // 장르
          signgucode: '', // 지역코드
          kidstate: '', // 아동공연여부 - 체크시 on
          prfstate: '' // 공연상태코드
        }
      };
    case SET_SHOW:
      return {
        ...state,
        show: {
          mt20id: action.payload.mt20id,
          prfnm: action.payload.prfnm, // 공연 이름
          prfpdfrom: action.payload.prfpdfrom, // 공연 시작일
          prfpdto: action.payload.prfpdto, // 공연 종료일
          fcltynm: action.payload.fcltynm, // 공연 장소
          prfcast: action.payload.prfcast, // 배우들
          prfruntime: action.payload.prfruntime, // 공연 시간
          pcseguidance: action.payload.pcseguidance, // 공연 가격
          poster: action.payload.poster, // poster URL
          sty: action.payload.sty[0] !== ' ' ? action.payload.sty : '줄거리가 없습니다'
        }
      };
    default:
      return state;
  }
};

// [아영] 5. 만든 리듀서 내보내기
export default show;
