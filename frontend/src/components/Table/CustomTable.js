import React from 'react';
import { Table } from 'react-bootstrap';

// 민아) 7/27, 게시글 목록 + 상세보기 페이지 이동
const CustomTab = ({ boardList }) => {
  // console.log('boardList?', boardList);

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>글번호</th>
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
            <td>{item.boardNo}</td>
            <td>
              <a href={`/board/${item.boardNo}`}>{item.boardTitle}</a>
            </td>
            <td>{item.boardCategory}</td>
            <td>{item.memberId}</td>
            <td>{item.boardHits}</td>
            <td>{item.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomTab;
