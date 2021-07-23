import './App.css';

// 라우터
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Main from './pages/Main';

function App() {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Main */}
      <Route path='/' exact component={Main} />

      <Route path='/login' />
      <Route path='/regist' />

      <Route path='/search' />
      <Route path='/contents/:id' />
      <Route path='/review/:id' />

      <Route path='/profile' />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
