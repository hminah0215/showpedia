import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getShowList, resetShowList, isLoading } from '../../redux/show';
import axios from 'axios';
// css
import './CustomPagenation.css';
import { useHistory } from 'react-router-dom';

const CustomPagenation = () => {
  const [pagination, setPagination] = useState(1);
  // 검색 조건 상태 그대로 가져오기
  const condition = useSelector((state) => state.show.condition);
  // showList
  const showDispatch = useDispatch();
  // history
  const history = useHistory();
  // location
  let location = useLocation();

  // 페이지 클릭 시, 작동하는 이벤트 핸들러
  const handleClickPageNumber = async (e) => {
    // showList를 다음 페이지로 변경한다.
    // 현재 들어있는 검색 결과값들 초기화하기
    showDispatch(resetShowList());
    // 다시 로딩 상태로 설정하기
    showDispatch(isLoading());

    const page = e.target.innerText;
    console.log('1번 클릭 시', e.target);
    console.log('1번 클릭 시', page);
    history.push(`/search?page=${e.target.innerText}`);

    // 백엔드에서 리스트 가져오기
    const URL = `http://localhost:3005/show/result?page=${page}`;
    try {
      const result = await axios.post(URL, condition);
      // 상태에 검색 결과 저장하기
      // console.log('데이터가 없는 경우 서버에서는 어떻게 던져줍니까?', result.data.data); // undefined
      const showList = result.data.data ? result.data.data : { msg: '검색 결과가 없습니다' }; // undefined로 넘어올 경우 처리해주기
      showDispatch(getShowList(showList));
    } catch (error) {
      console.log('공연 리스트를 가져오는데 실패했습니다');
      return false;
    }
  };

  let items = [];
  // 쿼리스트링에서 현재 선택된 페이지 정보 가져오기
  // console.log(location.search.split('=')[1]); // ?page=1
  const active = Number(location.search.split('=')[1]) || 1; // 현재 선택된 페이지

  const first = 2;
  const last = 5;
  // 페이지네이션 item 생성
  for (let number = first + (pagination - 1) * 4; number <= pagination * last; number++) {
    items.push(
      number === active ? (
        <Pagination.Item key={number} active onClick={handleClickPageNumber}>
          {number}
        </Pagination.Item>
      ) : (
        <Pagination.Item key={number} onClick={handleClickPageNumber}>
          {number}
        </Pagination.Item>
      )
    );
  }

  return (
    <div>
      <Pagination className="justify-content-center customColor">
        <Pagination.Prev
          onClick={() => {
            if (pagination === 1) {
              return;
            }
            setPagination(pagination - 1);
          }}
        />
        {active === 1 ? (
          <Pagination.Item key={1} active>
            1
          </Pagination.Item>
        ) : (
          <Pagination.Item
            key={1}
            onClick={(e) => {
              handleClickPageNumber(e);
              setPagination(1);
            }}
          >
            1
          </Pagination.Item>
        )}

        <Pagination.Ellipsis />
        {items}
        <Pagination.Next
          onClick={() => {
            setPagination(pagination + 1);
          }}
        />
      </Pagination>
    </div>
  );
};

export default CustomPagenation;
