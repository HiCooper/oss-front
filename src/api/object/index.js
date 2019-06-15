import axios from '../config';

/**
 *  获取 Object 列表
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const ListObjectApi = params => axios.get('/api/object/list', { params })
  .then(res => res.data);

/**
 * 创建 Object
 * @type {string}
 */
export const CreateObjectUrl = `${axios.defaults.baseURL}/api/object/create`;

/**
 * 查看图片类 对象
 * @type {string}
 */
export const GetPicUrl = `${axios.defaults.baseURL}/api/object`;
