// 存储空间头部 tab
const headMenuConfig = [
  {
    name: '概览',
    path: '/overview',
    exact: false,
  }, {
    name: '文件管理',
    path: '/object',
    exact: false,
  }, {
    name: '基础设置',
    path: '/settings',
    exact: false,
  }, {
    name: 'API统计',
    path: '/stats-api',
    exact: false,
  }, {
    name: '文件访问统计',
    path: '/stats-file',
    exact: false,
  }, {
    name: '热点数据',
    path: '/stats-hot',
    exact: false,
  },
];

// 左侧菜单，概览和存储 bucket 列表
const sideMenuConfig = [
  {
    name: '概览',
    path: '/dashboard',
    icon: 'dashboard',
    exact: true,
  },
];

// 文件管理分类
const fileManage = [
  {
    name: '全部文件',
    path: '/all',
  }, {
    name: '图片',
    path: '/category?type=pic',
  },
  {
    name: '文档',
    path: '/category?type=doc',
  },
  {
    name: '视频',
    path: '/category?type=video',
  },
  {
    name: '音乐',
    path: '/category?type=music',
  },
  {
    name: '其他',
    path: '/category?type=other',
  },
  {
    name: '回收站',
    path: '/recycle-bin',
    icon: 'delete',
  },
];

export { headMenuConfig, sideMenuConfig, fileManage };
