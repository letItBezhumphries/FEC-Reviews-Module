const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
var DIST_DIR = path.join(__dirname, '/public/dist');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //to clean out dist folder
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const packageJson = require('./package.json');

const devConfig = {
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: "http://127.0.0.1:9002/",
    assetModuleFilename: "[name][ext]",
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "./public/dist"),
    index: 'index.html',
    compress: true,
    host: '127.0.0.1',
    writeToDisk: true,
    port: 9002,
    historyApiFallback: {
      index: "index.html"
    },
    proxy: {
      "/restaurants/:id/reviews": "http://127.0.0.1:1337/restaurants/:id/reviews",
      "/api/users": "http://127.0.0.1:1337/api/users",
      "/api/restaurants/:id/reviews": "http://127.0.0.1:1337/api/restaurants/:id/reviews",
      "/api/restaurants/reviews": "http://127.0.0.1:1337/api/restaurants/reviews",
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*']
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "./public/reviewsStyle.css" }
    //   ]
    // }),
    new Dotenv({
      path: "./.env",
      allowEmptyValues: true,
    }),
    new ESLintPlugin({
      fix: true
    }),
    new ModuleFederationPlugin({
      name: "reviews",
      filename: "remoteEntry.js",
      exposes: {
        "./ReviewsModule": "./client/src/components/bootstrap.js"
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);