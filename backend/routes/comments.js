const express = require('express');

const { BoardComment, Board, Member } = require('../models/');
const { isLoggedIn, tokenTest } = require('./middleware');
const router = express.Router();

// 민아) 8/2, 댓글등록 라우터
// localhost:3005/comments/
router.post('/', tokenTest, isLoggedIn, async (req, res) => {
  // 토큰테스트를 거쳐 인증이 완료된 회원아이디
  const memberId = req.user.memberId;
  console.log('댓글작성 memberId', req.user.memberId);

  console.log('코멘드 req.body', req.body);

  let bComment = {
    boardCommentContents: req.body.boardCommentContents,
    memberId: memberId,
    boardNo: req.body.boardNo
  };

  try {
    // db에 해당 데이터를 저장하고 저장결과를 다시 받아온다.
    const saveComment = BoardComment.create(bComment);
    return res.json({ code: '200', data: saveComment, msg: '댓글등록 ok' });
    //
  } catch (error) {
    console.log('서버에러내용: ', error);
    return res.json({ code: '500', data: {}, msg: '댓글 등록 서버에러발생!!' });
  }
});

// 민아) 8/2, 댓글목록 라우터
router.get('/:id', async (req, res) => {
  // 게시글 상세페이지에 댓글목록이 있으니까, 현재 보고있는 게시글의 번호를 가져온다.
  const boardNo = req.params.id;

  console.log('댓글목록을 보여줄 게시글 번호', boardNo);

  try {
    const commentList = await BoardComment.findAll({
      where: { boardNo },
      include: [
        {
          model: Member,
          attributes: ['nickName']
        }
      ]
      // order: [['boardCommentNo', 'DESC']] // 댓글은 보통 최신글순이 아니라 그냥 달린 순서대로인듯
    });
    // console.log('댓글목록 데이터', commentList);

    return res.json({ msg: '댓글 목록 ok', data: commentList, code: '200' });
  } catch (error) {
    console.log('서버에러내용: ', error);
    return res.json({ code: '500', data: {}, msg: '댓글목록 서버에러발생!!' });
  }
});

module.exports = router;
