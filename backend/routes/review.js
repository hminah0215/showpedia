// 리뷰 CRUD 라우터
const express = require('express');
const router = express.Router();
// DB
const Review = require('../models').Review;
const Member = require('../models').Member;

// 로그인 확인 미들웨어
const { isLoggedIn, tokenTest } = require('./middleware');

// 리뷰 생성 API
router.post('/', tokenTest, isLoggedIn, async (req, res) => {
  // 1. 클라이언트에서 리뷰 정보를 가져온다.
  console.log('바디로 넘어오는 모든 것들', req.body);
  // 2. tokenTest 미들웨어에서 memberId 정보를 가져온다.
  const memberId = req.user.memberId;
  // 3. 생성할 리뷰 정보를 review 변수에 담는다.
  const review = {
    reviewStars: req.body.reviewStars,
    reviewContents: req.body.reviewContents,
    showId: req.body.showId,
    memberId
  };

  // 4. DB와 연결한다.
  try {
    const result = await Review.create(review);
    return res.json({
      code: '200',
      data: result,
      msg: '리뷰 등록 성공'
    });
  } catch (error) {
    console.error(error);
    return res.json({
      code: '500',
      msg: '리뷰 등록 실패'
    });
  }
});

// 리뷰 수정 API - 로그인한 사람만 좋아요/싫어요/수정가능
router.put('/', tokenTest, isLoggedIn, async (req, res) => {
  const memberId = req.user.memberId; // tokenTest가 보내주는 memberId
  const reviewNo = req.body.reviewNo; // 수정할 리뷰의 No

  // 리뷰 수정 옵션을 결정하는 변수 opt - 좋아요 / 신고
  const opt = req.body.opt; // 'like' - 좋아요 수정 , 'report' - 신고 수정

  // 클라이언트가 opt를 보내지 않는 경우
  // 토큰 인증결과의 memberId와 클라이언트에서 전송한 해당 리뷰의 memberId가 다를 경우 수정 불가
  //단, opt가 있는 경우는 memberId 가 같을 필요가 없다.
  if (!opt && memberId !== req.body.memberId) {
    return res.json({
      code: '500',
      msg: '다시 로그인을 진행해주세요'
    });
  }

  // 클라이언트가 opt를 보내는 경우
  // 좋아요/싫어요 수정이면서 리뷰의 memberId와 현재 로그인한 memberId가 같은경우
  // 좋아요 싫어요 불가
  if (opt && memberId === req.body.memberId) {
    return res.json({
      code: '400',
      msg: '자신의 리뷰에 좋아요/싫어요 금지'
    });
  }

  // opt가 like 일 경우 reviewLikes + 1
  const reviewLikes = opt == 'like' ? req.body.reviewLikes + 1 : req.body.reviewLikes;
  // opt가 report일 경우 reviewReports + 1
  const reviewReports = opt == 'report' ? req.body.reviewReports + 1 : req.body.reviewReports;

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
      },
      include: [
        {
          model: Member,
          attributes: ['nickName']
        }
      ]
    });
    return res.json({
      code: '200',
      data: result,
      msg: '리뷰 수정 성공'
    });
  } catch (error) {
    console.error(error);
    return res.json({
      code: '500',
      msg: '리뷰 수정 실패'
    });
  }
});

// 유저가 작성한 리뷰를 가져오는 API
// 해당하는 공연id에 유저가 작성한 리뷰를 가져온다.
router.get('/', tokenTest, isLoggedIn, async (req, res) => {
  // 공연 id를 query문으로 넘겨준다.
  const showId = req.query.showId;
  const memberId = req.user.memberId; // tokenTest 미들웨어에서 전달해준다.

  // DB와 통신
  try {
    const result = await Review.findOne({
      where: {
        memberId,
        showId
      },
      include: [
        {
          model: Member,
          attributes: ['nickName']
        }
      ]
    });

    // 리뷰가 존재하지 않는 경우
    if (!result) {
      return res.json({
        code: '200',
        data: 'no' // 존재하지않는 경우, string을 보낸다.
      });
    }

    // 리뷰가 존재하는 경우
    return res.json({
      code: '200',
      msg: '단일 리뷰 데이터 조회 완료',
      data: result
    });
  } catch (error) {
    console.error(error);
    return res.json({
      code: '500',
      msg: '리뷰 조회 실패'
    });
  }
});

// 유저가 작성한 리뷰 삭제 API
router.delete('/:id', tokenTest, isLoggedIn, async (req, res) => {
  // 리뷰의 id(No)를 params로 가져온다.
  // 작성한 리뷰가 있을 경우에만 삭제가 가능하기 때문에 따로 memberId를 비교하지 않는다.
  const reviewNo = req.params.id;
  try {
    // 삭제하기
    const result = await Review.destroy({
      where: {
        reviewNo
      },
      include: [
        {
          model: Member,
          attributes: ['nickName']
        }
      ]
    });
    return res.json({
      code: '200',
      msg: '단일 리뷰 데이터 조회 완료',
      data: result
    });
  } catch (error) {
    console.error(error);
    return res.json({
      code: '500',
      msg: '단일 리뷰 데이터 조회 실패'
    });
  }
});

// 해당 공연 id에 맞는 리뷰리스트 전부 가져오는 API
// 와일드 카드로 공연 id값을 가져온다.
router.get('/reviewlist/:id', async (req, res) => {
  const showId = req.params.id; // 공연 아이디를 params에서 가져온다.
  const page = req.query.page ? req.query.page : 1; // 페이지네이션을 위한 page 변수

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
      limit: 5 * page,
      include: [
        {
          model: Member,
          attributes: ['nickName']
        }
      ]
    });

    // console.log('아니 왜...==?', result);

    // console.log('=================닉네임이 왜 없습니까?=====================', result[0]);

    return res.json({
      code: '200',
      data: result,
      msg: '데이터 조회 완료'
    });
  } catch (error) {
    console.error(error);
    return res.json({
      code: '500',
      msg: '데이터 조회 오류'
    });
  }
});

module.exports = router;
