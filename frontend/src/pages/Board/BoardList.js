import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// 부트스트랩
import { Button, Container, Tab, Tabs } from 'react-bootstrap';
// CSS
import './BoardList.css';

// 컴포넌트 참조
import BoardPagination from '../../components/Pagination/BoardPagination';
import ListTable from '../../components/Board/ListTable';

// etc
import axios from 'axios';

// 민아) 7/27, 게시글 목록 & 페이지네이션
const BoardList = () => {
  // 게시판처음 들어왔을때, 전체 탭이 선택되어있도록 함
  // useState('all') 이라고 써도 되고 그냥 () 냅둬도 디폴트값으로 똑같이 전체페이지가 먼저 보임
  const [key, setKey] = useState('all');

  // 백엔드에서 가져올 게시글 목록 데이터 구조정의
  const [boardList, setBoardList] = useState([]);

  // 페이지네이션 관련
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [boardPerPage, setBoardPerPage] = useState(15); // 총데이터를 postsPerPage 만큼 분할해서 보여줄것, 15면 한페이지에 15개

  const history = useHistory();

  const url = 'http://localhost:3005/board/list?';
  let urls = '';

  switch (key) {
    case 'all':
      urls = '';
      break;
    case 'notice':
      urls = 'boardCategory=notice';
      break;
    case 'free':
      urls = 'boardCategory=free';
      break;
    case 'actor':
      urls = 'boardCategory=actor';
      break;
    case 'together':
      urls = 'boardCategory=together';
      break;
    default:
      break;
  }

  useEffect(() => {
    // 노드 프로젝트에서 게시글목록을 부르는 주소
    axios
      .get(url + urls)
      .then((res) => {
        // console.log('백엔드에서 제공된 전체 게시글목록 데이터 구조 파악', res);

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
    currentPosts = data.slice(indexOfFirst, indexOfLast); // 현재페이지
    return currentPosts;
  }

  // 로그인 여부 파악
  const isLogin = useSelector((state) => state.auth.isLogin);

  const boardCategory = [
    { all: '전체' },
    { notice: '공지' },
    { free: '자유' },
    { actor: '덕질' },
    { together: '같이가요' }
  ];

  return (
    // Container로 감싸기, className으로 공통된 마진값 주기
    <Container className="my-3 container">
      <h3 className="main-title">게시판</h3>

      <div className="board-info">
        <p>로그인 하지않으면, 게시글을 볼 수 없습니다.</p>
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
        {/* 탭 별 게시글 리스트 */}
        {boardCategory.map((item, idx) => {
          const key = String(Object.keys(item));
          const title = String(Object.values(item));

          return (
            <Tab key={idx} eventKey={key} title={title}>
              <ListTable boardList={currentPosts(boardList)} />
            </Tab>
          );
        })}
      </Tabs>
      {/* 페이지네이션 */}
      <BoardPagination
        boardPerPage={boardPerPage}
        totalBoardList={boardList.length}
        paginate={setCurrentPage}
      ></BoardPagination>
    </Container>
  );
};

export default BoardList;
