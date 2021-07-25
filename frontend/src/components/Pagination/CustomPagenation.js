import React from 'react';
import { Pagination } from 'react-bootstrap';
// css
import './CustomPagenation.css';

let active = 2;
let items = [];
for (let number = 2; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}
const CustomPagenation = () => {
  return (
    <div>
      <Pagination className="justify-content-center customColor">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        {items}
        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
};

export default CustomPagenation;
