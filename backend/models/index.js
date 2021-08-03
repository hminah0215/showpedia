const Sequelize = require('sequelize'); // 시퀄라이즈 ORM 프레임워크 패키지 참조
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env]; // DB연결정보가 있는 config파일에서 development항목의 DB정보를 조회한다.
const db = {}; // DB관리 객체 생성

// 시퀄라이즈 ORM객체 생성시 관련 DB연결정보 전달생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// DB 객체에 시퀄라이즈 객체, 모듈을 속성에 바인딩
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Config = config;

// 만든 모델 가져오기
db.Member = require('./member.js')(sequelize, Sequelize);

db.Review = require('./review.js')(sequelize, Sequelize);
db.ReviewComment = require('./reviewComment.js')(sequelize, Sequelize);

db.Board = require('./board.js')(sequelize, Sequelize);
db.BoardComment = require('./boardComments.js')(sequelize, Sequelize);

// 관계 설정하기
// Member
db.Member.hasMany(db.Board, { foreignKey: 'memberId' });
db.Member.hasMany(db.BoardComment, { foreignKey: 'memberId' });
db.Member.hasMany(db.Review, { foreignKey: 'memberId' }); // member:review = 1:N
db.Member.hasMany(db.ReviewComment, { foreignKey: 'memberId' }); // member:reviewCmt = 1:N

// Review
db.Review.belongsTo(db.Member, { foreignKey: 'memberId' }); // review:member = N:1
db.Review.hasMany(db.ReviewComment, { foreignKey: 'memberId' }); // review:reviewCmt = 1:N
// Review Comment
db.ReviewComment.belongsTo(db.Review, { foreignKey: 'memberId' }); // reviewCmt:review = N:1

// board
db.Board.belongsTo(db.Member, { foreignKey: 'memberId' }); // board:member = N:1
db.Board.hasMany(db.BoardComment, { foreignKey: 'boardNo' }); // board:boardComments = 1:N
// boardComments
db.BoardComment.belongsTo(db.Board, { foreignKey: 'boardNo' }); // boardComments:board = N:1
db.BoardComment.belongsTo(db.Member, { foreignKey: 'memberId' }); // boardComments:member = N:1

// exports
module.exports = db;
