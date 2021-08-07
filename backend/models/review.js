/* 
  리뷰 테이블
  리뷰에 필요한 데이터 컬럼들을 정의한다
*/
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'reviews',
    {
      // Post와 User의 관계는 알아서 생성해준다.
      reviewNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      reviewContents: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      reviewLikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      reviewReports: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      showId: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      reviewStars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      timestamps: true
    }
  );
};
