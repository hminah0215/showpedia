const express = require('express');
const passport = require('passport');

const router = express.Router();

// 토큰 인증 테스트를 미들웨어로 만들어 놔서 이건 쓸 필요없음
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
          code: '400',
          msg: '유저가없거나 인증이 실패하면 에러발생'
        });
      }

      // 클라이언트에서 받은 정보를 저장하는 용도
      req.user = member.dataValues;

      console.log('토큰테스트', req.user.memberId);
      res.json({
        code: '200',
        msg: '인증성공',
        data: req.user.memberId
      });
    })(req, res, next);
  }
);

module.exports = router;
