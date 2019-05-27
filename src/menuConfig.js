const headMenuConfig = [
  // {
  //   name: '主页',
  //   path: '/',
  // },
];

const sideMenuConfig = [
  {
    name: '全部文件',
    path: '/all',
    icon: 'cloud',
  },
  {
    name: '图片',
    path: '/category',
    type: 'pic',
  },
  {
    name: '文档',
    path: '/category',
    type: 'doc',
  },
  {
    name: '视频',
    path: '/category',
    type: 'video',
  },
  {
    name: '音乐',
    path: '/category',
    type: 'music',
  },
  {
    name: '其他',
    path: '/category',
    type: 'other',
  },
  {
    name: '回收站',
    path: '/recycle-bin',
    icon: 'delete',
  },
];

export { headMenuConfig, sideMenuConfig };
