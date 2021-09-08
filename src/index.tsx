import React from 'react';
import './index.css';
import '@assets/css/common.scss';
// import bg from '@assets/images/no-img.png';
// icon字体样式
import '@assets/font/icon-fonts/icon.css';
import ReactDom from 'react-dom';
import App from '@pages/App';
// import env from '@config';
// console.log(env);
// import style from './index.module.scss';

ReactDom.render(<App />, document.querySelector('#app'));
