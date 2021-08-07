import React from 'react';
// 부트스트랩
import { Pagination } from 'react-bootstrap';

// 민아) 7/27, 게시판에서 사용하는 페이지 네이션
// boardPerPage, totalPosts 페이지당 글의 수, 전체 게시물의 수,
const BoardPagination = ({ boardPerPage, totalBoardList, paginate }) => {
  // 총 페이지 넘버수 계산을 담을 배열
  const pageNumbers = [];

  // 전체 게시물의 수를 페이지당 글의수로 나눈것을 Math.ceil 함수로 소수점 이하를 올림한다.
  // 게시물이 100개고, 페이지당 보여줄 게시글수를 10이라고 하면 1,2,3,4,...,10 까지 생성됨!

  for (let number = 1; number <= Math.ceil(totalBoardList / boardPerPage); number++) {
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
export default BoardPagination;
