const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./index');

module.exports = {
  mode: 'production',
  output: {
    assetModuleFilename: `${config.assets}/images/[name].[contenthash:5].bundle.[ext]`, // 对应rules中图片文件资源中的type: 'asset'
    filename: `${config.assets}/scripts/[name].[contenthash:5].bundle.js`,
    publicPath: '/assets/', // cdn使用
    path: join(__dirname, '../dist'),
  },
  // https://segmentfault.com/a/1190000039730567
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'async', // initial、all、函数
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        commons: {
          chunks: 'initial', // 同步代码
          minChunks: 2, // 至少引用2次
          name: 'commons',
        },
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10,
        // },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true,
        // },
      },
      minSize: {
        javascript: 100000, // 10万字节
        style: 100000,
      },
      // maxSize: {},
    },
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin({
        // test: /\.css$/i,
        // include: /\/src/,
        // exclude: /\/node_modules/,
        parallel: true,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack-ts-demo',
      filename: 'index.html',
      template: resolve(__dirname, '../template/prod.html'),
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 所有代码折叠起来
        removeAttributeQuotes: true,
      },
    }),
    // copy custom static 资源
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, '../static'),
          to: resolve(__dirname, `../dist/${config.assets}`),
        },
      ],
    }),
  ],
};
