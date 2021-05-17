const path = require('path');
const glob = require("glob");
const { merge } = require('webpack-merge');
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require('./webpack.common');
const DIST_DIR = path.join(__dirname, '/public/dist');
const ALL_FILES = glob.sync(path.join(__dirname, "client/src/*.jsx"));
const packageJson = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');

const prodConfig = {
  mode: 'production',
  devtool: {
    type: "source-map"
  },
  output: {
    filename: 'bundle.[contenthash].js',
    path: DIST_DIR,
    publicPath: "/reviews/latest/",
    // publicPath: 'http://localhost:1337/',
    assetModuleFilename: 'assets/[name][contenthash][ext]'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")()],
              },
            },
          }
        ],
        sideEffects: true,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'sass-loader',   
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")()],
              },
            },
          },
        ],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
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
    new PurgeCSSPlugin({
      paths: ALL_FILES,
      extractors: [
        {
          extractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ["html"],
        },
      ],
    }),
  ],
  optimization: { 
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: { preset: ["default"] },
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
  }, 
};

module.exports = merge(commonConfig, prodConfig);