import React, { useState } from 'react';

// 리액트 라우터
import { useLocation, useHistory } from 'react-router-dom';

const BoardPagination = () => {
  // 페이지 네이션 처리를 위한 상태
  const [pagination, setPagination] = useState(1);

  // 페이지 이동을 위한 history
  const history = useHistory();

  // 페이지네이션 클릭 시, 작동하는 이벤트 핸들러
  const handleClickPageNumber = async (e) => {
    // 이동할 page는 페이지네이션 버튼 안에 있는 숫자
    const page = e.target.innerText;
    history.push(`/list?page=${e.target.innerText}`);

    const URL = `http://localhost:3005/board/list?page=${page}`;
  };
  return <div></div>;
};

export default BoardPagination;
