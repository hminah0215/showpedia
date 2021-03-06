import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 라우터
import { BrowserRouter } from 'react-router-dom';
// 리덕스
import { createStore } from 'redux';
import rootReducer from './redux/index';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // redux devtools
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
