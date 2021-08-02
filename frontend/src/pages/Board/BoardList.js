import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// 부트스트랩
import { Button, Container, Tab, Tabs } from 'react-bootstrap';

// 컴포넌트 참조
import BoardPagination from '../../components/Pagination/BoardPagination';
import ListTable from '../../components/Board/ListTable';

// 민아) 7/27, 게시글 목록 & 페이지네이션
const BoardList = () => {
  // 게시판처음 들어왔을때, 전체 탭이 선택되어있도록 함
  // useState('all') 이라고 써도 되고 그냥 () 냅둬도 디폴트값으로 똑같이 전체페이지가 먼저 보임
  const [key, setKey] = useState('all');

  // 백엔드에서 가져올 게시글 목록 데이터 구조정의
  const [boardList, setBoardList] = useState([]);

  // 페이지네이션 관련
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [boardPerPage, setBoardPerPage] = useState(10); // 총데이터를 postsPerPage 만큼 분할해서 보여줄것

  const history = useHistory();

  const url = 'http://localhost:3005/board/list?';
  let urls = '';

  switch (key) {
    case 'all':
      console.log('전체 선택');
      urls = '';
      break;
    case 'notice':
      urls = 'boardCategory=notice';
      console.log('notice 선택');
      break;
    case 'free':
      urls = 'boardCategory=free';
      console.log('free 선택');
      break;
    case 'actor':
      urls = 'boardCategory=actor';
      console.log('actor 선택');
      break;
    case 'together':
      urls = 'boardCategory=together';
      console.log('together 선택');
      break;
    default:
      console.log('디폴트 - 전체게시글목록');
      break;
  }

  useEffect(() => {
    // 노드 프로젝트에서 게시글목록을 부르는 주소
    axios
      .get(url + urls)
      .then((res) => {
        // console.log('백엔드에서 제공된 전체 게시글목록 데이터 구조 파악', res);

        console.log('목록res', res);

        if (res.data.code === '200') {
          // 게시글 목록 세터함수를 통해 백엔드에서 전달된 json 배열을 데이터로 목록을 갱신한다.
          setBoardList(res.data.data);
        } else {
          alert('백엔드 호출! 에러 발생 - 게시글목록');
        }
      })
      .catch((err) => {
        console.error(err);
      });
    //
  }, [key]); // key가 바뀔때마다 동작

  // 페이지네이션 관련 추가

  // 해당페이지의 첫번째와 마지막 인덱스 번호값을 구한다.
  const indexOfLast = currentPage * boardPerPage;
  const indexOfFirst = indexOfLast - boardPerPage;

  // 배열 데이터를 slice 함수로 분할 해서 새로운 배열을 리턴한다.
  function currentPosts(data) {
    let currentPosts = 0;
    currentPosts = data.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  // 로그인 여부 파악
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    // Container로 감싸기, className으로 공통된 마진값 주기
    <Container className="my-3 container">
      <h3 className="main-title" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        게시판
      </h3>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}
      >
        <p style={{ margin: '0' }}>로그인 하지않으면, 게시글을 볼 수 없습니다.</p>
        {isLogin && (
          <Button
            onClick={() => {
              history.push({ pathname: '/board/regist' });
            }}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            글쓰기
          </Button>
        )}
      </div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="all" title="전체">
          <ListTable boardList={currentPosts(boardList)} />
        </Tab>
        <Tab eventKey="notice" title="공지">
          <ListTable boardList={currentPosts(boardList)} />
        </Tab>
        <Tab eventKey="free" title="자유">
          <ListTable boardList={currentPosts(boardList)} />
        </Tab>
        <Tab eventKey="actor" title="덕질">
          <ListTable boardList={currentPosts(boardList)} />
        </Tab>
        <Tab eventKey="together" title="같이가요">
          <ListTable boardList={currentPosts(boardList)} />
        </Tab>
      </Tabs>
      <BoardPagination
        boardPerPage={boardPerPage}
        totalBoardList={boardList.length}
        paginate={setCurrentPage}
      ></BoardPagination>
    </Container>
  );
};

export default BoardList;
