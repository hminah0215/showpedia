// 리뷰 CRUD 라우터
const express = require('express');
const router = express.Router();
// DB
const Review = require('../models').Review;
// 로그인 확인 미들웨어
const { isLoggedIn, tokenTest } = require('./middleware');

// 리뷰 생성 라우터
router.post('/', isLoggedIn, tokenTest, async (req, res) => {
  // 클라이언트에서 리뷰 정보를 가져온다.
  console.log('바디로 넘어오는 모든 것들', req.body);
  const memberId = req.user.memberId; // token 미들웨어에서 전달해준다.

  const review = {
    reviewStars: req.body.reviewStars,
    reviewContents: req.body.reviewContents,
    showId: req.body.showId,
    memberId
  };

  // 데이터를 저장한다.
  try {
    const result = await Review.create(review);
    res.json({
      code: '200',
      data: result,
      msg: '리뷰 등록 성공'
    });
  } catch (error) {
    console.error(error);
    res.json({
      code: '500',
      msg: '리뷰 등록 실패'
    });
  }
});

// 리뷰 수정 라우터 - 로그인한 사람만 좋아요/싫어요/수정가능
router.put('/', tokenTest, async (req, res) => {
  // 수정할 리뷰 번호
  // console.log('user로 넘어오는 memberId', req.user.memberId);
  const memberId = req.user.memberId; // tokenTest가 보내주는 memberId
  const reviewNo = req.body.reviewNo; // 수정할 리뷰의 No
  // 리뷰 수정 상태를 정하는 변수 - 좋아요 / 신고
  const opt = req.body.opt;
  // 클라이언트에서 넘어오는 해당 리뷰의 멤버아이디
  // console.log('수정 시 넘어오는 바디', req.body.memberId);

  // 토큰 인증 멤버 아이디와 클라이언트에서 전송한 해당 리뷰의 멤버아이디가 다를 경우 수정 불가
  // opt가 있는 경우는 id와 상관없음.
  if (!opt && memberId !== req.body.memberId) {
    return res.json({
      code: '500',
      msg: '다시 로그인을 진행해주세요'
    });
  }

  // opt가 like 일 경우 reviewLikes + 1
  const reviewLikes = opt == 'like' ? req.body.reviewLikes + 1 : req.body.reviewLikes;
  // opt가 report일 경우 reviewReports + 1
  const reviewReports = opt == 'report' ? req.body.reviewReports + 1 : req.body.reviewReports;
  // console.log('리뷰 라이크', reviewLikes);
  // console.log('리뷰 리포트', reviewReports);

  const review = {
    reviewStars: req.body.reviewStars,
    reviewContents: req.body.reviewContents,
    reviewLikes,
    reviewReports
  };

  // DB와 통신
  try {
    const result = await Review.update(review, {
      where: {
        reviewNo
      }
    });
    res.json({
      code: '200',
      data: result,
      msg: '리뷰 수정 성공'
    });
  } catch (error) {
    console.error(error);
    res.json({
      code: '500',
      msg: '리뷰 수정 실패'
    });
  }
});

// 단일 리뷰를 가져오는 라우터
// 해당하는 공연id에 작성한 유저 리뷰를 가져온다.
router.get('/', tokenTest, async (req, res) => {
  // tokenTest에서 로그인이 되지않은 경우 return
  // 검색 조건을 search 쿼리로 가져온다.
  console.log('단일 리뷰에서 user id 정보', req.user.memberId);
  const showId = req.query.showId;

  // 유저 정보는 백엔드가 해준다.
  // msg: '유저가없거나 인증이 실패하면 에러발생'
  const memberId = req.user.memberId; // tokenTest 미들웨어에서 전달해준다.

  console.log('검색 조건===', memberId);
  // console.log('showId===', showId);
  try {
    if (memberId) {
      const result = await Review.findOne({
        where: {
          memberId,
          showId
        }
      });
      // console.log(result);
      if (!result) {
        // 리뷰가 존재하지 않는 경우 - data를 보내지 않는다.
        res.json({
          code: '200'
        });
      }
      // 리뷰가 존재하는 경우
      res.json({
        code: '200',
        msg: '단일 리뷰 데이터 조회 완료',
        data: result
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      code: '500',
      msg: '리뷰 조회 실패'
    });
  }
});

// 단일 리뷰 삭제 하는 라우터
router.delete('/:id', isLoggedIn, async (req, res) => {
  // 리뷰id 가져오기
  const reviewNo = req.params.id;
  console.log('==reviewNo==', reviewNo);
  try {
    // 삭제하기
    const result = await Review.destroy({
      where: {
        reviewNo
      }
    });
    res.json({
      code: '200',
      msg: '단일 리뷰 데이터 조회 완료',
      data: result
    });
  } catch (error) {
    console.error(error);
    res.json({
      code: '500',
      msg: '단일 리뷰 데이터 조회 실패'
    });
  }
});

// 해당 공연 id에 맞는 리뷰리스트 전부 가져오기
// 와일드 카드로 공연 id값을 가져온다.
router.get('/reviewlist/:id', async (req, res) => {
  const showId = req.params.id;
  const page = req.query.page ? req.query.page : 1;

  console.log('공연 아이디 가져오기', showId);
  console.log('페이지 가져오기', page);

  // DB에서 공연 ID 에 맞는 리뷰데이터 가져오기
  try {
    // offset은 skip할 row 개수
    // limit는 가져올 row 개수
    const result = await Review.findAll({
      where: {
        showId
      },
      order: [['reviewLikes', 'DESC']],
      limit: 5 * page
    });
    res.json({
      code: '200',
      data: result,
      msg: '데이터 조회 완료'
    });
  } catch (error) {
    console.error(error);
    res.json({
      code: '500',
      msg: '데이터 조회 오류'
    });
  }
});

module.exports = router;
