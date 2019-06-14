import axios from 'axios';
import { message } from 'antd';
import { getToken, removeAll } from '../util/auth';

// axios.defaults.baseURL = 'http://47.101.42.169:8077';
axios.defaults.baseURL = 'http://192.168.2.194:8077';
axios.defaults.timeout = 5000;

axios.interceptors.request.use((config) => {
  config.headers.authorization = getToken();
  return config;
}, (error) => {
  return Promise.reject(error);
},);

axios.interceptors.response.use((response) => {
  return Promise.resolve(response);
}, (error) => {
  const { status, statusText } = error.response;
  if (status === 403 && statusText === 'Forbidden') {
    message.error('登录过期，请重新登录');
    removeAll();
    localStorage.clear();
    window.location.replace(`${window.location.protocol}//${window.location.host}/#/user/login`);
  } else {
    console.error(error);
    message.error('500,服务器出现了点问题');
  }
  return Promise.reject(error);
},);

export default axios;
