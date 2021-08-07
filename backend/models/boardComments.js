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
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
};
