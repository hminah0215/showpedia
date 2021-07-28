import React from 'react';
import { Modal } from 'react-bootstrap';

/*
  [props]
  show - 모달 온오프 여부를 판단하는 state (false,true)
  title - 모달 상단에 쓰일 제목 props
  handleClose - 모달 온오프 여부를 변경하는 함수
 */
const CustomModal = ({ show, title, children, handleClose }) => {
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {/* 모달에 들어갈 내용 */}
      <Modal.Body className="d-flex flex-column align-items-center">
        {/* children prop로 넘겨준다 */}
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
