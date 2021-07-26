import React from 'react';
// 부트스트랩
import { Container, Button } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
// CSS
import './ShowContainer.css';
const ShowContainer = () => {
  return (
    <div className="show-container d-flex justify-content-center">
      <Container className="d-flex justify-content-between row">
        {/* 공연 포스터 */}
        <div className="test">
          <div className="show-poster me-4">
            <StarFill className="show-star" />
            <img
              className="img-box"
              src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF177643_210726_135841.gif"
            ></img>
          </div>
        </div>

        {/* 공연 정보 */}
        <div className="show-content col-xl-5 col-lg-8 col-md-7 col-sm-6 col-12">
          <h3 className="show-title">has been the industry's</h3>
          <p className="show-text">블루스퀘어 (신한카드홀(구. 인터파크홀))</p>
          <p className="show-text">2시간 45분</p>
          <p className="show-text">VIP석 150,000원, R석 130,000원, S석 100,000원, A석 70,000원</p>
          <p className="show-text">2021.05.18 ~ 2021.08.01</p>
          <p className="show-text">김준수, 전동석, 신성록, 조정은, 임혜영, 박지연, 강태을</p>
        </div>

        {/* 공연 줄거리 & 예매 버튼 */}
        <div className="d-flex show-story flex-column coljustify-content-end  col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
          <p className="show-sty show-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <Button className="mt-5">예매하기</Button>
        </div>
      </Container>
    </div>
  );
};

export default ShowContainer;
