// import type { UserInfo } from './data.d';
import request from '@/request';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function login(body: API.LoginParams, options?: Record<string, any>) {
  // export async function login() {
  // const res = await request<{ token?: string, msg?: string }>('/users/login', {
  //   method: 'POST',
  //   data: body,
  //   ...(options || {}),
  // });
  // if (res.token) {
  //   localStorage.setItem('token', res.token);
  // }
  // return res;
  return {
    token: 'mocktoken',
    msg: 'success',
  };
}

export async function getUserInfo() {
  // const res = await request<UserInfo>('/users/userinfo', {
  //   method: 'GET',
  // });
  // return res;
  return {
    id: 1,
    tel: '',
    name: 'Jack',
    avatar: '',
  };
}

export async function getAuthUrl() {
  const res = await request<string>('/platform/auth', {
    method: 'GET',
  });
  return res;
}

export async function addPerson() {}
