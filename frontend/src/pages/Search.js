// 리액트 참조
import React, { useEffect } from 'react';
// 리덕스 참조
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded } from '../redux/show';
// 부트스트랩 참조
import { Container, Row, Spinner } from 'react-bootstrap';
// 컴포넌트 참조
import CustomPagenation from '../components/Pagination/CustomPagenation';
import CardList from '../components/Card/CardList';
import CustomSpinner from '../components/Spinner/CustomSpinner';

const Search = () => {
  // state
  // 로딩 여부
  const loading = useSelector((state) => state.show.loading);
  // 공연 리스트
  const showList = useSelector((state) => state.show.showList);

  // dispatch
  const showDispatch = useDispatch();

  // 로딩 여부를 위한 useEffect
  useEffect(() => {
    // showList에 msg가 있는 경우 === 일치하는 검색 결과가 없는 경우
    if (showList.msg) {
      showDispatch(isLoaded());
    }
    // showList에 데이터가 들어온 경우 === 로딩이 완료됨
    if (showList.length !== 0) {
      showDispatch(isLoaded());
    }
  }, [showList]);

  return (
    <Container>
      {loading ? (
        // 로딩중이라면 Spinner 컴포넌트를 렌더링
        <Row className="justify-content-around gap-3 my-3">
          <CustomSpinner size={'3rem'} margin={'3rem'} />
        </Row>
      ) : (
        <Row className="justify-content-center gap-3 my-3">
          <h3 className="main-title">검색 결과</h3>
          <CardList />
        </Row>
      )}
      <CustomPagenation />
    </Container>
  );
};

export default Search;
