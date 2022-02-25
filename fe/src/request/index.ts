// import { message } from 'antd';
import { extend } from 'umi-request';

const request = extend({
  prefix: 'http://localhost:3389/api',
  // prefix: 'http://fs-open.fanshuquan.club/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('token') || '';
  const authHeader = { Authorization: `bearer ${token}` };
  return {
    url: url,
    options: { ...options, interceptors: true, headers: authHeader },
  };
});

// request.interceptors.response.use((response) => {
//   console.log(response);
//   if(response.status !== 200) {
//     message.error(response.text)
//   }
//   return response;
// });

export default request;
