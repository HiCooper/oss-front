import axios from '../config';

export const UserLoginApi = params => axios.post('/api/login', params)
  .then(res => res.data);
