const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const passport = require('passport');
const { Member } = require('../models/');
const dotenv = require('dotenv');
dotenv.config();

// var cookieExrtactor = (req) => {
//   var token = null;
//   if (req.cookies) {
//     token = req.cookies['member'];
//     console.log('토큰전략', token);
//     return token;
//   }
//   console.log('cookieExrtactor', cookieExrtactor);
// };

// var cookieExrtactor = function (req) {
//   var token = null;

//   console.log('토큰체크 req', req);
//   if (req && req.cookies) token = req.cookies['member'];
//   console.log('req.cookies[member]', req.cookies['member']);
//   return token;
// };

const cookieExrtactor = (req) => {
  var token = null;

  console.log('토큰체크 req', req);
  if (req && req.cookies) token = req.cookies['member'];
  console.log('req.cookies[member]', req.cookies['member']);
  return token;
};

// jwt 토큰을 읽기위한 설정
// jwtFromRequest -> 리퀘스트에서 jwt의 위치를 설정, fromHeader명령어로 헤더에있는 jwt 값을 가져온다.
// secretOrKey는 jwt 토큰 발급시 사용한 키와 동일한 키어야 함
// jwtFromRequest: ExtractJwt.fromHeader('Cookie[member]'),

// const JWTConfig = {
//   // jwtFromRequest: ExtractJwt.fromExtractors([cookieExrtactor]),
//   // jwtFromRequest: ExtractJwt.fromExtractors(cookieExrtactor),
//   jwtFromRequest:
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QyIiwibmFtZSI6Iu2FjOyKpO2KuOqzhOyglTIiLCJpYXQiOjE2MjcyMTU1MzksImV4cCI6MTYyNzMwMTkzOSwiaXNzIjoic2hvd3BlZGlhIn0.lzmfEGco3wqYiOxMY4LlSUA0idrON5syeimMIv_A-28',
//   // jwtFromRequest: (req) => cookieExrtactor(req, 'member'),
//   // secretOrKey: process.env.JWT_SECRET
//   secretOrKey: 'jwtSecret'
// };

let JWTConfig = {};
JWTConfig.jwtFromRequest = ExtractJwt.fromExtractors([
  (req) => {
    return req.cookies.member;
  }
]);
JWTConfig.secretOrKey = process.env.JWT_SECRET;

const JWTVerify = async (jwtPayload, done) => {
  console.log('jwt정보 읽어오나?', JWTConfig);
  try {
    // jwtPayload에 유저 정보가 담겨있다.
    // 해당 정보로 유저 식별 로직을 거친다.
    console.log('jwtPayload', jwtPayload);

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
