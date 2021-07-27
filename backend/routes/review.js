// 리뷰 CRUD 라우터
const express = require('express');
const router = express.Router();
// DB
const Review = require('../models').Review;

// 리뷰 생성 라우터
router.post('/', async (req, res) => {
  // 클라이언트에서 리뷰 정보를 가져온다.
  console.log('바디로 넘어오는 모든 것들', req.body);
  const memberId = 'Ayo'; // token 미들웨어에서 전달해준다.
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

// 단일 리뷰를 가져오는 라우터
router.get('/', async (req, res) => {
  // 검색 조건을 search 쿼리로 가져온다.
  const showId = req.query.showId;

  // 유저 정보는 백엔드가 해준다.
  const memberId = 'Ayo'; // token 미들웨어에서 전달해준다.
  console.log('검색 조건===', memberId);
  console.log('showId===', showId);
  try {
    if (memberId) {
      const result = await Review.findOne({
        where: {
          memberId,
          showId
        }
      });
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
