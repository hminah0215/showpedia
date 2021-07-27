// 리뷰 CRUD 라우터
const express = require('express');
const router = express.Router();
// DB
const Review = require('../models').Review;

// 해당 공연 id에 맞는 리뷰리스트 전부 가져오기
router.get('/', (req, res) => {
  const reviewList = [
    {
      reviewNo: '1',
      reviewContents: '더미 데이터',
      reviewLikes: 33,
      reviewReports: 10,
      reviewStars: 4,
      memberId: 'test',
      createdAt: '2020-07-27',
      // test용 더미 데이터 프로필 이미지
      profilePhoto: 'https://www.w3schools.com/w3images/avatar6.png'
    },
    {
      reviewNo: '2',
      reviewContents: '더미 데이터',
      reviewLikes: 33,
      reviewReports: 10,
      reviewStars: 4,
      memberId: 'test',
      createdAt: '2020-07-27',
      profilePhoto: 'https://www.w3schools.com/w3images/avatar6.png'
    }
  ];
  res.json({
    code: '200',
    data: reviewList,
    msg: '리뷰 등록 성공'
  });
});

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

module.exports = router;
