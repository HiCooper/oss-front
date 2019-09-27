import axios from '../config';

/**
 *  获取 Bucket 列表
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const ListBucketApi = params => axios.get('/ajax/bucket/list.json', { params })
  .then(res => res.data);

/**
 * 获取 Bucket 详情
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const GetBucketApi = params => axios.get('/ajax/bucket/detail.json', { params })
  .then(res => res.data);

/**
 * 获取 Bucket 防盗链设置
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const GetBucketRefererApi = params => axios.get('/ajax/bucket/get_referer.json', { params })
  .then(res => res.data);

/**
 * 更新 防盗链设置
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 * @constructor
 */
export const UpdateRefererApi = params => axios.post('/ajax/bucket/update_referer.json', params )
  .then(res => res.data);

/**
 * 创建 Bucket
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const CreateBucketApi = params => axios.post('/ajax/bucket/new_create_bucket.json', params)
  .then(res => res.data);

/**
 * 设置 Bucket ACL
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const SetBucketAclApi = params => axios.post('/ajax/bucket/set_acl.json', params)
  .then(res => res.data);

/**
 * 删除 Bucket
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const DeleteBucketApi = params => axios.post('/ajax/bucket/delete_bucket.json', params)
  .then(res => res.data);
