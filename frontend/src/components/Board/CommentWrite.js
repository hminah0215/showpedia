import React from 'react';
import { Form, Button } from 'react-bootstrap';

const CommentWrite = ({
  setWrite,
  write,
  item,
  nullError,
  onEditComment,
  upComment,
  updateComment
}) => {
  return (
    write && (
      <>
        <Form
          className="d-flex align-items-center flex-wrap"
          style={{ width: '100%' }}
          onSubmit={(e) => {
            onEditComment(e);
            setWrite(false);
          }}
        >
          <Form.Group className="mb-3" style={{ width: '100%' }}>
            <Form.Label className="checktext" style={{ color: 'gray' }}>
              욕설,비방,도배 등의 댓글은 삭제될 수 있습니다.
              <p style={{ display: 'none' }} id="commentNo">
                {item.boardCommentNo}
              </p>
            </Form.Label>
            {/* 수정 텍스트 에어리어 */}
            <Form.Control
              style={{ width: '100%' }}
              as="textarea"
              rows={3}
              cols={100}
              id={item.boardCommentNo}
              onChange={upComment}
              value={updateComment}
              placeholder="수정할내용을 작성해주세요"
            />
            {/* 댓글등록시 내용이 없으면 (nullError가 true이면) 경고메시지 보이기 */}
            {nullError === false ? (
              ''
            ) : (
              <Form.Label className="checktext" style={{ color: 'red' }}>
                댓글내용을 입력해주세요.
              </Form.Label>
            )}
          </Form.Group>

          <Button type="submit" style={{ width: '100%' }}>
            댓글수정
          </Button>
        </Form>
      </>
    )
  );
};

export default CommentWrite;
