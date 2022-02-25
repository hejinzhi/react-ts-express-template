export interface User {
  id: number;
  email?: string;
  password: string;
  name: string;
  tel: string;
}

export interface UpdateUserProps {
  userId: string;
  newUserId: string;
  corpId: string;
}

export interface QueryUserProps {
  current?: string;
  pageSize?: string;
  name?: string;
  tel?: string;
  role?: string;
}

export interface QueryDeptProps {
  current?: string;
  pageSize?: string;
  name?: string;
  desc?: string;
}
