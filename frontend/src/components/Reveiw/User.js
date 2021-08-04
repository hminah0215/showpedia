import React from 'react';

const User = ({ url, text }) => {
  return (
    <div className="review-user d-flex flex-column align-items-center">
      <div className="review-user-img img-box">
        <img src={url ? url : 'https://www.w3schools.com/w3images/avatar2.png'} alt="user"></img>
      </div>
      <p className="review-user-title">{text}</p>
    </div>
  );
};

export default User;
