import axios from '../config';

/**
 *  创建新的 AccessKey
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const CreateAccessKeyApi = params => axios.post('/ajax/access_key/create_access_key.json', params)
  .then(res => res.data);
