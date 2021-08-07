const e = require('express');
const passport = require('passport');

// 민아) 7/23, 로그인 여부 파악 미들웨어 작성
// 로그인 한건지
exports.isLoggedIn = (req, res, next) => {
  // 쿠키에 사용자 인증 토큰을 저장하니까, 쿠키에 member 라는 이름의 값이 있는지를 확인
  // 쿠키에 있는 member값을 req객체의 user에 담고 있으면 login상태, 없으면 로그인필요

  if (req.isAuthenticated()) {
    next();
  } else {
    // 로그인 되지 않았으면 되지않았음을 리턴한다
    return res.json({
      code: '400',
      msg: '유저가없거나 인증이 실패하면 에러발생'
    });
  }
};

// 민아) 7/23, 로그인 여부 파악 미들웨어 작성
// 로그인 안한 상태인지
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};

// 민아) 7/25, 토큰인증 라우터 미들웨어로 변경
// 토큰인증 테스트 미들웨어
exports.tokenTest = async (req, res, next) => {
  passport.authenticate('jwtCheck', { session: false }, async (authError, member, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    // 테스트 코드
    // 유저가 없거나 인증이 실패하면 에러 발생
    if (!member || authError) {
      return res.json({
        code: '400',
        msg: '유저가없거나 인증이 실패하면 에러발생-tokenMiddleWare'
      });
    }

    // 토큰인증확인이 끝나면, req.user에 현재 로그인한 멤버 정보를 넘긴다.
    // 다음 라우터에게 전달하는 용도!
    req.user = member.dataValues;

    next();
  })(req, res, next);
};
