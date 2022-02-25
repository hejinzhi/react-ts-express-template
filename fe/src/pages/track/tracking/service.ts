import type { Tracking } from './data.d';
import request from '@/request';
const baseUrl = '/tracking';

export async function getTrackingById(id: string) {
  let result: Tracking | undefined = undefined;
  const res = await request<{
    data: {
      rows: Tracking[];
      total?: number;
    };
  }>(baseUrl, {
    method: 'GET',
    params: {
      id,
    },
  });
  if (res.data && res.data?.rows?.length > 0) {
    result = res.data.rows[0];
  } else {
    result = undefined;
  }
  return result;
}

export async function getTrackingListEnum(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  const res = await request<{
    data: {
      rows: Tracking[];
      total?: number;
    };
  }>(baseUrl, {
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

export async function addTracking(dept: Tracking) {
  const res = await request<{
    data?: Tracking;
    statusCode?: string;
    message?: string;
  }>(baseUrl, {
    method: 'POST',
    data: dept,
  });
  return res;
}

export async function deleteTracking(id: number) {
  const res = await request<{
    affected: number;
  }>(baseUrl, {
    method: 'DELETE',
    params: { id },
  });
  return res;
}

export async function updateTracking(dept: Tracking) {
  const res = await request<{
    data: Tracking;
  }>(baseUrl, {
    method: 'PUT',
    data: dept,
  });
  return res;
}
