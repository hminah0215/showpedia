const express = require('express');
const multer = require('multer');
const path = require('path');
const { Board } = require('../models/');
const { isLoggedIn, tokenTest } = require('./middleware');

const router = express.Router();

// 민아) 7/29, 멀터패키지 사용, 파일명 저장 옵션 설정
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

// 민아) 7/29, 게시글에 첨부되는 이미지 파일 처리를위한 라우터
router.post('/uploads', upload.single('img'), (req, res) => {
  console.log(req.file);
  console.log('게시글에 업로드된 파일정보: ', req.file);
  res.json({ url: `http://localhost:3005/uploads/${req.file.filename}` });
});

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

    // console.log('boardAllList', boardAllList);

    // console.log('게시글 목록 boardAllList 정렬되나?', boardAllList);

    return res.json({ msg: '전체 목록 ok', data: boardAllList, code: '200' });
  } catch (error) {
    next(error);
  }
});

// 민아) 7/26, 게시글 등록 post 라우터  -> 에디터는 ck에디터5 쓰고있음
// localhost:3005/board/boardRegist.html
// router.post('/regist', isLoggedIn, tokenTest, async (req, res) => {
router.post('/regist', tokenTest, isLoggedIn, async (req, res) => {
  // isLoggedIn 미들웨어로 쿠키가 없는 사용자는 로그인 필요함을 나타낸다.

  // tokenTest 미들웨어를 거쳐, 인증이 완료된 회원의 memberId를 같이 넘긴다.
  const memberId = req.user.memberId;
  console.log('게시글작성 memberId', req.user.memberId);

  // let filepath = '/uploads/' + uploadedFile;

  let board = {
    boardTitle: req.body.boardTitle,
    boardCategory: req.body.boardCategory,
    boardContents: req.body.boardContents,
    boardHits: 0,
    memberId: memberId
  };

  try {
    // db에 해당 데이터를 저장하고 저장결과를 다시 받아온다.
    const savedBoard = Board.create(board);
    return res.json({ code: '200', data: savedBoard, msg: '게시글저장 ok' });
    //
  } catch (error) {
    console.log('서버에러내용: ', error);
    return res.json({ code: '500', data: {}, msg: '게시글 등록 서버에러발생!!' });
  }
});

// 민아) 7/30, 게시글 수정
router.put('/:id', tokenTest, isLoggedIn, async (req, res) => {
  // 회원아이디, 수정할 게시글 번호
  const memberId = req.user.memberId;
  const boardIdx = req.params.id;
  console.log('게시글 수정 memberId', memberId);
  console.log('수정할 게시글 번호', boardIdx);

  // 리뷰 수정옵션을 결정
  const opt = req.body.opt;

  console.log('opt', req.body.opt);

  // 클라이언트가 opt를 보내는 경우
  // 신고하는 사람의 아이디와 게시글 작성자의 아이디가 같으면!
  if (!opt && memberId === req.body.reportMember) {
    return res.json({
      code: '400',
      msg: '자신의 글에 신고 금지'
    });
  }

  console.log('신고 reqbody', req.body);

  const updateReports = opt == 'report' ? req.body.boardReports + 1 : req.body.boardReports;
  console.log('신고들어왔어요!', updateReports);

  const updateBoard = {
    boardTitle: req.body.boardTitle,
    boardCategory: req.body.boardCategory,
    boardContents: req.body.boardContents,
    boardReports: updateReports
  };

  try {
    const updateCnt = await Board.update(updateBoard, { where: { boardNo: boardIdx } });
    console.log('수정 결과 반환값', updateCnt);
    return res.json({ code: '200', data: updateCnt, msg: '게시글수정 OK' });
  } catch (error) {
    return res.json({ code: '500', data: {}, msg: '게시글수정 관리자에게 문의하세요.' });
  }
});

// 민아) 7/28, 게시글 상세보기 get 라우터
router.get('/view/:id', async (req, res) => {
  const boardIdx = req.params.id;
  console.log('상세보기 게시물 번호', boardIdx);

  try {
    //
    const board = await Board.findOne({ where: { boardNo: boardIdx } });

    return res.json({ code: '200', data: board, msg: '게시글 상세보기 OK' });
    //
  } catch (error) {
    console.log('서버에러내용: ', error);
    return res.json({ code: '500', data: {}, msg: '관리자에게 문의하세요.' });
  }
});

// 민아) 7/30, 게시글 삭제
router.delete('/:id', async (req, res) => {
  const boardIdx = req.params.id;

  try {
    const deleteCnt = await Board.destroy({ where: { boardNo: boardIdx } });

    if (deleteCnt == 1) {
      console.log('게시글 삭제 건수', deleteCnt);
      return res.json({ code: '200', data: deleteCnt, msg: 'OK' });
    }
  } catch (error) {
    return res.json({ code: '500', data: 0, msg: '게시글 삭제 서버 에러' });
  }
});

module.exports = router;
