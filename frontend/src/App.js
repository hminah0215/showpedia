import './App.css';

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
import Board from './pages/Board';
import BoardPost from './pages/BoardPost';

function App() {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Main */}
      <Route path='/' exact component={Main} />

      <Route path='/login' component={Login} />
      <Route path='/regist' component={Regist} />

      <Route path='/search' component={Search} />
      <Route path='/contents/:id' component={Contents} />
      <Route path='/review/:id' component={Review} />

      <Route path='/profile' component={Profile} />

      <Route path='/board' component={Board} exact />
      <Route path='/board/:id' component={BoardPost} />
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
