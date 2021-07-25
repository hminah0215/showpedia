import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CustomCard from './CustomCard';

const CardList = () => {
  // 카드 데이터를 전역 상태에서 가져오기
  const showList = useSelector((state) => state.show.showList);
  // showList의 상태가 변경 될 때마다 리 렌더링 되어야한다.
  useEffect(() => {}, [showList]);

  const cardList = showList ? (
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
  ) : (
    <div>검색 결과가 없어요!</div>
  );
  return <>{cardList}</>;
};

export default CardList;
