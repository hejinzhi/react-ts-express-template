import axios from 'axios';

import config from 'config';
const baseUrl = '';

const httpGet = async <T>(url: string, ignoreBaseUrl = false) => {
  const res = await axios.get<T>(ignoreBaseUrl ? url : baseUrl + url);
  return res;
};

const httpPost = async <T>(url: string, body: any, ignoreBaseUrl = false) => {
  const res = await axios.post<T>(ignoreBaseUrl ? url : baseUrl + url, body);
  return res;
};

export { httpGet, httpPost };
