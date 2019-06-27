import axios from '../config';

/**
 *  创建新的 AccessKey
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const CreateAccessKeyApi = params => axios.post('/ajax/access_key/create_access_key.json', params)
  .then(res => res.data);

/**
 * 禁用 accessKey
 * @param params
 * @returns {Promise<AxiosResponse<T> | never>}
 * @constructor
 */
export const DisableAccessKeyApi = params => axios.post('/ajax/access_key/disable_access_key.json', params)
  .then(res => res.data);

/**
 * 启用 accessKey
 * @param params
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export const EnableAccessKeyApi = params => axios.post('/ajax/access_key/enable_access_key.json', params)
  .then(res => res.data);

/**
 * 删除 accessKey
 * @param params
 * @returns {Promise<AxiosResponse<T> | never>}
 * @constructor
 */
export const DeleteAccessKeyApi = params => axios.post('/ajax/access_key/delete_access_key.json', params)
  .then(res => res.data);

/**
 * 获取accessKey 列表
 * @param params
 * @returns {Promise<AxiosResponse<T> | never>}
 * @constructor
 */
export const ListAccessKeyApi = () => axios.get('/ajax/access_key/list.json')
  .then(res => res.data);
