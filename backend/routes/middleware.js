// 민아) 7/23, 로그인 여부 파악 미들웨어 작성

// 로그인 한건지
exports.isLoggedIn = (req, res, next) => {
  //
  // req객체에 isAuthenticated 메서드를 추가, 로그인 중이면 true!
  req.user = req.cookies.member ? 'login' : '';

  console.log('req.user가 있는가?', req.cookies.member);
  console.log('req.user가 있는가?', req.user);

  console.log('isLoggedIn에서의 isAuth', req.isAuthenticated());

  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요한 상태입니다.');
  }
};

// 로그인 안한 상태인지
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
