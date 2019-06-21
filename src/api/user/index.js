import axios from '../config';

export const UserLoginApi = params => axios.post('/auth/login', params)
  .then(res => res.data);
