import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// 부트스트랩
import { Container, Spinner } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';
// 컴포넌트 참조
import CustomCard from './CustomCard';

const CardList = () => {
  // 카드 데이터를 전역 상태에서 가져오기
  const showList = useSelector((state) => state.show.showList);

  // showList에 배열이 아닌 msg가 들어있는 경우 === 조건에 맞는 검색 결과가 없음
  const cardList = showList.msg ? (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <QuestionCircle className="m-4" size={96} color="#dee2e6" />
      <span className="pb-2">{showList.msg}</span>
    </Container>
  ) : (
    showList.map((show) => (
      <CustomCard
        key={show.mt20id}
        id={show.mt20id}
        title={show.prfnm}
        start={show.prfpdfrom}
        end={show.prfpdto}
        poster={show.poster}
      />
    ))
  );
  return <>{cardList}</>;
};

export default CardList;
