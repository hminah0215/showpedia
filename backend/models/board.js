/*
  게시판 모델 
*/

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "board",
    {
      boardNo: {
        // 게시물번호
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      boardTitle: {
        // 게시글제목
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      boardCategory: {
        // 게시글 카테고리
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      boardContents: {
        // 게시글 내용
        type: DataTypes.TEXT,
        allowNull: false,
      },
      boardHits: {
        // 게시글 조회수
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      boardReports: {
        // 게시글 신고수
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0, // 신고수는 기본 0
      },
    },
    {
      timestamps: true,
      paranoid: false,
    }
  );
};
