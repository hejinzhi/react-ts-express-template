export type LoginSuccessProps = {
  token: string;
  status: string;
  type: string;
};

export type UserInfo = {
  id: number;
  tel: string;
  name: string;
  deptId: number;
  dept: string;
  type: string;
  isSuper: boolean;
  avatar: string;
  roles: string[];
  powers: string;
  permissions: string;
};
