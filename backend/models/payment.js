/*
  결제 모델 
*/

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "payment",
    {
      paidAmount: {
        // 결제금액
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      payMethod: {
        // 결제수단 (카드, 카카오페이 ...)
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      paidTime: {
        // 결제 승인시각
        type: DataTypes.DATE,
        allowNull: true,
      },
      payStatus: {
        // 결제상태 (결제완료, 결제취소, 오류...)
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      cardNum: {
        // 카드 승인번호
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
