import React, { useEffect } from 'react';
// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded } from '../redux/show';
// 부트스트랩
import { Container, Row } from 'react-bootstrap';
// 참조 컴포넌트
import CustomPagenation from '../components/Pagination/CustomPagenation';
import CardList from '../components/Card/CardList';

const Search = () => {
  // 로딩 여부 상태
  const loading = useSelector((state) => state.show.loading);
  // 공연 리스트
  const showList = useSelector((state) => state.show.showList);

  // 디스패치
  const showDispatch = useDispatch();

  useEffect(() => {
    console.log('로딩중이에요?', loading);
    console.log('show 리스트', showList);
    if (showList.length !== 0) {
      showDispatch(isLoaded());
    }
  }, [showList]);

  return (
    <Container>
      {/* 임시로 테스트 카드 넣음 */}
      {loading ? <div>로딩중입니다</div> : <div>로딩 끝났습니다</div>}
      <Row className="justify-content-around gap-3 my-3">
        <h3>검색 결과</h3>
        <CardList />
      </Row>
      <CustomPagenation />
    </Container>
  );
};

export default Search;
