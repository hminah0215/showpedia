import React, { useEffect, useState } from 'react';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import CommentWrite from './CommentWrite';
import axios from 'axios';

const CommentItem = ({
  loginMemberId,
  item,
  // deleteComment,
  setReRender,
  onEditComment,
  updateComment,
  upComment,
  nullError,
  reRender
}) => {
  const [modify, setModify] = useState(false);
  const [write, setWrite] = useState(false);

  // 유저 정보 memberId
  // date 형식 수정
  const regDate = item.createdAt.slice(0, 10);

  // useEffect 안에서 비교
  // 그렇지 않으면 계속 렌더링이 일어남
  useEffect(() => {
    // 댓글 작성유저 === 현재 로그인한 유저
    if (loginMemberId === item.memberId) {
      setModify(true);
    }
  }, [loginMemberId, item]);

  const deleteComment = (e) => {
    e.preventDefault();
    console.log('삭제될 게시글 번호를 찍어주세요', item.boardCommentNo);

    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      axios
        .delete('http://localhost:3005/comments', { data: { boardCommentNo: item.boardCommentNo } })
        .then((result) => {
          if (result.data.code === '200') {
            // 댓글 삭제후 목록 리렌더링
            setReRender(!reRender);
            alert('댓글이 삭제되었습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="comment-container">
      {/* 댓글 란 */}
      <header className="comment-header">
        <p>{item.member.nickName}</p>
        <p className="mb-0">{regDate}</p>
      </header>
      <hr style={{ margin: '0.5rem 0' }} />
      <p>{item.boardCommentContents}</p>

      {/* 수정 버튼 클릭 시, 댓글 수정창 띄우기 */}
      {write && (
        <div>
          <CommentWrite
            setWrite={setWrite}
            onEditComment={onEditComment}
            write={write}
            item={item}
            upComment={upComment}
            updateComment={updateComment}
            nullError={nullError}
          />
        </div>
      )}

      {/* 본인이 쓴 댓글만 수정,삭제가능 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          flexWrap: 'wrap'
        }}
      >
        {/* 수정 버튼 클릭 시, 수정 컴포넌트 렌더링 */}

        {/* 내 댓글만 수정, 삭제 아이콘 보이기 */}
        {modify && (
          <div>
            <PencilSquare
              onClick={() => {
                // 수정 버튼 클릭 시, 쓰기 모드로 전환
                setWrite(true);
              }}
              className="comment-btn"
            ></PencilSquare>
            <Trash onClick={deleteComment} className="comment-btn"></Trash>
          </div>
        )}
      </div>
      {/* ismodify 끝, 본인이 쓴 댓글에만 나타나는 부분   */}
    </div>
  );
};

// export default React.memo(CommentItem);
export default CommentItem;
