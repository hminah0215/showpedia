// 리뷰 CRUD 라우터
const express = require('express');
const router = express.Router();
// DB
const Review = require('../models').Review;

// 리뷰 생성 라우터
router.post('/', async (req, res) => {
  // 클라이언트에서 리뷰 정보를 가져온다.
  console.log('바디로 넘어오는 모든 것들', req.body);
  const review = {
    reviewStars: req.body.reviewStars,
    reviewContents: req.body.reviewContents,
    showId: req.body.showId, // 겨울왕국 [예산]
    memberId: 'test' // 로그인 미완성으로 임의 데이터
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

// 해당 공연 id에 맞는 리뷰리스트 전부 가져오기
// 와일드 카드로 공연 id값을 가져온다.
router.get('/:id', async (req, res) => {
  const showId = req.params.id;
  console.log('공연 아이디 가져오기', showId);

  // DB에서 공연 ID 에 맞는 리뷰데이터 가져오기
  try {
    const result = await Review.findAll({
      where: {
        showId
      }
    });
    res.json({
      code: '200',
      data: result,
      msg: '데이터 조회 완료'
    });
  } catch (error) {
    res.json({
      code: '500',
      msg: '데이터 조회 오류'
    });
  }
});

module.exports = router;
