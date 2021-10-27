const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const db = require('./db.js');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../.production.env' });
} else {
  require('dotenv').config({ path: '../.deploy.env' });
}

app.use(cors());
app.use('/', express.static(path.join(__dirname, '../public/dist')));
app.use('/restaurants/:restaurantId/reviews', express.static(path.join(__dirname, '../public/dist')));


// @route    GET api/users
// @desc     Get all registered users
// @access   Public
app.get('/api/users', (req, res) => {
  db.User.findAll()
    .then((users) => {
      res.send(users);
    });
});


// @route    GET api/restaurants/:id/reviews
// @desc     Get get all reviews for a restaurant with the given id
// @access   Public
app.get('/api/restaurants/:restaurantId/reviews', (req, res) => {
  db.Review.findAll({
    where: {
      restaurantId: req.params.restaurantId
    },
    include: [{
      model: db.User,
      attributes: ['id', 'username', 'location', 'vip', 'reviewNumber']
    }]
  })
    .then((reviews) => {
      res.send(reviews);
    });
});

// @route    GET api/restaurants/reviews
// @desc     Get all reviews for all restaurants
// @access   Public
app.get('/api/restaurants/reviews', (req, res) => {
  db.Review.findAll()
    .then((reviews) => {
      res.send(reviews);
    });
});

if (process.env.NODE_ENV !== 'production') {
  console.log('Application is running in development env!!!');
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const config = require("../webpack.dev");
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      writeToDisk: true,
      publicPath: config.output.publicPath,
      stats: 'errors-only'
    })
  );
} 

app.get('*', function (req, res) {
  res.status(404).send(`Use endpoints '/api/users', or '/api/restaurants/[restaurant ID]/reviews', or '/api/restaurants/reviews'`);
});

module.exports = app;
