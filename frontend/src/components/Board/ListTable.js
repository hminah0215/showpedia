import React from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'; // 리덕스 훅스

// 민아) 7/27, 게시글 목록 + 상세보기 페이지 이동
const ListTable = ({ boardList }) => {
  // console.log('boardList?', boardList);
  const isLogin = useSelector((state) => state.auth.isLogin);
  // console.log('is게시글 로그인??', isLogin);

  return (
    <Table bordered hover responsive="xl" style={{ minWidth: '500px', textAlign: 'center' }}>
      <thead>
        <tr>
          <th style={{ width: '10%' }}>글번호</th>
          <th style={{ width: '40%' }}>제목</th>
          <th style={{ width: '10%' }}>카테고리</th>
          <th style={{ width: '15%' }}>작성자</th>
          <th style={{ width: '15%' }}>조회수</th>
          <th style={{ width: '15%' }}>작성일</th>
        </tr>
      </thead>
      <tbody>
        {boardList.map((item, index) => {
          let category = item.boardCategory;

          switch (category) {
            case 'notice':
              category = '공지';
              break;
            case 'free':
              category = '자유';
              break;
            case 'actor':
              category = '덕질';
              break;
            case 'together':
              category = '같이가요';
              break;
            default:
              break;
          }

          // 작성일 2021-07-31 이렇게 까지만 잘라서 보여주기
          let regDate = item.createdAt.slice(0, 10);

          return (
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
              <td>{category}</td>
              {/* 작성자의 닉네임이 보이도록! */}
              <td>{item.member.nickName}</td>
              <td>{item.boardHits}</td>
              <td>{regDate}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ListTable;
