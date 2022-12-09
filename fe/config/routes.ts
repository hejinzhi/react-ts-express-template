export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    desc: '首页',
    routes: [
      {
        name: 'auth',
        icon: 'smile',
        desc: '基础设置',
        path: '/dashboard/auth',
        component: './dashboard/auth',
        access: 'canOpen',
      },
    ],
  },
];
