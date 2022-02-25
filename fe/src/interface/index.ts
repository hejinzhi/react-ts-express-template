export interface AuthList {
  id?: number;
  appId: string;
  nickName: string;
  headImg: string;
  serviceTypeInfo: string;
  serviceTypeDesc: string;
  verifyTypeInfo: string;
  verifyTypeDesc: string;
  userName: string;
  principalName: string;
  businessInfo: string;
  alias: string;
  qrcodeUrl: string;
}

export interface Mini {
  id?: string;
  appId?: string;
  name?: string;
  authCode?: string;
  corpName: string;
  corpCode: string;
  codeType: string;
  codeTypeDesc: string;
  legalPersonaWechat: string;
  legalPersonaName: string;
  componentPhone?: string;
  status?: string;
  msg?: string;
}

export interface RefreshMiniStatus {
  id: string;
  corpName: string;
  legalPersonaWechat: string;
  legalPersonaName: string;
}

export interface TesterList {
  id: string;
  wechatId: string;
  userstr: string;
  appId: string;
}

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

export interface HeadImageInfo {
  head_image_url: string;
  modify_quota: number;
  modify_used_count: number;
}

export interface NickNameInfo {
  nickname: string;
  modify_quota: number;
  modify_used_count: number;
}

export interface SignatureInfo {
  signature: string;
  modify_quota: number;
  modify_used_count: number;
}

export interface WxVerifyInfo {
  qualification_verify: boolean;
  naming_verify: boolean;
  annual_review: boolean;
  annual_review_begin_time: number;
  annual_review_end_time: number;
}

export interface MiniInfo {
  errcode: number;
  errmsg: string;
  msg: string;
  appid: string;
  account_type: number;
  principal_type: number;
  principal_name: string;
  realname_status: number;
  wx_verify_info: WxVerifyInfo;
  signature_info: SignatureInfo;
  head_image_info: HeadImageInfo;
  nickname: string;
  registered_country: number;
  nickname_info: NickNameInfo;
  credential: string;
}

export interface TemplateListProps {
  errcode: number;
  errmsg: string;
  template_list: TemplateProps[];
}

export interface TemplateProps {
  category_list: any[];
  create_time: number;
  developer: string;
  source_miniprogram: string;
  source_miniprogram_appid: string;
  template_id: number;
  template_type: number;
  user_desc: string;
  user_version: string;
}
export interface CodeTemplateProps {
  version: string;
  desc: string;
  status: string;
  statusDesc?: string;
  id: number;
  templateId: string;
  barcode: string;
  msg: string;
  appId: string;
}
export interface SimpleProps {
  errcode: number;
  errmsg: string;
}
