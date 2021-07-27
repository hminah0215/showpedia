// 리뷰 CRUD 라우터
const express = require('express');
const router = express.Router();
// DB
const Review = require('../models').Review;

router.get('/', (req, res) => {
  console.log('리뷰에요~');
  res.send('리뷰에요');
});

// 리뷰 생성 라우터
router.post('/', async (req, res) => {
  // 클라이언트에서 리뷰 정보를 가져온다.

  console.log('바디로 넘어오는 모든 것들', req.body);
  const review = {
    reviewStars: req.body.reviewStars,
    reviewContents: req.body.reviewContents,
    showId: req.body.showId, // 겨울왕국 [예산]
    memberId: 'test'
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

module.exports = router;
