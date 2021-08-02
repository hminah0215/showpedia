import axios from 'axios';
import React, { useState } from 'react';
// 부트스트랩
import { Pagination } from 'react-bootstrap';

// 리액트 라우터
import { useHistory } from 'react-router-dom';
const BcommentsPagenation = ({ perPage, commentList, paginate }) => {
  // 백엔드에서 가져올 게시글 목록 데이터 구조정의
  const [comments, setComments] = useState([]);

  // 페이지 네이션 처리를 위한 상태
  const [pagination, setPagination] = useState(1);

  console.log('perPage', perPage); // 1
  console.log('commentList', commentList); // 12

  // 페이지 이동을 위한 history
  const history = useHistory();
  // 총 페이지 넘버수 계산을 담을 배열
  const pageNumbers = [];

  const handleClickPageNumber = async (e) => {
    // 이동할 page는 페이지네이션 버튼 안에 있는 숫자
    const page = e.target.innerText;
    history.push(`/comment?page=${e.target.innerText}`);

    console.log('이동할 댓글페이지', page);

    // 백엔드에서 리스트 가져오기
    const URL = `http://localhost:3005/comments?page=${page}`;
    try {
      const result = await axios.get(URL);
      // 상태에 검색 결과 저장하기
      const commentList = result.data.data ? result.data.data : { msg: '검색 결과가 없습니다' };
      setComments(commentList);
    } catch (error) {
      console.log('댓글리스트를 가져오는데 실패했습니다.');
      return false;
    }
  };

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
