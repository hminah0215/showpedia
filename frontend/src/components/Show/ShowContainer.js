import React, { useCallback, useEffect } from 'react';
import { setShow } from '../../redux/show';
// 부트스트랩
import { Container, Button } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
// CSS
import './ShowContainer.css';
// etc
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

// 공연 상세 정보를 보여주는 컴포넌트
/*
  [props]
  setIsFetch - [Contents.js] / 상세 정보를 가져왔는지 확인하는 isFetch를 set하는 함수, 가져오는데 실패 = false, 성공 = true
  showId - [Contents.js] / 해당 공연의 id값
*/
const ShowContainer = ({ setIsFetch, showId }) => {
  // 공연 상세정보 리덕스 state
  const show = useSelector((state) => state.show.show);
  const showDispatch = useDispatch();

  // 첫 로딩 시, 공연 상세 데이터를 가져온다.
  // useEffect에 async를 사용하지 않는다.
  useEffect(() => {
    // 백엔드에서 공연 상세 데이터 가져오기
    const URL = `http://localhost:3005/show/${showId}`;
    // useEffect 내부에서 async를 사용한다.
    const fetchData = async () => {
      try {
        const result = await axios.get(URL);
        const showData = result.data.data[0];
        // 공연 상세 정보를 세팅한다.
        showDispatch(setShow(showData));
        return;
      } catch (error) {
        // 상세정보를 가져오는데 실패했다면 isFetch에 false 입력
        setIsFetch();
        return;
      }
    };
    fetchData();
  }, [showId, setIsFetch, showDispatch]);
  // useEffect 종속성 고장

  // 즐겨찾기 토글 이벤트 핸들러 - 미완
  const handleClickStar = useCallback((e) => {
    e.target.classList.toggle('active');
  }, []);

  return (
    <div className="show-container d-flex justify-content-center">
      <Container className="d-flex justify-content-between row">
        {/* 공연 포스터 */}
        <div className="show-poster-box">
          <div className="show-poster me-4">
            <StarFill className="show-star" onClick={handleClickStar} />
            <img alt={show.prfnm} src={show.poster}></img>
          </div>
        </div>

        {/* 공연 정보 */}
        <div className="show-content col-xl-5 col-lg-8 col-md-7 col-sm-6 col-12">
          <h3 className="show-title">{show.prfnm}</h3>
          <p className="show-text">장소 - {show.fcltynm}</p>
          <p className="show-text">상영시간 - {show.prfruntime}</p>
          <p className="show-text">가격 - {show.pcseguidance}</p>
          <p className="show-text">
            상영기간 - {show.prfpdfrom} ~ {show.prfpdto}
          </p>
          <p className="show-text">출연진 - {show.prfcast}</p>
        </div>

        {/* 공연 줄거리 & 예매 버튼 */}
        <div className="d-flex show-story flex-column coljustify-content-end  col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
          <p className="show-story-content show-text">{show.sty}</p>
          <Button className="mt-5">예매하기</Button>
        </div>
      </Container>
    </div>
  );
};

export default ShowContainer;
