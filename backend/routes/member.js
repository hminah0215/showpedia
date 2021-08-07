const express = require('express');
const bcrypt = require('bcrypt');
const { Member } = require('../models/');

const router = express.Router();

module.exports = router;

// 민아) 7/24, 회원정보 수정
// 마이페이지에서 회원정보 수정할때 사용할 것
router.post('/modify', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.pwd, 12);

    // 암호를 수정하지 않을때는!
    if (req.body.pwd == null) {
      const updateCnt = await Member.update(
        { nickName: req.body.nickName, profilePhoto: req.body.profilePhoto },
        { where: { memberId: req.body.memberId } }
      );
      return res.json({ code: '200', data: updateCnt, msg: 'OK' });
    } else {
      // 암호도 수정할때는
      const updateCnt = await Member.update(
        { pwd: hash, nickName: req.body.nickName, profilePhoto: req.body.profilePhoto },
        { where: { memberId: req.body.memberId } }
      );
      return res.json({ code: '200', data: updateCnt, msg: 'OK' });
    }
  } catch (error) {
    return res.json({ code: '500', data: {}, msg: '회원정보 수정실패ㅠㅠ' });
  }
});

// 민아) 7/24, 단일 회원정보 조회 (와일드카드방식)
// localhost:3005/modify.html?memberId=aaa@aaa.com
// 마이페이지에서 내 정보 확인할때 사용
router.get('/modify/:id', async (req, res) => {
  const memberId = req.params.id;

  try {
    const oneMember = await Member.findOne({ where: { memberId: memberId } });

    return res.json({ code: '200', data: oneMember, msg: '회원정보조회 성공!' });
  } catch (error) {
    return res.json({ code: '500', data: {}, msg: '회원정보조회 실패 ㅠㅠ' });
  }
});

// 민아) 7/25, 단일 회원정보 삭제 (와일드카드방식)
// 실제 db에서 회원정보를 지우지 않고 deletedAt 칼럼에 삭제 일시가 추가된다.
// 추후 관리자페이지에서 신고수가 많은 회원 정지를 위해 구현해둠
router.delete('/delete/:id', async (req, res) => {
  const memberId = req.params.id;

  try {
    const delMemberCnt = await Member.destroy({ where: { memberId: memberId } });

    // 지워진 건수가 1이면 삭제성공
    if (delMemberCnt == 1) {
      return res.json({ code: '200', data: delMemberCnt, msg: 'OK' });
    } else {
      return res.json({ code: '500', data: [], msg: '삭제 실패!' });
    }
  } catch (error) {
    return res.json({ code: '500', data: [], msg: '회원정보삭제 에러요' });
  }
});
