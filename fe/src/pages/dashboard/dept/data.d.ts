export type User = {
  id: number | null;
  name: string;
  tel: string;
  deptId: string;
  role: string;
};

export type Dept = {
  id: number | null;
  name: string;
  desc: string;
};
