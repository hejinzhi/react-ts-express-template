import type { User } from './data.d';
import request from '@/request';
import route from '../../../../config/routes'

export async function getUserList(
  params: {
    current?: number;
    pageSize?: number;
    key?: string;
  },
  options?: Record<string, any>,
) {
  const res = await request<{
    data: {
      rows: User[];
      total?: number;
    };
  }>('/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });

  return {
    success: true,
    data: res.data.rows,
    total: res.data.total,
  };
}



export async function addUser(person: User) {
  const res = await request<{
    data: User;
  }>('/users', {
    method: 'POST',
    data: person,
  });
  return res;
}

export async function deleteUser(id: number) {
  const res = await request<{
    affected: number;
  }>('/users', {
    method: 'DELETE',
    params: { id },
  });
  return res;
}

export async function updateUser(person: User) {
  const res = await request<{
    data: User;
  }>('/users', {
    method: 'PUT',
    data: person,
  });
  return res;
}

export async function setMenu() {
  const res = await request<{
    data: {
      menu: string
    };
  }>('/menu', {
    method: 'post',
    data: {
      menu: route
    },
  });
  return res;
}

export async function getMenus() {
  const res = await request<{
    data: string;
  }>('/menu', {
    method: 'get',
  });
  return res;
}