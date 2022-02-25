import axios from 'axios';
import request from 'request-promise';

const getBuffer = (url: string) => {
  return axios.get(url, {
    responseType: 'arraybuffer',
  });
};

const get = <T>(url: string) => {
  return axios.get<T>(url);
};

const post = <T>(url: string, body: any) => {
  return axios.post<T>(url, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const postForm = (url: string, body: any) => {
  return request.post(url, {
    formData: body,
  });
};

export { get, post, postForm, getBuffer };
