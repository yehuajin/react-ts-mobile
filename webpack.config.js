const merge = require('webpack-merge');
const { join, resolve } = require('path');
const argv = require('yargs-parser')(process.argv.slice(2));
let _env = argv.env || 'development';
_env = _env === 'development' ? 'development' : 'production';
const _envFlag = _env === 'production';
const _mergeConfig = require(`./config/webpack.${_env}.js`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const themeVariables = lessToJs(
  fs.readFileSync(join(__dirname, './src/assets/css/theme.less'), 'utf8')
);
const config = require('./config/index');

const cssLoaders = [
  // post-css-preset-env和@babel/preset-env一样解析最新的css语法
  // { loader: 'style-loader' }, // 是将样式插入到html页面的style中，提取出来就不用这么做了
  _envFlag ? MiniCssExtractPlugin.loader : {
    loader: 'style-loader',
    options: {
      // 解决common.scss文件样式被覆盖
      // insert: function insertAtTop(element) {
      //   const style = document.querySelector('style');
      //   if (style) {
      //     style.parentNode.insertBefore(element, style);
      //   } else {
      //     document.querySelector('head')?.appendChild(element);
      //   }
      // },
    },
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: !_envFlag,
      importLoaders: 1, // 0 => 无loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader; 用于配置css-loader作用于@import 的资源之前有多少个loader
      modules: {
        auto: (resourcePath) => resourcePath.endsWith('.module.scss'),
        // eslint-disable-next-line max-params
        getLocalIdent: (context, localIdentName, localName, options) => {
          if (localName.endsWith('-no-module')) {
            const name = localName.replace('-no-module', '');
            return name;
          }
        },
      },
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
              },
            },
          ],
          'postcss-normalize',
        ],
      },
      sourceMap: !_envFlag,
    },
  },
];

const webpackBaseConfig = {
  entry: {
    app: resolve('src/index.tsx'),
  },
  output: {
    path: join(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)$/,
        include: [resolve('src')],
        exclude: [/node_modules/],
        use: ['eslint-loader'],
        enforce: 'pre',
      },
      {
        test: /\.(js|jsx|ts|tsx)/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css)/,
        use: cssLoaders,
      },
      {
        test: /\.(scss)/,
        use: cssLoaders.concat([
          { loader: `sass-loader` },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [resolve('src/assets/css/variable.scss')],
            },
          },
        ]),
      },
      {
        test: /\.(less)/,
        use: cssLoaders.concat([
          { loader: `less-loader`, options: { modifyVars: themeVariables } },
        ]),
      },
      {
        test: /\.(png|jpeg|git|eot|woff|woff2|ttf|svg|otf|webp|json|jpg)$/,
        type: 'asset', // 不需要file-loader,webpack内置了
      },
    ],
  },
  externals: {
    // react: 'react', // 放到静态服务器不需要打包的库
  },
  resolve: {
    alias: {
      // tsconfig.json中也要对应设置
      '@config': resolve(`src/config/env-${argv.env || 'development'}.js`), // 注意tsconfig中的配置
      '@assets': resolve('src/assets'),
      '@components': resolve('src/components'),
      '@models': resolve('src/models'),
      '@routes': resolve('src/routes'),
      '@pages': resolve('src/pages'),
      '@utils': resolve('src/utils'),
      '@recoil': resolve('src/recoil'),
      '@hooks': resolve('src/hooks'),
      '@api': resolve('src/api'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.less', '.css'],
  },
  plugins: [].concat(
    _envFlag
      ? [
        new MiniCssExtractPlugin({
          // 解决common.scss文件样式被覆盖
          // insert: function (linkTag) {
          //   const link = document.querySelector('link');
          //   if (link) {
          //     link.parentNode.insertBefore(linkTag, link);
          //   } else {
          //     document.querySelector('head')?.appendChild(linkTag);
          //   }
          // },
          filename: `${config.assets}/styles/[name].[contenthash:5].css`,
          chunkFilename: `${config.assets}/styles/[id].[contenthash:5].css`,
          ignoreOrder: true, // 忽略css文件引入的顺序，如果不设置在不能的js中引入css顺序不同就会产生警告
        }),
      ]
      : []
  ),
};

module.exports = merge.default(webpackBaseConfig, _mergeConfig);
