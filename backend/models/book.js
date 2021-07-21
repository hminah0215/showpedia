/*
  예약 모델 
*/

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "book",
    {
      bookNo: {
        // 예약번호
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      showId: {
        // 공연아이디
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      showDate: {
        // 예약일
        type: DataTypes.DATE,
        allowNull: false,
      },
      showPeople: {
        // 관람인원
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      showPrice: {
        // 가격
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      audienceTel: {
        // 관람객전화번호 (대표1인)
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      audienceName: {
        // 관람객 이름 (대표1인)
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
