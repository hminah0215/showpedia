// OPEN API를 사용하는 라우터
const express = require('express');
const router = express.Router();
const axios = require('axios');
// env 사용을 위해서 각각 라우터에서도 dotenv를 참조해줘야한다.
const dotenv = require('dotenv');
dotenv.config();
const xml2js = require('xml2js');

// OPEN API KEY
const KEY = process.env.SHOW_ID;
const BASE_URL = `http://kopis.or.kr/openApi/restful/`;

// axios를 사용해 데이터를 가져오는 로직 분리
// URL을 받아 openAPI에서 XML데이터를 받아 JSON으로 만들어서 반환해주는함수
const getShowtoJSON = async (URL) => {
  try {
    // OPEN API 에서 XML 데이터 가져오기
    const xml = await axios.get(URL);
    // JSON으로 변환하기
    const json = await xml2js.parseStringPromise(xml.data);
    return json;
  } catch (err) {
    return {
      msg: 'OPEN API 접근 실패',
      status: 500,
    };
  }
};

// 공연 검색 시, 검색 결과를 제공하는 라우터
// :3005/show/result
router.get('/result', async (req, res) => {
  console.log('page 쿼리 확인', req.query.page);
  // OPEN API에서 필수적으로 요구하는 쿼리 스트링 - req.body에서 넘어온다.
  // 필수 요청 변수 [service, stdate, eddate, cpage, rows]
  // cpage는 페이지 넘버로 쿼리스트링으로 받아온다.
  // 공연 이름 문자열은 URIencoding을 해줘야한다.
  const title = req.body.shprfnm ? encodeURI(req.body.shprfnm) : '';
  const query = {
    // 필수 요청 변수
    cpage: req.query.page || 1, // localhost:3005/show/result?page=1
    rows: 10, // 한번에 받을 데이터 개수
    stdate: req.body.stdate || '20210724',
    eddate: req.body.eddate || '20211010',
    // 선택 요청 변수
    shprfnm: title, // 값을 엔코드 하고 넣어야한다.
    shcate: req.body.shcate || '', // 장르 코드
    signgucode: req.body.signgucode || '', // 지역(시도)코드
    signgucodesub: req.body.signgucodesub || '', // 지역(구군)코드
    kidstate: req.body.kidstate || '', // 아동공연 여부 default - 전체공연
    prfstate: req.body.prfstate || '', // 공연 상태 코드
  };
  // 요청 변수들을 합쳐서 하나의 쿼리스트링으로 만든다.
  let combineQuery = '';
  for (const key in query) {
    combineQuery += `&${key}=${query[key]}`;
  }
  // axios 요청을 보낼 URL
  const URL = BASE_URL + `pblprfr?service=${KEY}` + combineQuery;
  // 데이터 가져오기 [ getShowtoJSON 리팩토링]
  const showList = await getShowtoJSON(URL);
  // 실패 시,
  if (showList.status === 500) {
    res.json(showList);
  }
  // 성공 시,
  res.json({
    msg: 'OPEN API&JSON변환 성공',
    status: 200,
    data: showList.dbs.db,
  });
});

// 현재 가장 예매가 많이 된 공연 목록을 제공하는 라우터
router.get('/boxoffice', async (req, res) => {
  // 현재 날짜를 계산
  const date = new Date();
  // 요청 변수에 맞는 형식으로 변경
  const defaultStdate =
    String(date.getFullYear()) +
    String(date.getMonth()).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');

  const URL =
    BASE_URL +
    `boxoffice?service=${KEY}` +
    `&ststype=month&date=${defaultStdate}`;

  // OPEN API에서 데이터를 가져온다
  const boxoffice = await getShowtoJSON(URL);
  // 실패 시,
  if (boxoffice.status === 500) {
    res.json(boxoffice);
  }
  res.json({
    msg: 'OPEN API 접근 성공',
    data: boxoffice.boxofs,
    status: 200,
  });
});

// 공연 상세 정보를 제공하는 라우터
router.get('/:id', async (req, res) => {
  // 파라미터에서 공연 id를 가져온다.
  const showId = req.params.id;
  const URL = BASE_URL + `pblprfr/${showId}?service=${KEY}`;

  // OPEN API에서 데이터를 가져온다
  const show = await getShowtoJSON(URL);

  res.json({
    msg: 'OPEN API 접근 성공',
    data: show.dbs.db,
    status: 200,
  });
});

module.exports = router;
