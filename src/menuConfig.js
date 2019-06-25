// 存储空间头部 tab
const headMenuConfig = [
  {
    name: '概览',
    path: '/overview',
  }, {
    name: '文件管理',
    path: '/object',
  }, {
    name: '基础设置',
    path: '/settings',
  }, {
    name: 'API统计',
    path: '/stats-api',
  }, {
    name: '文件访问统计',
    path: '/stats-file',
  }, {
    name: '热点数据',
    path: '/stats-hot',
  },
];

// 左侧菜单，概览和存储 bucket 列表
const sideMenuConfig = [
  {
    name: '概览',
    path: '/dashboard',
    icon: 'dashboard',
  },
];

const homeUserMenuConfig = [
  {
    name: '个人中心',
    icon: 'user',
    children: [
      {
        name: '个人信息',
        path: '/profile',
      }, {
        name: '密钥管理',
        path: '/secret',
      }, {
        name: '操作日志',
        path: '/oplog',
      },
    ],
  }, {
    name: '系统设置',
    icon: 'setting',
    children: [
      {
        name: '系统信息',
        path: '/notice',
      }, {
        name: '通知设置',
        path: '/notice-setting',
      },
    ],
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

export { headMenuConfig, sideMenuConfig, homeUserMenuConfig, fileManage };
