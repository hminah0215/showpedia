/*
  게시판 댓글 모델 
*/

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'boardComments',
    {
      boardCommentNo: {
        // 댓글번호
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      boardCommentContents: {
        // 댓글내용
        type: DataTypes.STRING(500),
        allowNull: false
      },
      boardCommentRef: {
        // 대댓글 처리시 사용할듯
        type: DataTypes.INTEGER,
        allowNull: true
      },
      boardCommentReports: {
        // 댓글 신고수
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0 // 신고수는 기본 0
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
};
