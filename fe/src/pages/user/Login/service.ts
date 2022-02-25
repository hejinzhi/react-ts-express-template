import type {  UserInfo } from './data.d';
import request from '@/request';

export async function login(body: API.LoginParams, options?: Record<string, any>) {
  const res = await request<{ token?: string, msg?: string }>('/users/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
  if (res.token) {
    localStorage.setItem('token', res.token);
  }
  return res;
}

export async function getUserInfo() {
  const res = await request<UserInfo>('/users/userinfo', {
    method: 'GET',
  });
  return res;
}

export async function getAuthUrl() {
  const res = await request<string>('/platform/auth', {
    method: 'GET',
  });
  return res;
}

export async function addPerson() {}

