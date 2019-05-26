const headMenuConfig = [
  // {
  //   name: '主页',
  //   path: '/',
  // },
];

const sideMenuConfig = [
  {
    name: '我的文件',
    path: '/',
    icon: 'cloud',
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
    icon: 'delete',
  },
];

export { headMenuConfig, sideMenuConfig };
