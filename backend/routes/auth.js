const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
// middlewares.js 참조
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const { Member } = require('../models/');

const multer = require('multer'); // 파일이미지업로드를 위해 multer 패키지 참조

const router = express.Router();

// 민아) 7/24, 멀터패키지 사용, 파일명 저장 옵션 설정
const storage = multer.diskStorage({
  // 저장 경로 설정
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // 파일명 설정, 중복되지 않게 파일명 생성
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' || ext !== '.jpg') {
      return cb(res.status(400).end('확장자가 png, jpg인 파일만 업로드가능합니다.'), false);
    }
    cb(null, true);
  }
});
const upload = multer({ storage: storage });

// 민아) 7/24, 프로필 이미지 관련 처리
router.post('/uploads', upload.single('profilePhoto'), async (req, res) => {
  const uploadedFile = req.file;
  console.log('프로필이미지 업로드된 파일정보: ', uploadedFile);

  let filepath = '/uploads/' + uploadedFile.filename;

  return res.json({
    success: true,
    message: '프로필 이미지가 등록되었습니다.',
    filepath: filepath
  });
});

// 민아) 7/29, 아이디 중복체크용 라우터
router.post('/checkId', async (req, res, next) => {
  let memberId = req.body.memberId;
  console.log('아이디체크용', memberId);

  try {
    // 같은 회원아이디로 가입한 사용자가 있는지 조회
    const exMember = await Member.findOne({ where: { memberId } });
    if (exMember) {
      let checkId = false;
      console.log('중복된 아이디가 있음! checkId=?', checkId);
      return res.json({ code: 400, message: '중복된 아이디입니다.', data: checkId });
    } else {
      let checkId = true;
      console.log('중복된 아이디없당!!!  checkId=?', checkId);
      return res.json({ code: 200, message: '사용가능한 아이디입니다.', data: checkId });
    }
  } catch (error) {
    console.error('아이디중복체크 에러!', error);
    return next(error);
  }
});

// 민아) 7/23 ,회원가입 post 라우터
// localhost:3005/regist
router.post('/regist', isNotLoggedIn, upload.single('profilePhoto'), async (req, res, next) => {
  const { memberId, pwd, nickName, profilePhoto } = req.body;

  console.log(req.body);

  const uploadedFile = req.body.profilePhoto;
  console.log('프로필이미지 업로드된 파일정보: ', uploadedFile);

  let filepath = '/uploads/' + uploadedFile;

  console.log('reqbody', req.body);

  console.log('req.body 프로필이미지', req.body.profilePhoto);

  try {
    // 같은 회원아이디로 가입한 사용자가 있는지 조회
    const exMember = await Member.findOne({ where: { memberId } });

    if (exMember) {
      // 같은 이메일로 가입한 사용자가 있다면, checkId에 false 값을 담아 보낸다.
      let checkId = false;
      // console.log('중복된 아이디가 있음!! checkId=?', checkId);

      return res.json({ code: 400, message: '중복된 아이디입니다.', data: checkId });
    } else {
      // 같은 이메일로 가입한 사용자가 없다면 , 비밀번호 암호화 후 회원등록
      // bcrypt의 두번째 인수에 적힌 숫자가 커질수록 비밀번호를 알아내기 더 어려움. 31까지 가능하다.
      const hash = await bcrypt.hash(pwd, 12);

      await Member.create({
        memberId,
        pwd: hash,
        nickName,
        profilePhoto: filepath
      });

      let checkId = true;

      console.log('회원가입 성공!');

      return res.json({ code: 200, message: '회원가입 완료', data: checkId });
    }
  } catch (error) {
    console.error('회원가입 에러!', error);
    return next(error);
  }
});

// 민아) 7/23 ,로그인 post 라우터
// localhost:3005/login
router.post('/login', isNotLoggedIn, async (req, res, next) => {
  console.log('reqbody 로그인', req.body);

  // 로그인 요청이 들어오면 passport.authenticate('local') 미들웨어가 로컬 로그인 전략을 수행함
  passport.authenticate('local', async (authError, member, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    // 유저가 없거나 인증이 실패하면 에러 발생
    if (!member || authError) {
      return res.redirect(`/?loginError=${info.message}`);
    }

    // 전략이 성공하거나 실패하면!
    return req.login(member, { session: false }, async (loginError) => {
      // console.log("로그인정보 있다", member);

      try {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }

        // 전략이 성공하면 jwt 토큰 발급
        const token = jwt.sign(
          // sign의 첫번째 인수, payload에 저장할 데이터
          { id: member.memberId, name: member.nickName },
          // sign의 두번째 인수
          process.env.JWT_SECRET,
          // sign의 세번째 인수 -> 유효기간,발급자 등의 정보를 설정
          { expiresIn: '1d', issuer: 'showpedia' } // 유효기간 하루로 설정해둠
        );
        console.log('로그인 성공!!!');

        // 쿠키저장
        const accessToken = token;

        // signed:true 줘서 암호화된 쿠키를 사용하는 게 좋다고 함.
        // 일단 테스트 다하고 변경예정
        res.cookie('member', accessToken, { httpOnly: true, sameSite: 'None' });

        console.log('accessToken==>', accessToken);
        console.log('쿠키값이요.', req.cookies);
        // console.log("쿠키저장오케이?", req.cookies.member);

        return res.json({ code: 200, message: '인증토큰이 발급되었습니다.', data: token });
      } catch (error) {
        console.error(error);
        next(error);
      }
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

// 민아) 7/23, 로그아웃 get 라우터
// localhost:3005/logout

// router.get('/logout', isLoggedIn, (req, res) => {
router.get('/logout', (req, res) => {
  console.log('req.isAuthenticated()', req.isAuthenticated());

  var cookielog = req.cookies;
  console.log('cookielog', cookielog);

  req.logout(); // req.member 객체를 제거하고

  res.clearCookie('member'); // 쿠키를 삭제한다.
  console.log('쿠키 삭제 22');

  console.log('로그아웃 오케이22');
  return res.json({ code: 200, message: '로그아웃 돼따!!', data: [] });
});

// 민아) 7/23, 카카오 로그인 get 라우터
// localhost:3005/kakao
router.get('/kakao', passport.authenticate('kakao')); // 카카오 로그인 전략수행

// 수행한 성공여부를 받아 카카오전략을 다시 수행한다.
router.get(
  '/kakao/callback',
  // 로컬 로그인과 달리 authenticate메서드에서 콜백함수를 제공하지 않음!
  passport.authenticate('kakao', {
    // 대신 로그인에 실패하면 어디로 이동할지를 적는다.
    failureRedirect: '/',
    session: false
  }),

  // 로그인 성공시 실행되는 곳
  (req, res) => {
    console.log('kakao~~~ 라우터~~~~~');
    // res.redirect("/");
    res.json({ msg: '성공' });
  }
);

// 민아) 7/23, 카카오 로그아웃 get 라우터
router.get('/kakao/logout', async (req, res) => {
  try {
    const ACCESS_TOKEN = res.locals.user.accessToken;

    console.log('ACCESS_TOKEN값이요', ACCESS_TOKEN);

    let logout = await axios({
      method: 'POST',
      url: 'https://kapi.kakao.com/v1/user/unlink',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
  } catch (error) {
    console.error('카카오 로그아웃 에러', error);
    res.json(error);
  }

  console.log('카카오 로그아웃 여기까지왔음 ');

  req.logout();
});

module.exports = router;
