// 민아) 7/23 작업, 패스포트
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const jwtCheck = require('./jwtStrategy');

module.exports = () => {
  local();
  kakao();
};
