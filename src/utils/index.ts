import envConfig from '@config';
import { History } from 'history';
/**
 * window.location跳转处理
 */
export function windowLocation(url: string) {
  window.location.href = `${getBaseUrl(url)}`;
}

/**
 * 打开窗口
 */
export function windowOpen(url: string, blank = '_blank') {
  window.open(`${getBaseUrl(url)}`, blank);
}

/**
 * 获取带basename的url
 */
export function getBaseUrl(url: string) {
  return `${envConfig.basename}${handleUrl(url)}`;
}

/**
 *
 * @param {*} history // 组件props.history
 * @param {*} url // 跳转路由
 */
export function historyPush(history: History, url: string) {
  history.push(handleUrl(url));
}

/**
 *
 * @param {*} url // 跳转路由
 */
export function linkUrl(url: string) {
  return handleUrl(url);
}
/**
 * 对url进行拼接
 * @param {*} url
 * @returns
 */
export function handleUrl(url: string) {
  return url;
}
