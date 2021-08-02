// 리액트
import React, { useCallback, useState } from 'react';
// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { getShowList, resetShowList, isLoading } from '../../redux/show';
// 리액트 라우터
import { useLocation, useHistory } from 'react-router-dom';
// 부트스트랩
import { Pagination } from 'react-bootstrap';
// etc 참조
import axios from 'axios';

const CustomPagenation = () => {
  // state
  // 페이지 네이션 처리를 위한 상태
  const [pagination, setPagination] = useState(1);
  // 검색 조건 상태
  const condition = useSelector((state) => state.show.condition);

  // dispatch
  const showDispatch = useDispatch();

  // 페이지 이동을 위한 history
  const history = useHistory();
  // 쿼리스트링을 사용하기 위한 location
  let location = useLocation();

  // 페이지네이션 클릭 시, 작동하는 이벤트 핸들러
  const handleClickPageNumber = useCallback(
    async (e) => {
      // showList를 다음 페이지로 변경한다.
      // 현재 들어있는 검색 결과값들 초기화하기
      showDispatch(resetShowList());
      // 다시 로딩 상태로 설정하기
      showDispatch(isLoading());

      // 이동할 page는 페이지네이션 버튼 안에 있는 숫자
      const page = e.target.innerText;
      history.push(`/search?page=${e.target.innerText}`);

      // 백엔드에서 리스트 가져오기
      const URL = `http://localhost:3005/show/result?page=${page}`;
      try {
        const result = await axios.post(URL, condition);
        // 상태에 검색 결과 저장하기
        const showList = result.data.data ? result.data.data : { msg: '검색 결과가 없습니다' }; // undefined로 넘어올 경우 처리해주기
        showDispatch(getShowList(showList));
      } catch (error) {
        console.log('공연 리스트를 가져오는데 실패했습니다');
        return false;
      }
    },
    [showDispatch, history, condition]
  );

  let paginationItems = [];
  // 쿼리스트링에서 현재 선택된 페이지 정보 가져오기
  // console.log(location.search.split('=')[1]); // ?page=1
  const active = Number(location.search.split('=')[1]) || 1; // 현재 선택된 페이지

  // 페이지네이션 컴포넌트 생성을 위한 변수
  const first = pagination === 1 ? 2 : 0; // 초기 시작값
  const last = 5; // 초기 마지막값
  // 페이지네이션 item 생성
  // 페이지네이션이 첫번째 페이지라면 2~5까지 표시
  // 두번째 페이지라면 5~10까지 표시...
  for (let number = first + (pagination - 1) * 5; number <= pagination * last; number++) {
    paginationItems.push(
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
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => {
            // 페이지는 음수가 될 수 없다.
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
        {paginationItems}
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
