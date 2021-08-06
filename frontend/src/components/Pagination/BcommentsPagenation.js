import React from 'react';

// 부트스트랩
import { Pagination } from 'react-bootstrap';

const BcommentsPagenation = ({ perPage, commentList, paginate }) => {
  // 총 페이지 넘버수 계산을 담을 배열
  const pageNumbers = [];

  for (let number = 1; number <= Math.ceil(commentList / perPage); number++) {
    pageNumbers.push(number);
  }
  return (
    <div>
      <Pagination className="justify-content-center">
        <ul
          style={{ listStyleType: 'none', textAlign: 'center', float: 'left' }}
          className="pagination"
        >
          {/* 위에서 만든 pageNumbers 배열을 map함수로 요소하나씩 꺼내며 li를 만듬*/}
          {pageNumbers.map((number) => (
            <li
              key={number}
              style={{ listStyleType: 'none', display: 'inline-block' }}
              className="page-item"
            >
              {/* span onClick 이벤트 함수의 paginate은 
              BoardList.js의 setcurrentPage 함수의 인자로 number를 넘겨 현재페이지상태값을 변경한다. */}
              <span
                onClick={() => paginate(number)}
                className="page-link"
                style={{ color: '#6741d9' }}
              >
                {/* 숫자를 클릭하면 현재 페이지 상태값이 변경됨! */}
                {number}
              </span>
            </li>
          ))}
        </ul>
      </Pagination>
    </div>
  );
};

export default BcommentsPagenation;
