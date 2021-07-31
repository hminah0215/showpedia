import React from 'react';
import KaKaoLogin from 'react-kakao-login';

const Profile = () => {
  return (
    <div>
      <a
        href="http://localhost:3005/kakao"
        style={{ textDecoration: 'none', color: 'black' }}
        onClick={() => {
          // history.push({ pathname: '/' });
        }}
      >
        카카오 로그인
      </a>
    </div>
  );
};

export default Profile;
