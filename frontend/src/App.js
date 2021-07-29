// 라우터
import { Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import Main from './pages/Main';
import Login from './pages/Login';
import Regist from './pages/Regist';
import Search from './pages/Search';
import Contents from './pages/Contents';
import Profile from './pages/Profile';
import BoardList from './pages/Board/BoardList';
import BoardRegist from './pages/Board/BoardRegist';
import BoardView from './pages/Board/BoardView';

// CSS
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isLogin } from './redux/auth';

function App() {
  // useDispatch를 사용해서 로그아웃 액션을 실행한다
  const dispatch = useDispatch();

  // 민아) 7/28, 로그인 상태 체크
  const loginSuccess = useSelector((state) => state.auth.loginSucess);

  useEffect(() => {
    axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
    axios.get('http://localhost:3005/tokenTest').then((result) => {
      console.log('result', result);
      if (result.data.code === '200') {
        dispatch(isLogin(true));
      } else {
        dispatch(isLogin(false));
      }
    });
  }, [loginSuccess]);

  return (
    <>
      {/* Header */}
      <Header />
      {/* Main */}
      <Route path="/" exact component={Main} />

      <Route path="/login" component={Login} />
      <Route path="/regist" component={Regist} />

      <Route path="/search" component={Search} />
      <Route path="/contents/:id" component={Contents} />

      <Route path="/profile" component={Profile} />

      <Route path="/board" component={BoardList} exact />
      <Route path="/board/regist" component={BoardRegist} />
      <Route path="/board/view/:idx" component={BoardView} />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
