import React, { useEffect } from 'react';
// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded } from '../redux/show';
// 부트스트랩
import { Container, Row, Spinner } from 'react-bootstrap';
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

  // 로딩 여부를 위한 useEffect
  useEffect(() => {
    // showList에 데이터가 들어온 경우 === 로딩이 완료됨
    // showList에 msg가 있는 경우 === 일치하는 검색 결과가 없는 경우
    if (showList.msg) {
      showDispatch(isLoaded());
    }
    if (showList.length !== 0) {
      showDispatch(isLoaded());
    }
  }, [showList]);

  return (
    <Container>
      {loading ? (
        <Row className="justify-content-around gap-3 my-3">
          <Spinner
            animation="border"
            variant="secondary"
            role="status"
            style={{ width: '3rem', height: '3rem', margin: '3rem' }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <Row className="justify-content-around gap-3 my-3">
          <h3>검색 결과</h3>
          <CardList />
        </Row>
      )}
      <CustomPagenation />
    </Container>
  );
};

export default Search;
