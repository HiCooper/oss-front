import axios from '../config';

/**
 * 新增 bucket 授权策略
 * @param params
 * @returns {Promise<AxiosResponse<T> | never>}
 * @constructor
 */
export const AddPolicyApi = params => axios.post('/ajax/bucket/policy/add_policy.json', params)
  .then(res => res.data);

/**
 *  删除 bucket 授权策略，多个用英文逗号隔开
 * @param params
 * @returns {Promise<AxiosResponse<T> | never>}
 * @constructor
 */
export const DeletePolicyApi = params => axios.post('/ajax/bucket/policy/delete_policy.json', new URLSearchParams(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } })
  .then(res => res.data);

/**
 * 获取 bucket 授权策略
 * @param params
 * @returns {Promise<AxiosResponse<T> | never>}
 * @constructor
 */
export const GetPolicyApi = params => axios.get('/ajax/bucket/policy/get_policy.json', { params })
  .then(res => res.data);
