import Overview from './pages/Overview';
import FileManage from './pages/FileManage';
import BucketOverview from './pages/BucketOverview';
import StatsApi from './pages/StatsApi';
import StatsFile from './pages/StatsFile';
import Settings from './pages/Settings';
import StatsHot from './pages/StatsHot';
import Login from './pages/Login';
import PersonInfo from './pages/PersonInfo';
import SecretKey from './pages/SecretKey';
import SysNotice from './pages/SysNotice';
import OpLog from './pages/OpLog';

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

const loginUserRouterConfig = [
  {
    path: '/home/profile',
    component: PersonInfo,
    exact: true,
  },
  {
    path: '/home/secret',
    component: SecretKey,
    exact: true,
  },
  {
    path: '/home/notice',
    component: SysNotice,
    exact: true,
  },
  {
    path: '/home/oplog',
    component: OpLog,
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
    path: '/bucket/:name/settings',
    component: Settings,
  }, {
    path: '/bucket/:name/stats-file',
    component: StatsFile,
  }, {
    path: '/bucket/:name/stats-hot',
    component: StatsHot,
  },
];

export { routerConfig, userRouterConfig, loginUserRouterConfig, childRouterConfig };
