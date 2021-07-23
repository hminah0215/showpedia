// 민아) 7/23 작업, 로컬 로그인 전략
const passport = require("passport");

// passport-local 모듈에서 Strategy 생성자를 불러와 전략을 구현한다.
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const Member = require("../models/").Member;

module.exports = () => {
  // LocalStrategy 생성자의 첫번째 인수로 주어진 객체, 전략에 관한 설정을 한다.
  passport.use(
    new LocalStrategy(
      {
        // 각 필드에는 일치하는 로그인 라우터의 req.body 속성명을 적으면 됨 (name값)
        usernameField: "memberId",
        passwordField: "pwd",
      },

      // 실제 전략을 수행하는 함수. LocalStrategy 생성자의 두번째 인수
      // 첫번째 인수에서 넣어준 memberId,pwd가 async 함수의 매개변수가 된다.
      // 세번째 매개변수인 done은 passport.authenticate의 콜백 함수
      async (memberId, pwd, done) => {
        // console.log("전략 멤버아이디", memberId);

        try {
          // console.log("전략 멤버아이디 try안에서 ", memberId);
          // 사용자 db에서 일치하는 아이디가 있는지 찾는다.
          const exMember = await Member.findOne({ where: { memberId: memberId } });

          if (exMember) {
            // 일치하는 아이디가 있으면 bcrypt의 compare 함수로 비밀번호를 비교한다.
            const result = await bcrypt.compare(pwd, exMember.pwd);

            if (result) {
              console.log("비밀번호가 일치합니다. 로그인 성공");
              // 비밀번호가 일치하면 done 함수의 두번째 인수로 사용자 정보를 넣어 보낸다.
              done(null, exMember);
            } else {
              // 비밀번호가 다를때 에러
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            // 존재하지 않는 회원일때 에러
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      } // local 로그인 두번째 인자 끝
    ) // new Local 끝
  ); // passport.use 끝
};
