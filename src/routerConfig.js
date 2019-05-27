import Home from './pages/Home';
import Test from './pages/Test';
import FileManage from './pages/Home/components/FileManage';

const routerConfig = [
  {
    path: '/bucket/:name',
    component: Home,
  }, {
    path: '/bucket/*/object',
    component: FileManage,
  }, {
    path: '/test',
    component: Test,
  },
];

export default routerConfig;
