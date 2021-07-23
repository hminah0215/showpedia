// 민아) 7/23 작업, 패스포트
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");

module.exports = () => {
  local();
  kakao();
};
