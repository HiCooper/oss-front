import Test from './pages/Test';
import FileManage from './pages/FileManage';
import BucketOverview from './pages/BucketOverview';
import Setting from './pages/Setting';
import StatsApi from './pages/StatsApi';
import StatsFile from './pages/StatsFile';
import StatsHot from './pages/StatsHot';

const routerConfig = [];

const childRouterConfig = [
  {
    path: '/bucket/:name/overview',
    component: BucketOverview,
  }, {
    path: '/bucket/:name/object',
    component: FileManage,
  }, {
    path: '/bucket/:name/settings',
    component: Setting,
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
  {
    path: '/test',
    component: Test,
  },
];

export { routerConfig, childRouterConfig };
