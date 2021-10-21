const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const notifier = require('node-notifier');
// const ICON = join(__dirname, 'icon.png');
const prot = 8080;

module.exports = {
  mode: 'development',
  output: {
    assetModuleFilename: 'images/[name][ext]', // 对应rules中图片文件资源中的type: 'asset'
    filename: 'scripts/[name].bundle.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true, // 刷新页面会响应到index页面，避免出现404
    // contentBase: join(__dirname, '../dist/assets'), // 资源文件目录
    inline: true, // 模式 iframe，监听文件变化，自动刷新页面
    // host: '0.0.0.0', // 使用ip访问
    port: prot,
    // node-notifier, webpack-build-notifier
    quiet: true, // 配合friendly-error-webpack-plugin
    watchContentBase: true,
    stats: {
      errorDetails: true,
    },
    proxy: {
      '/app/**': {
        target: 'https://127.0.0.1/',
        headers: {
          'X-Real-IP': '127.0.0.1',
        },
        changeOrigin: true,
      },
    },
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-ts-demo',
      filename: 'index.html',
      template: resolve(__dirname, '../template/dev.html'),
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://localhost:${prot}`],
        notes: ['Some additionnal notes to be displayed unpon successful compilation'],
      },
      clearConsole: true,
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'Webpack error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          // icon: ICON,
        });
      },
    }),
    new StylelintPlugin(),
  ],
};
