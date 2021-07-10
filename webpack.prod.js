const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require('./webpack.common');
const DIST_DIR = path.join(__dirname, '/public/dist');
const packageJson = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');

const prodConfig = {
  mode: 'production',
  devtool: "source-map",
  output: {
    filename: 'bundle.[contenthash].js',
    path: DIST_DIR,
    publicPath: "/reviews/latest/",
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
      // {
      //   test: /\.scss$/,
      //   use: [
      //     MiniCssExtractPlugin.loader, 
      //     'css-loader', 
      //     'sass-loader',   
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         postcssOptions: {
      //           plugins: [require("autoprefixer")()],
      //         },
      //       },
      //     },
      //   ],
      //   sideEffects: true,
      // },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*']
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
  ],
};

module.exports = merge(commonConfig, prodConfig);