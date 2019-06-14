import Overview from './pages/Overview';
import FileManage from './pages/FileManage';
import BucketOverview from './pages/BucketOverview';
import StatsApi from './pages/StatsApi';
import StatsFile from './pages/StatsFile';
import StatsHot from './pages/StatsHot';
import Login from './pages/Login';

const routerConfig = [
  {
    path: '/dashboard/overview',
    component: Overview,
  },
];

const userRouterConfig = [
  {
    path: '/user/login',
    component: Login,
    exact: true,
  },
];

const childRouterConfig = [
  {
    path: '/bucket/:name/overview',
    component: BucketOverview,
  }, {
    path: '/bucket/:name/object',
    component: FileManage,
  }, {
    path: '/bucket/:name/stats-api',
    component: StatsApi,
  }, {
    path: '/bucket/:name/stats-file',
    component: StatsFile,
  }, {
    path: '/bucket/:name/stats-hot',
    component: StatsHot,
  },
];

export { routerConfig, userRouterConfig, childRouterConfig };
