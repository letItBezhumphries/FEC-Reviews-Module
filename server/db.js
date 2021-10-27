const Sequelize = require('sequelize');
let sequelize;

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config({ path: "/opt/reviews/.deploy.env"});
  sequelize = new Sequelize(process.env.DB_NAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
    dialect: 'mysql',
    logging: false
  });
  console.log('connected to mysql in development!!')
} else {
  require('dotenv').config({ path: "/opt/reviews/.production.env"});
  sequelize = new Sequelize(process.env.DB_NAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
    dialect: 'mysql',
    logging: false,
  });
  console.log('connected to mysql in production!!')
}

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    defaultValue: 'BrokenTableDiner'
  },
  location: Sequelize.STRING,
  vip: Sequelize.STRING,
  reviewNumber: Sequelize.INTEGER
});

const Review = sequelize.define('review', {
  userId: Sequelize.INTEGER,
  restaurantId: Sequelize.STRING,
  reviewDate: Sequelize.DATEONLY,
  text: Sequelize.TEXT,
  tags: Sequelize.TEXT,
  overallScore: Sequelize.INTEGER,
  foodScore: Sequelize.INTEGER,
  serviceScore: Sequelize.INTEGER,
  ambienceScore: Sequelize.INTEGER,
  valueScore: Sequelize.INTEGER,
  noise: Sequelize.INTEGER,
  recommend: Sequelize.STRING
});

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

module.exports.sequelize = sequelize;
module.exports.Review = Review;
module.exports.User = User;
