/* 
  리뷰 댓글 테이블
  리뷰 댓글에 필요한 데이터 컬럼들을 정의한다
*/
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'reviewComments',
    {
      // Post와 User의 관계는 알아서 생성해준다.
      reviewCommentNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      reviewCommentContents: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      reviewCommentLikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      reviewCommentReports: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      // 부모 댓글의 No값을 넣는다. 없다면 null
      reviewCommentRef: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      timestamps: true
    }
  );
};
