import React from 'react';
import { Modal } from 'react-bootstrap';
import ReviewItem from '../Reveiw/ReviewItem';

const CustomModal = ({ show, title, column, children, handleClose }) => {
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>리뷰 상세보기</Modal.Title>
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
