import axios from 'axios';
import { getToken, removeAll } from '../util/auth';

axios.defaults.baseURL = 'http://192.168.2.207:8077';
axios.defaults.timeout = 5000;

axios.interceptors.request.use((config) => {
  config.headers.authorization = getToken();
  return config;
}, (error) => {
  console.error(error);
  return Promise.reject(error);
},);

axios.interceptors.response.use((response) => {
  const { code, msg } = response.data;
  if (response.data.size) {
    return response;
  }
  if (code && code !== '200') {
    console.error(msg);
    if (code === 'TOKEN_EXPIRED') {
      removeAll();
      localStorage.clear();
      window.location.replace(`${window.location.protocol}//${window.location.host}/#/user/login`);
    }
    return Promise.reject(code);
  }
  return response;
}, (error) => {
  console.error(error);
  console.error('500,服务器出现了点问题');
  return Promise.reject(error);
},);

export default axios;
