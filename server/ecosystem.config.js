module.exports = {
  apps: [
    {
      name: 'sugou-server',
      script: './dist/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3389,
      },
    },
  ],

  deploy: {
    production: {
      user: 'root',
      host: '122.112.207.135',
      ref: 'origin/master',
      repo: 'https://gitee.com/Authur/sugou-server.git',
      path: '/home/sugou-server',
      ssh_options: 'StrictHostKeyChecking=no',
      'post-deploy': 'cnpm install && npm run build &&  pm2 reload ecosystem.config.js --env production',
    },
  },
};
