const express = require('express');
const { Board } = require('../models/');
const { isLoggedIn, tokenTest } = require('./middleware');

const router = express.Router();

// 민아) 7/26, 게시글 전체목록 get 라우터
// localhost:3005/board/list?page=1&boardCategory=free
// 게시글 목록은 로그인했던,안했던 다 볼 수 있는 상태로 둘거라 미들웨어 안가져다 씀!
router.get('/list', async (req, res, next) => {
  try {
    // 주소에서 카테고리명을 추출한다.
    const category = req.query.boardCategory;

    // 일단 임의로 notice(공지), free(자유), actor(덕질), together(같이가요)로 구분
    console.log('전달된 카테고리명 ==>', category);

    if (category != undefined) {
      // 전달된 카테고리가 있다면, 검색조건에 카테고리 넣어서 조회
      let boardList = await Board.findAll({
        where: { boardCategory: category },
        order: [['boardNo', 'DESC']]
      });

      return res.json({ msg: '카테고리별 목록 ok', data: boardList, code: '200' });
    }

    console.log('카테고리 말고 카테고리가 없으면 전체게시글 조회하나요???');

    // 전달된 카테고리가 없으면, 게시글 전체를 조회한다.
    // limit 숫자로 한페이지에 몇개를 보일지 정한다. 일단 테스트시에는 5로해둠
    const boardAllList = await Board.findAll({ order: [['boardNo', 'DESC']] });

    console.log('boardAllList', boardAllList);

    // console.log('게시글 목록 boardAllList 정렬되나?', boardAllList);

    return res.json({ msg: '전체 목록 ok', data: boardAllList, code: '200' });
  } catch (error) {
    next(error);
  }
});

// 민아) 7/26, 게시글 등록 post 라우터  -> 에디터는 아직 생각중
// localhost:3005/board/boardRegist.html
router.post('/regist', isLoggedIn, tokenTest, async (req, res) => {
  // isLoggedIn 미들웨어로 쿠키가 없는 사용자는 로그인 필요함을 나타낸다.

  // tokenTest 미들웨어를 거쳐, 인증이 완료된 회원의 memberId를 같이 넘긴다.
  const memberId = req.user.memberId;
  console.log('게시글작성 memberId', req.user.memberId);

  let board = {
    boardTitle: req.body.boardTitle,
    boardCategory: req.body.boardCategory,
    boardContents: req.body.boardContents,
    boardHits: 0,
    memberId: memberId
  };

  try {
    // db에 해당 데이터를 저장하고 저장결과를 다시 받아온다.
    const savedBoard = await Board.create(board);
    return res.json({ code: '200', data: savedBoard, msg: 'ok' });
    //
  } catch (error) {
    console.log('서버에러내용: ', error);
    return res.json({ code: '500', data: {}, msg: '게시글 등록 서버에러발생!!' });
  }
});

module.exports = router;
