import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

// 참조 컴포넌트
import CustomPagenation from '../components/Pagination/CustomPagenation';
import CardList from '../components/Card/CardList';

const Search = () => {
  return (
    <>
      {/* 임시로 테스트 카드 넣음 */}
      <Row className="justify-content-center gap-3 my-3">
        <CardList />
      </Row>
      <CustomPagenation />
    </>
  );
};

export default Search;
