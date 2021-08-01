import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'; // 리덕스 훅스

// 민아) 7/27, 게시글 목록 + 상세보기 페이지 이동
const CustomTable = ({ boardList }) => {
  // console.log('boardList?', boardList);
  const isLogin = useSelector((state) => state.auth.isLogin);
  // console.log('is게시글 로그인??', isLogin);

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
            {/* 로그인 한 사용자들만 게시글 상세보기 가능  */}
            {isLogin ? (
              <td>
                <a href={`/board/view/${item.boardNo}`} className="custom-a">
                  {item.boardTitle}
                </a>
              </td>
            ) : (
              <td>{item.boardTitle}</td>
            )}

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

export default CustomTable;
