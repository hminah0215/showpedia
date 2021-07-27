// 리액트 참조
import React from 'react';
// 리액트 라우터 참조
import { useHistory } from 'react-router-dom';
// 부트스트랩 참조
import { Card } from 'react-bootstrap';
// CSS 참조
import './CustomCard.css';

const CustomCard = ({ id, title, start, end, poster }) => {
  const history = useHistory();

  return (
    <Card
      lg="2"
      md="2"
      sm="6"
      className="align-items-center"
      // 공연 클릭 시, 해당 ID의 상세페이지로 이동
      onClick={() => {
        window.scrollTo(0, 0);
        history.push(`/contents/${id}`);
      }}
    >
      <div className="imgBox">
        <Card.Img variant="top" src={poster} />
      </div>
      <div className="card-textBox d-flex flex-column align-items-center ">
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {start}~{end}
        </Card.Text>
      </div>
    </Card>
  );
};

export default CustomCard;
