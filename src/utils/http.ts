import axios from 'axios';
import { initServerError, initValidate } from './error';
import envConfig from '@config';
import { windowLocation } from '@utils/index';

axios.defaults.baseURL = envConfig.baseURL;
// 超时时间15s
axios.defaults.timeout = 15000;
// Ajax请求
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器即异常处理
axios.interceptors.response.use(
  (response) => {
    // 需要根据返回码统一处理公共逻辑
    const result = response.data || {};
    if (result.code !== 0) {
      // 未登录错误码
      if (result.code === 10110) {
        windowLocation(`/login`);
        return Promise.reject(initValidate({ code: 101, msg: result.desc }));
      }
      return Promise.reject(initValidate({ msg: result.desc }));
    }
    return result.data;
  },
  (err) => {
    // 需要根据返回码对错误进行统一处理
    return Promise.reject(initServerError(err));
  }
);

export default axios;
