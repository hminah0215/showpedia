// 하루에 한 번, 서버 자체에서
// TOP 10 정보를 가져온 후에, 해당 정보를 기억하고
// 그 정보만 클라이언트에게 전달한다.
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

const getTop10 = async () => {
  const date = new Date();
  // 요청 변수에 맞는 형식으로 변경 - 오늘 날짜
  const defaultStdate =
    String(date.getFullYear()) +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');

  const MAIN_URL =
    BASE_URL + `boxoffice?service=${KEY}` + `&ststype=week&date=${defaultStdate}&catecode=`;

  const CCCA_URL =
    BASE_URL + `boxoffice?service=${KEY}` + `&ststype=week&date=${defaultStdate}&catecode=CCCA`;

  const AAAA_URL =
    BASE_URL + `boxoffice?service=${KEY}` + `&ststype=week&date=${defaultStdate}&catecode=AAAA`;

  // OPEN API에서 데이터를 가져온다
  const boxoffice = await getShowtoJSON(MAIN_URL);
  const ccca_boxoffice = await getShowtoJSON(CCCA_URL);
  const aaaa_boxoffice = await getShowtoJSON(AAAA_URL);
  // 실패 시,
  if (boxoffice.status === 500) {
    console.log('박스오피스에러');
  }
  if (ccca_boxoffice.status === 500) {
    console.log('공연 박스오피스 에러');
  }
  if (aaaa_boxoffice.status === 500) {
    console.log('뮤지컬 박스오피스 에러');
  }
  // OPEN API는 50개의 데이터를 전송한다(수정 불가)
  // 10개만 필요하기 때문에 데이터만 뽑아낸다.

  return {
    boxoffice: boxoffice.boxofs.boxof.slice(0, 10),
    ccca_box: ccca_boxoffice.boxofs.boxof.slice(0, 10),
    aaaa_box: aaaa_boxoffice.boxofs.boxof.slice(0, 10)
  };
};

// 테스트용 함수
const getTest10 = async () => {
  console.log('테스트 실행햇니?');
  const date = new Date();
  // 요청 변수에 맞는 형식으로 변경 - 오늘 날짜
  const defaultStdate =
    String(date.getFullYear()) +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');

  const MAIN_URL =
    BASE_URL + `boxoffice?service=${KEY}` + `&ststype=week&date=${defaultStdate}&catecode=`;
  const boxoffice = await getShowtoJSON(MAIN_URL);
  return {
    boxoffice: boxoffice.boxofs.boxof.slice(0, 10)
  };
};

// module.exports = getTest10;
module.exports = getTop10;
