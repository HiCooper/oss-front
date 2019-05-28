import Test from './pages/Test';
import FileManage from './pages/FileManage';
import BucketOverview from './pages/BucketOverview';

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
    component: Test,
  }, {
    path: '/bucket/:name/stats-api',
    component: Test,
  }, {
    path: '/bucket/:name/stats-file',
    component: Test,
  }, {
    path: '/bucket/:name/stats-hot',
    component: Test,
  },
  {
    path: '/test',
    component: Test,
  },
];

export { routerConfig, childRouterConfig };
