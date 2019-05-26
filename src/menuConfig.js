const headMenuConfig = [
  {
    name: 'nav1',
    path: '',
  }, {
    name: 'nav2',
    path: '',
  }, {
    name: 'nav3',
    path: '',
  },
];

const sideMenuConfig = [
  {
    name: '我的文件',
    path: '/',
    icon: 'home',
    children: [
      {
        name: '全部',
        path: '/',
      }, {
        name: '图片',
        path: '/pic',
      }, {
        name: '文档',
        path: '/doc',
      }, {
        name: '视频',
        path: '/video',
      }, {
        name: '音乐',
        path: '/music',
      }, {
        name: '其他',
        path: '/other',
      },
    ],
  },
  {
    name: '回收站',
    path: '/recycle-bin',
    icon: 'notification',
  },
];

export { headMenuConfig, sideMenuConfig };
