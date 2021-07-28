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
import Review from './pages/Review';
import Profile from './pages/Profile';
import BoardList from './pages/Board/BoardList';
import BoardRegist from './pages/Board/BoardRegist';
import BoardView from './pages/Board/BoardView';

// CSS
import './App.css';

function App() {
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
      <Route path="/review/:id" component={Review} />

      <Route path="/profile" component={Profile} />

      <Route path="/board" component={BoardList} exact />
      <Route path="/board/regist" component={BoardRegist} />
      <Route path="/board/:idx" component={BoardView} />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
