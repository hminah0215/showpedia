const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");
const passport = require("passport");
const { Member } = require("../models/");

// jwt 토큰을 읽기위한 설정
// jwtFromRequest -> 리퀘스트에서 jwt의 위치를 설정, fromHeader명령어로 헤더에있는 jwt 값을 가져온다.
// secretOrKey는 jwt 토큰 발급시 사용한 키와 동일한 키어야 함
const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.JWT_SECRET,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    // jwtPayload에 유저 정보가 담겨있다.
    // 해당 정보로 유저 식별 로직을 거친다.
    console.log("jwtPayload", jwtPayload);

    // payload의 id값으로 유저의 데이터를 조회한다.
    const user = await Member.findOne({ where: { memberId: jwtPayload.id } });

    // 유효한 유저라면
    if (member) {
      done(null, member);
      return;
    }
    // 유저가 유효하지 않다면
    done(null, false, { message: "인증정보가 유효하지 않습니다." });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

passport.use("jwtCheck", new JWTStrategy(JWTConfig, JWTVerify));

module.exports = { passport };
