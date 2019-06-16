import axios from '../config';

/**
 *  获取 Object 列表
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const ListObjectApi = params => axios.get('/api/object/list', { params })
  .then(res => res.data);

/**
 * 获取 对象 头信息
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const GetObjectHeadApi = params => axios.get('/api/object/head_object', { params })
  .then(res => res.data);

/**
 * 创建 Object
 * @type {string}
 */
export const CreateObjectUrl = `${axios.defaults.baseURL}/api/object/create`;

/**
 * 生成临时访问对象 url
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const GenerateUrlWithSignedApi = params => axios.post('/api/object/generate_url_with_signed', params).then(res => res.data);
