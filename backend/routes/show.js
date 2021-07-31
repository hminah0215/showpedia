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
      data: [],
      status: 500
    };
  }
};

// 공연 검색 시, 검색 결과를 제공하는 라우터
// :3005/show/result
router.post('/result', async (req, res) => {
  console.log('현재 body에서 넘어오는 값', req.body);
  console.log('쿼리로 넘어와요?', req.query.page);
  // OPEN API에서 필수적으로 요구하는 쿼리 스트링 - req.body에서 넘어온다.
  // 필수 요청 변수 [service, stdate, eddate, cpage, rows]
  // cpage는 페이지 넘버로 쿼리스트링으로 받아온다.

  // 시작 날짜를 정하지 않은 경우, 오늘 날짜부터 검색해준다.
  const date = new Date();
  const defaultStdate =
    String(date.getFullYear()) +
    String(date.getMonth() + 1).padStart(2, '0') + // 0부터 시작하기때문에 +1
    String(date.getDate()).padStart(2, '0');
  // 종료 날짜를 정하지 않은 경우, 현재 년도에 1년을 더한 값을 종료 날짜로 선정한다
  const defaultEddate =
    String(date.getFullYear() + 1) +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');

  // 공연 이름 문자열은 URIencoding을 해줘야한다.
  const title = req.body.shprfnm ? encodeURI(req.body.shprfnm) : '';
  // 2021-01-01 구조로 넘어오는 데이터를 요청 변수의 구조로 변경
  const startDate = req.body.state ? req.body.stdate.replace(/-/gi, '') : defaultStdate;
  const endDate = req.body.eddate ? req.body.eddate.replace(/-/gi, '') : defaultEddate;

  const query = {
    // 필수 요청 변수 - 프론트에서 유효성 검사 필수
    cpage: req.query.page || 1, // localhost:3005/show/result?page=1
    rows: 10, // 한번에 받을 데이터 개수
    stdate: startDate,
    eddate: endDate,
    // 선택 요청 변수
    shprfnm: title, // 문자열을 엔코드 하고 넣어야한다.
    shcate: req.body.shcate || '', // 장르 코드
    signgucode: req.body.signgucode || '', // 지역(시도)코드
    kidstate: req.body.kidstate ? 'Y' : '', // 아동공연 여부 default - 전체공연
    prfstate: req.body.prfstate || '' // 공연 상태 코드
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

  console.log('쿼리도 찍어봅니다', query);
  console.log('URL도 찍어봅니다', URL);

  res.json({
    msg: 'OPEN API&JSON변환 성공',
    status: 200,
    data: showList.dbs.db
  });
});

// 현재 가장 예매가 많이 된 공연 목록을 제공하는 라우터
router.get('/boxoffice', async (req, res) => {
  const catecode = req.query.catecode || '';
  // 현재 날짜를 계산
  const date = new Date();
  // 요청 변수에 맞는 형식으로 변경
  const defaultStdate =
    String(date.getFullYear()) +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');

  const URL =
    BASE_URL +
    `boxoffice?service=${KEY}` +
    `&ststype=week&date=${defaultStdate}&catecode=${catecode}`;

  // console.log('박스오피스 URL', URL);

  // OPEN API에서 데이터를 가져온다
  const boxoffice = await getShowtoJSON(URL);
  // 실패 시,
  if (boxoffice.status === 500) {
    res.json(boxoffice);
  }
  // OPEN API는 50개의 데이터를 전송한다(수정 불가)
  // 10개만 필요하기 때문에 데이터만 뽑아낸다.
  const boxs = boxoffice.boxofs.boxof.slice(0, 10);
  res.json({
    msg: 'OPEN API 접근 성공',
    data: boxs,
    status: 200
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
    status: 200
  });
});

module.exports = router;
