import React, { useEffect, useState } from 'react';
// 부트스트랩
import { Container, Button } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import { useHistory, useLocation } from 'react-router-dom';
// CSS
import './ShowContainer.css';
// etc
import axios from 'axios';

const ShowContainer = ({ setIsFetch, showId }) => {
  // 공연 상세정보 state
  const [show, setShow] = useState({
    mt20id: '',
    prfnm: '공연명', // 공연 이름
    prfpdfrom: '공연 시작일', // 공연 시작일
    prfpdto: '공연 종료일', // 공연 종료일
    fcltynm: '공연 장소', // 공연 장소
    prfcast: '배우들', // 배우들
    prfruntime: '공연 시간', // 공연 시간
    pcseguidance: '공연 가격', // 공연 가격
    poster: '', // poster URL
    sty: '줄거리가 없습니다.' // 줄거리
  });

  // 페이지 이동을 위한 history
  const history = useHistory();

  // 첫 로딩 시, 공연 상세 데이터를 가져온다.
  // useEffect에 async를 사용하지 않는다.
  useEffect(() => {
    // 첫 로딩 시, 공연 id 값 설정
    setShow({
      ...show,
      mt20id: showId
    });
    // 백엔드에서 공연 상세 데이터 가져오기
    const URL = `http://localhost:3005/show/${showId}`;
    const fetchData = async () => {
      try {
        const result = await axios.get(URL);
        // console.log('올바른 데이터를 가져왔는가?', result.data.data);
        const showData = result.data.data[0];
        setShow({
          prfnm: showData.prfnm, // 공연 이름
          prfpdfrom: showData.prfpdfrom, // 공연 시작일
          prfpdto: showData.prfpdto, // 공연 종료일
          fcltynm: showData.fcltynm, // 공연 장소
          prfcast: showData.prfcast, // 배우들
          prfruntime: showData.prfruntime, // 공연 시간
          pcseguidance: showData.pcseguidance, // 공연 가격
          poster: showData.poster, // poster URL
          sty: showData.sty[0] !== ' ' ? showData.sty : '줄거리가 없습니다' // 줄거리
        });
        return;
      } catch (error) {
        setIsFetch(false);
        return;
      }
    };
    fetchData();
  }, []);

  // 즐겨찾기 토글 이벤트 핸들러
  const handleClickStar = (e) => {
    e.target.classList.toggle('active');
    console.log('show 데이터 테스트용 콘솔 입니다', show);
  };

  return (
    <div className="show-container d-flex justify-content-center">
      <Container className="d-flex justify-content-between row">
        {/* 공연 포스터 */}
        <div className="show-poster-box">
          <div className="show-poster me-4">
            <StarFill className="show-star" onClick={handleClickStar} />
            <img src={show.poster}></img>
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
