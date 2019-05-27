import Home from './pages/Home';
import Test from './pages/Test';
import FileManage from './pages/Home/components/FileManage';

const routerConfig = [
  {
    path: '/bucket/:name',
    component: Home,
    children: [
      {
        path: '/overview',
        component: Test,
      }, {
        path: '/object',
        component: FileManage,
      }, {
        path: '/settings',
        component: Test,
      }, {
        path: '/stats-api',
        component: Test,
      }, {
        path: '/stats-file',
        component: Test,
      }, {
        path: '/stats-hot',
        component: Test,
      },
    ],
  },
  {
    path: '/test',
    component: Test,
  },
];

export default routerConfig;
