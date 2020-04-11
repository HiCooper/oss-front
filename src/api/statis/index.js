import axios from '../config';

/**
 *  首页概览统计数据
 * @returns {Promise<AxiosResponse<any> | never>}
 * @constructor
 */
export const StatisOverviewApi = () => axios.get('/ajax/statis/overview.json')
  .then(res => res.data);

export const StatisticsHotDataApi = params => axios.get('/ajax/statis/hot_data.json', { params })
  .then(res => res.data);

export const StatisticsDailyQueryTimesApi = params => axios.get('/ajax/statis/daily_query_times.json', { params })
  .then(res => res.data);
