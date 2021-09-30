import { AxiosError } from 'axios';
import { Toast } from 'antd-mobile';
/**
 * 前端重新封装状态吗，对接口错误进行归类方便前端处理
 * 100 普通服务器端错误，直接将错误信息弹框显示
 * 101 登录超时，跳转到登录页重新登录
 * 200 普通客户端校验，正常显示错误信息
 */

interface errorObj {
  code?: number;
  msg: string;
}

/**
 * 展示错误信息
 * @param code 错误码
 * @param msg 错误信息
 */
export function showErrorMsg(error: errorObj) {
  const { msg } = error;
  // 根据业务处理错误信息展示
  // console.log(code, msg);
  Toast.fail(msg, 2);
}

/**
 *  初始化服务器端返回错误信息 (服务器端错误统一1XX)
 * @param error 服务器返回错误信息
 * @returns {{code: number, msg}} 封装后错误信息
 */
export function initServerError(error: AxiosError) {
  const { response, request } = error;
  if (request.status === 0) {
    return {
      code: 100,
      msg: '服务器开小差了~稍后再试',
    };
  }
  // 判断如果是401错误 直接跳转至登录页
  if (response.status === 401) {
    return {
      code: 101,
      msg: '登录超时，请重新登录',
    };
  }
  return {
    code: 100,
    msg: '服务器开小差了~稍后再试',
  };
}

/**
 * 初始前端验证返回错误信息 (客户端错误统一2XX)
 * @param errorMsg 需要提示给用户的错误信息
 * @returns {{code: number, msg: *}} 封装后错误信息
 */
export function initValidate(error: errorObj) {
  const { code, msg } = error;
  return {
    code: code || 200,
    msg: msg,
  };
}
