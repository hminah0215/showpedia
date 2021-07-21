/* 
  찜목록 테이블
  찜목록한 공연 데이터를 저장한다.

*/
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('wishList', {
    // Post와 User의 관계는 알아서 생성해준다.
    wishNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    posterURL: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    posterTitle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    showId: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  });
};
