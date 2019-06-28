import axios from '../config';

/**
 *  首页概览统计数据
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const StatisOverviewApi = () => axios.get('/ajax/statis/overview.json')
  .then(res => res.data);
