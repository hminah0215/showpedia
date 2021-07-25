import React from 'react';
import { Spinner } from 'react-bootstrap';

const CustomSpinner = ({ size, margin }) => {
  return (
    <Spinner
      animation="border"
      variant="secondary"
      role="status"
      style={{ width: size, height: size, margin: margin }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default CustomSpinner;
