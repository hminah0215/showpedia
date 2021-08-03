import React from 'react';
// 부트스트랩 아이콘
import { StarFill } from 'react-bootstrap-icons';

const Stars = ({ handleClickStar, idx, star, rating }) => {
  // 만약 rating 이 존재하는 경우
  if (rating) {
    // rating만큼의 별은 색깔이 존재
    return rating >= idx ? <StarFill color="#845ef7" /> : <StarFill />;
  }

  // 리뷰 작성 시, 사용하는 컴포넌트
  return star >= idx ? (
    <StarFill onClick={() => handleClickStar(idx)} color="#845ef7" style={{ cursor: 'pointer' }} />
  ) : (
    <StarFill onClick={() => handleClickStar(idx)} style={{ cursor: 'pointer' }} />
  );
};

// export default Stars;
export default React.memo(Stars);
