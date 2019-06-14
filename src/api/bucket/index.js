import axios from '../config';

/**
 *  获取 Bucket 列表
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const ListBucketApi = params => axios.get('/api/bucket/list', { params })
  .then(res => res.data);

/**
 * 获取 Bucket 详情
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const GetBucketApi = params => axios.get('/api/bucket/detail', { params })
  .then(res => res.data);

/**
 * 创建 Bucket
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const CreateBucketApi = params => axios.post('/api/bucket/create', params)
  .then(res => res.data);
