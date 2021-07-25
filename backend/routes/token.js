const express = require('express');
const passport = require('passport');

const router = express.Router();

// 토큰 인증 테스트
router.get(
  '/tokenTest',
  // authenticate(사용할인증, 세션사용여부, JWTVerify에서 리턴된 함수)
  passport.authenticate('jwtCheck', { session: false }),
  async (req, res, next) => {
    try {
      console.log('tokenTest 트라이');
      res.json({ result: true, message: '사용자 토큰 인증완료' });
      // next();
    } catch (error) {
      res.json({ result: false, message: '사용자 토큰 인증 실패!' });
      console.log('tokenTest 실패');
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
