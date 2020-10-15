const db = require('../server/db.js');

db.sequelize
  .query('CREATE DATABASE IF NOT EXISTS Review_Module')
  .then(() => console.log('Review_Module database created'))
  .then(() => process.exit())
  .catch((err) => console.log('Error in postinstall database creation ', err));
