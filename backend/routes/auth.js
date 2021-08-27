const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const multer = require('multer'); // 파일이미지업로드를 위해 multer 패키지 참조
const path = require('path');
// middlewares.js 참조
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
// 데이터베이스 참조
const { Member } = require('../models/');

const router = express.Router();

// 민아) 7/24, 멀터패키지 사용, 파일명 저장 옵션 설정
const upload = multer({
  // 저장할 장소
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/uploads');
    },
    // 저장할 파일의 이름 설정
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext); // 유니크한 파일명
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 파일 크기 제한
});

// [아영] - 프로필 이미지를 저장하는 multer 설정
const upload_profile = multer({
  // 저장할 장소
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/profile_images');
    },
    // 저장할 파일의 이름 설정
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext); // 유니크한 파일명
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 파일 크기 제한
});

// 민아) 7/29,프로필이미지
// [아영] - 이미지저장 폴더 변경
router.post('/uploadProfile', upload_profile.single('profilePhoto'), (req, res) => {
  res.json({ url: `http://www.showpedia.xyz:3005/profile_images/${req.file.filename}` });
});

// 민아) 7/29, 아이디 중복체크용 라우터
router.post('/checkId', async (req, res, next) => {
  let memberId = req.body.memberId;

  try {
    // 같은 회원아이디로 가입한 사용자가 있는지 조회
    const exMember = await Member.findOne({ where: { memberId } });
    if (exMember) {
      let checkId = false;
      return res.json({ code: 400, message: '중복된 아이디입니다.', data: checkId });
    } else {
      let checkId = true;
      return res.json({ code: 200, message: '사용가능한 아이디입니다.', data: checkId });
    }
  } catch (error) {
    console.error('아이디중복체크 에러!', error);
    return next(error);
  }
});

// 민아) 7/23 ,회원가입 post 라우터
// www.showpedia.xyz:3005/regist
router.post('/regist', isNotLoggedIn, upload.single('profilePhoto'), async (req, res, next) => {
  const { memberId, pwd, nickName, profilePhoto } = req.body;

  const uploadedFile = req.body.profilePhoto;

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
        profilePhoto: uploadedFile
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
// www.showpedia.xyz:3005/login
router.post('/login', isNotLoggedIn, async (req, res, next) => {
  // 로그인 요청이 들어오면 passport.authenticate('local') 미들웨어가 로컬 로그인 전략을 수행함
  passport.authenticate('local', async (authError, member, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    // 유저가 없거나 인증이 실패하면 에러 발생
    if (!member || authError) {
      return res.json({
        code: '400',
        msg: '로그인 실패'
      });
    }

    // 전략이 성공하거나 실패하면!
    return req.login(member, { session: false }, async (loginError) => {
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
        res.cookie('member', accessToken, { httpOnly: true, sameSite: 'None' });

        return res.json({ code: 200, message: '인증토큰이 발급되었습니다.', data: token });
      } catch (error) {
        console.error(error);
        next(error);
      }
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

// 민아) 7/23, 로그아웃 get 라우터
router.get('/logout', (req, res) => {
  console.log('req.isAuthenticated()', req.isAuthenticated());

  var cookielog = req.cookies;
  console.log('cookielog', cookielog);

  req.logout(); // req.member 객체를 제거하고

  res.clearCookie('member'); // 쿠키를 삭제한다.

  return res.json({ code: 200, message: '로그아웃 성공!!', data: [] });
});

// 민아) 7/23, 카카오 로그인 get 라우터
// www.showpedia.xyz:3005/kakao
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
    try {
      // 카카오로그인 전략이 성공하면 jwt 토큰 발급
      const token = jwt.sign(
        // sign의 첫번째 인수, payload에 저장할 데이터
        { id: req.user.user.dataValues.memberId, name: req.user.user.dataValues.nickname },
        // sign의 두번째 인수
        process.env.JWT_SECRET,
        // sign의 세번째 인수 -> 유효기간,발급자 등의 정보를 설정
        { expiresIn: '1d', issuer: 'showpedia' } // 유효기간 하루로 설정해둠
      );

      // signed:true 줘서 암호화된 쿠키를 사용하는 게 좋다고 함.
      // 일단 테스트 다하고 변경예정
      res.cookie('member', token, { httpOnly: true });

      res.redirect('http://www.showpedia.xyz/');
    } catch (error) {
      console.error(error);
    }
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
