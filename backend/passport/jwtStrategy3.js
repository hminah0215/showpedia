const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const passport = require('passport');
const { Member } = require('../models/');

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) token = req.cookies.member;
  return token;
};

module.exports = () => {
  let JWTConfig = {};
  JWTConfig.jwtFromRequest = cookieExtractor;
  JWTConfig.secretOrKey = process.env.JWT_SECRET;

  passport.use(
    new JWTStrategy(JWTConfig, async (jwtPayload, done) => {
      try {
        // jwtPayload에 유저 정보가 담겨있다.
        // 해당 정보로 유저 식별 로직을 거친다.
        console.log('jwtPayload', jwtPayload);

        // payload의 id값으로 유저의 데이터를 조회한다.
        const member = await Member.findOne({ where: { memberId: jwtPayload.id } });

        // 유효한 유저라면
        if (member) {
          done(null, member);
          return;
        }
        // 유저가 유효하지 않다면
        done(null, false, { message: '인증정보가 유효하지 않습니다.' });
      } catch (error) {
        console.error(error);
        done(error);
      }
    })
  );
};
