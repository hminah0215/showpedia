const express = require('express');
const bcrypt = require('bcrypt');
const { Member } = require('../models/');

const router = express.Router();

module.exports = router;

// 민아) 7/24, 회원정보 수정
router.post('/modify', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.pwd, 12);

    // 암호를 수정하지 않을때는!
    if (req.body.pwd == null) {
      const updateCnt = await Member.update(
        { nickName: req.body.nickName, profilePhoto: req.body.profilePhoto },
        { where: { memberId: req.body.memberId } }
      );
      console.log('수정 건수 확인', updateCnt);
      return res.json({ code: '200', data: updateCnt, msg: 'OK' });
    } else {
      // 암호도 수정할때는
      const updateCnt = await Member.update(
        { pwd: hash, nickName: req.body.nickName, profilePhoto: req.body.profilePhoto },
        { where: { memberId: req.body.memberId } }
      );
      console.log('수정 건수 확인 암호도', updateCnt);
      return res.json({ code: '200', data: updateCnt, msg: 'OK' });
    }
  } catch (error) {
    return res.json({ code: '500', data: {}, msg: '회원정보 수정실패ㅠㅠ' });
  }
});

// 민아) 7/24, 단일 회원정보 조회 (와일드카드방식)
// localhost:3005/modify.html?memberId=aaa@aaa.com
router.get('/modify/:id', async (req, res) => {
  const memberId = req.params.id;

  console.log('회원정보수정 아이디', memberId);

  try {
    const oneMember = await Member.findOne({ where: { memberId: memberId } });

    console.log('정보수정할 회원정보', oneMember);
    return res.json({ code: '200', data: oneMember, msg: '회원정보조회 성공!' });
  } catch (error) {
    return res.json({ code: '500', data: {}, msg: '회원정보조회 실패 ㅠㅠ' });
  }
});
