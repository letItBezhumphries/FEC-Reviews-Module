const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
var DIST_DIR = path.join(__dirname, '/public/dist');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //to clean out dist folder
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const packageJson = require('./package.json');

const devConfig = {
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: "http://localhost:1337/",
    assetModuleFilename: "[name][ext]",
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "./public/dist"),
    index: 'index.html',
    compress: true,
    host: 'localhost',
    writeToDisk: true,
    port: 1337,
    historyApiFallback: {
      index: "index.html"
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", 'css-loader']
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: "./public/reviewsStyle.css" }
      ]
    }),
    new Dotenv({
      path: "./.env.development",
      allowEmptyValues: true,
    }),
    new ESLintPlugin({
      fix: true
    }),
    new ModuleFederationPlugin({
      name: "reviews",
      filename: "remoteEntry.js",
      exposes: {
        "./ReviewsModule": "./client/src/components/bootstrap.jsx"
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);