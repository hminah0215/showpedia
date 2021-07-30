import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBoxofficeList, isLoaded } from '../redux/show';

// react-bootstrap
import { Container } from 'react-bootstrap';
// 참조 컴포넌트
import CarouselItem from '../components/Carousels/CarouselItem';
import Carousels from '../components/Carousels/Carousels';
import CustomSpinner from '../components/Spinner/CustomSpinner';
// etc
import axios from 'axios';

const Main = () => {
  // 로딩 상황을 알기 위한 state
  const loading = useSelector((state) => state.show.loading);
  // boxoffice List를 저장하는 state
  const boxofficeList = useSelector((state) => state.show.boxofficeList);
  // dispatch
  const showDispatch = useDispatch();

  // Main Page 첫 로딩 시, boxoffice 정보를 가져온다.
  // 가져온 boxoffice 데이터를 세션 스토리지에 저장한다
  useEffect(() => {
    // 가져오는 속도가 느리다 - 우선 만든 후에 loading spinner 넣어주기
    // 브라우저 세션 스토리지에 값을 저장하기..
    const getBoxofficeList = async () => {
      // 세션 스토리지에 저장된 boxoffice List가 있다면 세션 스토리지에서
      // boxoffice List 데이터를 가져온다. = 첫 로딩 시간이 너무 길기 때문...
      if (sessionStorage.getItem('boxoffice')) {
        const data = JSON.parse(sessionStorage.getItem('boxoffice'));
        showDispatch(setBoxofficeList(data));
        showDispatch(isLoaded());
        return;
      }
      const URL = 'http://localhost:3005/show/boxoffice';
      try {
        const result = await axios.get(URL);
        // state에 저장하기
        showDispatch(setBoxofficeList(result.data.data));
        // 세션에 저장하기
        // 세션에 저장하기 위해서 데이터를 DOMString 구조로 변환
        const data = JSON.stringify(result.data.data);
        sessionStorage.setItem('boxoffice', data);
        showDispatch(isLoaded());
      } catch (error) {
        console.error(error);
        return;
      }
    };
    getBoxofficeList();
  }, []);

  return (
    <>
      {loading ? (
        <Container className=" my-3">
          <h3 className="main-title">박스오피스</h3>
          <p>박스오피스 순위를 불러오고 있어요....</p>
          <div className="d-flex align-items-center justify-content-center">
            <CustomSpinner size={'3rem'} margin={'3rem'} />
          </div>
        </Container>
      ) : (
        <>
          <Container className=" position-relative my-3">
            <h3 className="main-title">박스오피스</h3>
            <Carousels>
              {boxofficeList.map((boxoffice) => (
                <CarouselItem key={boxoffice.mt20id} show={boxoffice}></CarouselItem>
              ))}
            </Carousels>
          </Container>
        </>
      )}
    </>
  );
};

export default Main;
