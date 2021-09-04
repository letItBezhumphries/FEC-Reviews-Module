require('dotenv').config();
const express = require('express');
const connectDB = require('../database/index');
// const path = require('path');
// const cors = require('cors');
const app = express();
// const DIST_DIR = path.join(__dirname, '../public/dist');
const PORT = process.env.PORT || 3003;

// Connect Database
connectDB();

// Init Middleware
app.use(
  express.json({
    extended: false
  })
);

app.get('/*', (req, res) => {
  res.send('Hello World!!!');
});

app.listen(PORT, () => {
  console.log(`server running at: ${PORT}`);
});
