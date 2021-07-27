import axios from 'axios';
import React, { useState } from 'react';
// 부트스트랩
import { Pagination } from 'react-bootstrap';

// 리액트 라우터
import { useLocation, useHistory } from 'react-router-dom';

// 민아) 7/27, 게시판에서 사용하는 페이지 네이션
// boardPerPage, totalPosts 페이지당 글의 수, 전체 게시물의 수,
const BoardPagination = ({ boardPerPage, totalBoardList, paginate }) => {
  // 백엔드에서 가져올 게시글 목록 데이터 구조정의
  const [boardList, setBoardList] = useState([]);

  // 페이지 네이션 처리를 위한 상태
  const [pagination, setPagination] = useState(1);

  // 페이지 이동을 위한 history
  const history = useHistory();
  // 총 페이지 넘버수 계산을 담을 배열
  const pageNumbers = [];

  const handleClickPageNumber = async (e) => {
    // 이동할 page는 페이지네이션 버튼 안에 있는 숫자
    const page = e.target.innerText;
    history.push(`/list?page=${e.target.innerText}`);

    // 백엔드에서 리스트 가져오기
    const URL = `http://localhost:3005/board/list?page=${page}`;
    try {
      const result = await axios.get(URL);
      // 상태에 검색 결과 저장하기
      const boardList = result.data.data ? result.data.data : { msg: '검색 결과가 없습니다' }; // undefined로 넘어올 경우 처리해주기
      setBoardList(boardList);
    } catch (error) {
      console.log('게시물 리스트를 가져오는데 실패했습니다');
      return false;
    }
  };

  // 전체 게시물의 수를 페이지당 글의수로 나눈것을 Math.ceil 함수로 소수점 이하를 올림한다.
  // 게시물이 100개고, 페이지당 보여줄 게시글수를 10이라고 하면 1,2,3,4,...,10 까지 생성됨!
  // for (let number = 1; number <= Math.ceil(totalBoardList / boardPerPage); number++) {
  //   pageNumbers.push(number);
  // }
  for (let number = 1; number <= Math.ceil(totalBoardList / boardPerPage); number++) {
    pageNumbers.push(number);
  }

  return (
    <div>
      <Pagination className="justify-content-center">
        <ul style={{ listStyleType: 'none', textAlign: 'center', float: 'left' }}>
          {/* 위에서 만든 pageNumbers 배열을 map함수로 요소하나씩 꺼내며 li를 만듬*/}
          {pageNumbers.map((number) => (
            <li
              key={number}
              style={{ listStyleType: 'none', display: 'inline-block' }}
              className="active"
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
