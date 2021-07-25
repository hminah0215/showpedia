import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getShowList, resetShowList, isLoading } from '../../redux/show';
import axios from 'axios';
// css
import './CustomPagenation.css';
import { useHistory } from 'react-router-dom';

const CustomPagenation = () => {
  // showList
  const showDispatch = useDispatch();
  const history = useHistory();

  let items = [];
  // 페이지 클릭 시, 작동하는 이벤트 핸들러
  const handleClickPageNumber = async (e) => {
    // console.log('지금 눌린 값', e.target.innerText);
    // console.log('지금 눌린 값', e.target.classList);
    // console.log('지금 눌린 값', e.target.parentNode);
    // e.target.parentNode.classList.add('active');

    // showList를 다음 페이지로 변경한다.
    // 현재 들어있는 검색 결과값들 초기화하기
    showDispatch(resetShowList());
    // 다시 로딩 상태로 설정하기
    showDispatch(isLoading());

    history.push(`/search?page=${e.target.innerText}`);

    // 백엔드에서 리스트 가져오기
    // const URL = `http://localhost:3005/show/result`;
    // try {
    //   const result = await axios.post(URL);
    //   // 상태에 검색 결과 저장하기
    //   // console.log('데이터가 없는 경우 서버에서는 어떻게 던져줍니까?', result.data.data); // undefined
    //   const showList = result.data.data ? result.data.data : { msg: '검색 결과가 없습니다' }; // undefined로 넘어올 경우 처리해주기
    //   showDispatch(getShowList(showList));
    // } catch (error) {
    //   console.log('공연 리스트를 가져오는데 실패했습니다');
    //   return false;
    // }
  };

  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} onClick={handleClickPageNumber}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination className="justify-content-center customColor">
        <Pagination.Prev />
        <Pagination.Ellipsis />
        {items}
        <Pagination.Ellipsis />
        <Pagination.Next />
      </Pagination>
    </div>
  );
};

export default CustomPagenation;
