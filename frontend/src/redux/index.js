// [아영] 만든 리듀서 함수들을 하나로 합쳐줘야한다.
// index.js - 만든 리듀서 함수들을 하나로 합쳐주는 루트 리듀서

import { combineReducers } from 'redux';
// 리듀서 참조
import show from './show';

// 리듀서들 병합
const rootReducer = combineReducers({
  show
});

export default rootReducer;
