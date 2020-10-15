const db = require('../server/db.js');
const seedingData = require('./seedingData.js');

//inserting USERS to the database
var counterUser = 0;
var counterReview = 0;

var insertData = (username) => {
  if (counterUser < 50) {
    db.User.create({
      username: username,
      location: seedingData.userLocation(),
      vip: seedingData.userVip(),
      reviewNumber: seedingData.userReviewNumber()
    })
      .then(() => {
        counterUser++;
        insertData(seedingData.userNameFull());
      });
  } else if (counterUser >= 50 && counterReview < 150) {
    db.Review.create({
      userId: seedingData.randUserId(),
      restaurantId: seedingData.randRestaurantId(),
      reviewDate: seedingData.randDate(),
      text: seedingData.reviewText(),
      tags: seedingData.randTags(),
      foodScore: seedingData.randFood(),
      serviceScore: seedingData.randService(),
      ambienceScore: seedingData.randAmbience(),
      valueScore: seedingData.randValue(),
      overallScore: seedingData.randOverall(),
      noise: seedingData.randNoise(),
      recommend: seedingData.recommendation()
    })
      .then(() => {
        counterReview++;
        insertData(seedingData.userNameFull());
      });
  } else if (counterUser >= 50 && counterReview >= 150) {
    process.exit();
  }
};

db.sequelize
  .sync({ force: true })
  .then(() => {
    insertData(seedingData.userNameFull());
  })
  .then(() => console.log('Connected to database, tables synced'))
  .catch(err => {
    console.error('Unable to connect to database', err);
  });