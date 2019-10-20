import axios from 'axios';
import { message } from 'antd';
import { getToken, removeAll } from '../util/auth';

axios.defaults.baseURL = 'http://47.101.42.169:8077';
// axios.defaults.baseURL = 'http://192.168.2.250:8077';
// axios.defaults.baseURL = 'http://10.50.12.38:8077';
axios.defaults.timeout = 6000;

axios.interceptors.request.use((config) => {
  config.headers.authorization = getToken();
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  const { code, msg } = response.data;
  if (response.data.size) {
    return response;
  }
  if (code && code !== '200') {
    message.info(msg);
    if (code === 'TOKEN_EXPIRED') {
      removeAll();
      localStorage.clear();
      window.location.replace(`${window.location.protocol}//${window.location.host}/#/user/login?fallback=${encodeURIComponent(window.location.href)}`);
    }
    return Promise.reject(code);
  }
  return Promise.resolve(response);
}, (error) => {
  let content = '系统连接超时';
  if (error.response) {
    content = `${error.response.status},${error.response.statusText}`;
  }
  message.error(content);
  return Promise.reject(error);
});

export default axios;
