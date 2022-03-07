// import { message } from 'antd';
import { message } from 'antd';
import { extend } from 'umi-request';

const errorHandler = function (error: any) {
  if (error.response) {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    const status = error.response.status;
    if (status !== 200) {
      message.error(error.data);
    }
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    console.log(error.message);
  }
  throw error; // 如果throw. 错误将继续抛出.
};

const request = extend({
  prefix: 'http://localhost:3389/api',
  // prefix: 'http://fs-open.fanshuquan.club/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  errorHandler,
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
