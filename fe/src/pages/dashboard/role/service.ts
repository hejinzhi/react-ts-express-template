import type { Role } from './data.d';
import request from '@/request';

export async function getRoleList(
  params: {
    current?: number;
    pageSize?: number;
    key?: string;
  },
  options?: Record<string, any>,
) {
  const res = await request<{
    data: {
      rows: Role[];
      total?: number;
    };
  }>('/role', {
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



export async function addRole(role: Role) {
  const res = await request<{
    data: Role;
  }>('/role', {
    method: 'POST',
    data: role,
  });
  return res;
}

export async function deleteRole(id: number) {
  const res = await request<{
    affected: number;
  }>('/role', {
    method: 'DELETE',
    params: { id },
  });
  return res;
}

export async function updateRole(role: Role) {
  const res = await request<{
    data: Role;
  }>('/role', {
    method: 'PUT',
    data: role,
  });
  return res;
}