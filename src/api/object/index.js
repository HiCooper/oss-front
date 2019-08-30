import axios from '../config';

/**
 *  获取 Object 列表
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const ListObjectApi = params => axios.get('/ajax/bucket/list_objects.json', { params })
  .then(res => res.data);

/**
 * 获取 对象 头信息
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const GetObjectHeadApi = params => axios.get('/ajax/bucket/head_object.json', { params })
  .then(res => res.data);

/**
 * 删除对象
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const DeleteObjectHeadApi = params => axios.post('/ajax/bucket/delete_objects.json', params)
  .then(res => res.data);

/**
 * 新建目录
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const CreateFolderApi = params => axios.post('/ajax/bucket/create_folder.json', params)
  .then(res => res.data);

/**
 * 设置 对象的ACL权限
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const SetObjectAclApi = params => axios.post('/ajax/bucket/set_object_acl.json', params)
  .then(res => res.data);

/**
 * 创建 Object
 * @param params
 * @returns {string}
 * @constructor
 */
export const CreateObjectUrl = `${axios.defaults.baseURL}/ajax/bucket/create`;

/**
 * 生成临时访问对象 url
 * @param params
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const GenerateUrlWithSignedApi = params => axios.post('/ajax/bucket/generate_url_with_signed.json', params)
  .then(res => res.data);

/**
 * 获取下载链接
 * @param params
 * @returns {Promise<AxiosResponse<T> | never>}
 * @constructor
 */
export const GenerateDownloadUrlApi = params => axios.post('/ajax/bucket/generate_download_url.json', params)
  .then(res => res.data);
