/*
사용자 정보를 저장하는 모델
provider가 local이면 로컬로그인, kakao면 카카오 로그인을 한 것.(디폴트는 로컬)
*/

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'members',
    {
      memberId: {
        // 회원아이디
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
      },
      pwd: {
        // 비밀번호
        type: DataTypes.STRING(100),
        allowNull: true // 카카오 로그인은 비밀번호 안넘어오니까 null 허용!
      },
      nickName: {
        // 닉네임
        type: DataTypes.STRING(50),
        allowNull: false
      },
      profilePhoto: {
        // 프로필사진
        type: DataTypes.STRING(100),
        allowNull: true
      },
      memberRole: {
        // 권한 (일반회원인지 관리자인지)
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 // 1이면 회원 , 0이면 관리자
      },
      enabled: {
        // 활성화상태 (휴면계정, 정상계정 등 )
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 // 1이면 정상회원, 2면 정지 ...
      },
      provider: {
        // 로컬로그인인지 카카오로그인인지
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'local' // 기본 로컬, 카카오로그인시 kakao
      },
      snsId: {
        // 소셜로그인을 통해 가입하면 카카오id값을 저장해준다.
        type: DataTypes.STRING(50),
        allowNull: true
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
};
