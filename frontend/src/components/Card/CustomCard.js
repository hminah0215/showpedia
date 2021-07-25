import React from 'react';
import { Card } from 'react-bootstrap';

const CustomCard = ({ id, title, start, end, poster }) => {
  return (
    <Card style={{ width: '15rem' }} lg="2" md="3" sm="4" className="align-items-center">
      <div style={{ width: '180px', height: '240px', marginTop: '1rem' }}>
        <Card.Img
          variant="top"
          src={poster}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div
        style={{
          padding: '1rem'
        }}
      >
        <Card.Title
          className="h6"
          style={{
            fontWeight: 'bold'
          }}
        >
          {title}
        </Card.Title>
        <Card.Text
          style={{
            fontSize: '0.8rem'
          }}
        >
          {start}~{end}
        </Card.Text>
      </div>
    </Card>
  );
};

export default CustomCard;
