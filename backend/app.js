// 라이브러리 참조
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

// app.js
const app = express();
const PORT = process.env.PORT || 3005;
dotenv.config();

// 라우터 참조

// 미들웨어 사용
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 시퀄라이즈
const { sequelize } = require("./models/index");
// console.log(sequelize);
// 데이터베이스 연동하기
sequelize
  .sync()
  .then(() => {
    console.log("데이터베이스 연결 완료");
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
