import React, { useEffect, useState } from 'react';
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
  // dispatch
  const showDispatch = useDispatch();
  // boxList
  const [boxofficeList, setBoxofficeList] = useState({});

  useEffect(() => {
    const getBoxofficeList = async () => {
      const URL = 'http://www.showpedia.xyz:3005/show/boxoffices';
      try {
        // 전체 공연 TOP 10
        const result = await axios.get(URL);
        if (Object.keys(result.data).length === 0) {
          return;
        }
        // if(result.data)
        setBoxofficeList({
          boxoffice: result.data.boxoffice.boxoffice,
          aaaa_box: result.data.boxoffice.aaaa_box,
          ccca_box: result.data.boxoffice.ccca_box
        });

        showDispatch(isLoaded());
        return;
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
          <h3 className="main-title">박스오피스 TOP 10</h3>
          <p>박스오피스 순위를 불러오고 있어요....</p>
          <div className="d-flex align-items-center justify-content-center">
            <CustomSpinner size={'3rem'} margin={'3rem'} />
          </div>
        </Container>
      ) : (
        <>
          <Container className=" position-relative my-3">
            <h3 className="main-title">박스오피스 TOP 10</h3>
            {boxofficeList.boxoffice ? (
              <Carousels>
                {boxofficeList.boxoffice.map((box) => (
                  <CarouselItem key={box.mt20id} show={box}></CarouselItem>
                ))}
              </Carousels>
            ) : (
              <></>
            )}
          </Container>

          <Container className=" position-relative my-3">
            <h3 className="main-title">뮤지컬 TOP 10</h3>
            {boxofficeList.ccca_box ? (
              <Carousels>
                {boxofficeList.ccca_box.map((box) => (
                  <CarouselItem key={box.mt20id} show={box}></CarouselItem>
                ))}
              </Carousels>
            ) : (
              <></>
            )}
          </Container>

          <Container className=" position-relative my-3">
            <h3 className="main-title">공연 TOP 10</h3>
            {boxofficeList.aaaa_box ? (
              <Carousels>
                {boxofficeList.aaaa_box.map((box) => (
                  <CarouselItem key={box.mt20id} show={box}></CarouselItem>
                ))}
              </Carousels>
            ) : (
              <></>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Main;
