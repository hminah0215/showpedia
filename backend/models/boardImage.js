/*
  게시글 이미지 모델 
*/

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "boardImage",
    {
      boardImageFileName: {
        // 파일명
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      boardImageFilePath: {
        // 파일경로
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
