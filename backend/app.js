// 라이브러리 참조
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

// passport 패키지 참조
const passport = require('passport');
const passportConfig = require('./passport');

// 라우터 참조
const authRouter = require('./routes/auth');
const showRouter = require('./routes/show');
const memberRouter = require('./routes/member');
const tokenRouter = require('./routes/token');
const boardRouter = require('./routes/board');
const reviewRouter = require('./routes/review');
const commentsRouter = require('./routes/comments');

// app.js
const app = express();
const PORT = process.env.PORT || 3005;

// dotenv, passport 참조
dotenv.config();
passportConfig();

// cors { origin: true, credentials: true }
// credentials: true, 리액트에서 로그인 구현시 다른도메인에 쿠키를 전송하기 위해서 씀 (react, axios에도 관련 코드 추가)
//  origin: true, 요청주소와 같게! 'http://localhost:3000'
// 참고 ) https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275
app.use(cors({ origin: true, credentials: true }));

// 미들웨어 사용, 라우터 경로 지정하기 전에 있어야 경로에 엑세스한다.
// extended 를 true로 줘야, 리액트에서 첨부판 파일정보를 req.body로 가져올수있다!
// 객체안에 객체를 파싱할 수 있게 하려면 true
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// cookie-parser 사용
app.use(cookieParser());

// 라우터 사용
app.use('/', authRouter);
app.use('/show', showRouter);
app.use('/', memberRouter);
app.use('/', tokenRouter);
app.use('/board', boardRouter);
app.use('/review', reviewRouter);
app.use('/comments', commentsRouter);

// 요청(req 객체)에 passport 설정을 심는 미들웨어
app.use(passport.initialize());

// 시퀄라이즈
const { sequelize } = require('./models/index');
// console.log(sequelize);
// 데이터베이스 연동하기
sequelize
  .sync()
  .then(() => {
    console.log('데이터베이스 연결 완료');
  })
  .catch((err) => {
    console.log(err);
  });

// 라우터 경로 설정

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.msg);
});

// listen
app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 대기 중입니다.`);
});
