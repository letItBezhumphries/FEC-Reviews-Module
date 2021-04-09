const path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src/components/Index.jsx');
console.log(SRC_DIR);

module.exports = {
  entry: SRC_DIR,
  module: {
  rules: [
    {
      test: /\.m?(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/preset-env"],
          plugins: ["@babel/plugin-transform-runtime"],
        },
      },
    },
    {
      test: /\.(png|jpg)$/,
      type: 'asset/resource'
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource'
    },
    {
      test: /\.svg$/,
      use: ['@svgr/webpack']
    }
  ],
},
};