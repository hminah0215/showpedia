import React from 'react';
import { useSelector } from 'react-redux';
// 컴포넌트 참조
import CustomCard from './CustomCard';
import NotFound from '../NotFound/NotFound';

const CardList = () => {
  // 카드 데이터를 전역 상태에서 가져오기
  const showList = useSelector((state) => state.show.showList);

  // showList에 배열이 아닌 msg가 들어있는 경우 === 조건에 맞는 검색 결과가 없음
  const cardList = showList.msg ? (
    <NotFound msg={showList.msg} />
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
