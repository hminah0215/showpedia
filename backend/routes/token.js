const express = require('express');
const passport = require('passport');

const router = express.Router();

// 토큰 인증 테스트
router.get(
  '/tokenTest',
  // authenticate(사용할인증, 세션사용여부, JWTVerify에서 리턴된 함수)
  async (req, res, next) => {
    passport.authenticate('jwtCheck', { session: false }, async (authError, member, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }

      // 유저가 없거나 인증이 실패하면 에러 발생
      if (!member || authError) {
        return res.json({
          msg: '유저가없거나 인증이 실패하면 에러발생'
        });
      }
      req.user = member.dataValues;
      res.json({
        msg: '인증 성공',
        data: req.user
      });
    })(req, res, next);
  }
);

module.exports = router;
