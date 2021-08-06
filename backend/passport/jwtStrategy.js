const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const passport = require('passport');
const { Member } = require('../models/');
const dotenv = require('dotenv');
dotenv.config();

let JWTConfig = {};
JWTConfig.jwtFromRequest = ExtractJwt.fromExtractors([
  (req) => {
    return req.cookies.member;
  }
]);
JWTConfig.secretOrKey = process.env.JWT_SECRET;

const JWTVerify = async (jwtPayload, done) => {
  try {
    // jwtPayload에 유저 정보가 담겨있다.
    // 해당 정보로 유저 식별 로직을 거친다.
    console.log('유저 정보', jwtPayload);

    // payload의 id값으로 유저의 데이터를 조회한다.
    const member = await Member.findOne({ where: { memberId: jwtPayload.id } });

    if (!member) {
      console.log('==멤버가 없습니다===');
      // 유저가 유효하지 않다면
      done(null, false, { message: '인증정보가 유효하지 않습니다.' });
      return;
    }

    // 유효한 유저라면
    if (member) {
      console.log('==멤버가 유효합니다==');
      done(null, member);
      return;
    }
  } catch (error) {
    console.log('========인증 실패===========');
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  passport.use('jwtCheck', new JWTStrategy(JWTConfig, JWTVerify));
};
