export interface QueryRoleProps {
  pageSize?: string;
  current?: string;
  desc?: string;
  name?: string;
}

export interface DeptProps {
  id: number;
  name: string;
  desc: string;
}

export interface LoggerProps {
  id?: number;
  url: string;
  method: string;
  params: string;
  body: string;
  ip: string;
  status: number;
  message: string;
}
