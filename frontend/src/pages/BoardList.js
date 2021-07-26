import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Tab, Table, Tabs } from 'react-bootstrap';

const BoardList = () => {
  // 게시판처음 들어왔을때, 전체 탭이 선택되어있도록 함
  const [key, setKey] = useState('all');

  // 백엔드에서 가져올 게시글 목록 데이터 구조정의
  const [boardList, setBoardList] = useState([]);

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
    default:
      console.log('디폴트');
      break;
  }

  useEffect(() => {
    // 노드 프로젝트에서 게시글목록을 부르는 주소

    axios
      .get(url + urls)
      .then((res) => {
        console.log('백엔드에서 제공된 전체 게시글목록 데이터 구조 파악', res);

        if (res.data.code === '200') {
          // 게시글 목록 세터함수를 통해 백엔드에서 전달된 json 배열을 데이터로 목록을 갱신한다.
          setBoardList(res.data.data);
        } else {
          alert('백엔드 호출 에러 발생 - 게시글목록');
        }
      })
      .catch((err) => {
        console.error(err);
      });
    //
  }, [key]); // key가 바뀔때마다 동작

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="all" title="전체">
          첫번째 내용들어감
          <Table bordered hover>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>글번호</th>
                <th style={{ width: '25%' }}>제목</th>
                <th>카테고리</th>
                <th>작성자</th>
                <th>조회수</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {boardList.map((item, index) => (
                <tr key={item.boardNo}>
                  <td style={{ textAlign: 'center' }}>{item.boardNo}</td>
                  <td>{item.boardTitle}</td>
                  <td>{item.boardCategory}</td>
                  <td>{item.memberId}</td>
                  <td>{item.boardHits}</td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="notice" title="공지">
          두번째 내용들어감
          <Table bordered hover>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>글번호</th>
                <th style={{ width: '25%' }}>제목</th>
                <th>카테고리</th>
                <th>작성자</th>
                <th>조회수</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {boardList.map((item, index) => (
                <tr key={item.boardNo}>
                  <td style={{ textAlign: 'center' }}>{item.boardNo}</td>
                  <td>{item.boardTitle}</td>
                  <td>{item.boardCategory}</td>
                  <td>{item.memberId}</td>
                  <td>{item.boardHits}</td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="free" title="자유">
          세번째 내용들어감
          <Table bordered hover>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>글번호</th>
                <th style={{ width: '25%' }}>제목</th>
                <th>카테고리</th>
                <th>작성자</th>
                <th>조회수</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {boardList.map((item, index) => (
                <tr key={item.boardNo}>
                  <td style={{ textAlign: 'center' }}>{item.boardNo}</td>
                  <td>{item.boardTitle}</td>
                  <td>{item.boardCategory}</td>
                  <td>{item.memberId}</td>
                  <td>{item.boardHits}</td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="actor" title="덕질">
          네번째 내용들어감
          <Table bordered hover>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>글번호</th>
                <th style={{ width: '25%' }}>제목</th>
                <th>카테고리</th>
                <th>작성자</th>
                <th>조회수</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {boardList.map((item, index) => (
                <tr key={item.boardNo}>
                  <td style={{ textAlign: 'center' }}>{item.boardNo}</td>
                  <td>{item.boardTitle}</td>
                  <td>{item.boardCategory}</td>
                  <td>{item.memberId}</td>
                  <td>{item.boardHits}</td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
};

export default BoardList;
