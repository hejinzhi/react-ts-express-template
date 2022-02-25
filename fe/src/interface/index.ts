export interface RouteBase {
  name: string;
  icon: string;
  desc: string;
  path: string;
}

export interface RouteChildren extends RouteBase {
  component: string;
}

export interface RouteInterface extends RouteBase {
  routes: RouteChildren[];
}

export interface TreeChildrenInterface {
  title: string;
  key: string;
}

export interface TreeInterface {
  title: string;
  key: string;
  children: TreeChildrenInterface[];
}
export interface SimpleProps {
  errcode: number;
  errmsg: string;
}
