import axios from '../config';

/**
 *  获取 Object 列表
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const ListObjectApi = params => axios.get(`/api/${params.bucket}/list_objects.json`, { params })
  .then(res => res.data);

/**
 * 获取 对象 头信息
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const GetObjectHeadApi = params => axios.get(`/api/${params.bucket}/head_object.json`, { params })
  .then(res => res.data);

/**
 * 创建 Object
 * @param params
 * @returns {string}
 * @constructor
 */
export const CreateObjectUrl = params => `${axios.defaults.baseURL}/api/${params.bucket}/create`;

/**
 * 生成临时访问对象 url
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const GenerateUrlWithSignedApi = params => axios.post(`/api/${params.bucket}/generate_url_with_signed.json`, params).then(res => res.data);
