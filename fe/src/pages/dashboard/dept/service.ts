import type { Dept } from './data.d';
import request from '@/request';

export async function getDeptList(
  params: {
    current?: number;
    pageSize?: number;
    key?: string;
  },
  options?: Record<string, any>,
) {
  const res = await request<{
    data: {
      rows: Dept[];
      total?: number;
    };
  }>('/dept', {
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

export async function addDept(dept: Dept) {
  const res = await request<{
    data: Dept;
  }>('/dept', {
    method: 'POST',
    data: dept,
  });
  return res;
}

export async function deleteDept(id: number) {
  const res = await request<{
    affected: number;
  }>('/dept', {
    method: 'DELETE',
    params: { id },
  });
  return res;
}

export async function updateDept(dept: Dept) {
  const res = await request<{
    data: Dept;
  }>('/dept', {
    method: 'POST',
    data: dept,
  });
  return res;
}
