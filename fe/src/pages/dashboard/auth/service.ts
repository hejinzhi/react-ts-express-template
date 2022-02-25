// import type {
//   AuthList,
//   CodeTemplateProps,
//   Mini,
//   MiniInfo,
//   RefreshMiniStatus,
//   SimpleProps,
//   TemplateListProps,
//   TesterList,
// } from '@/interface';
// import request from '@/request';

// export async function getAuthUrl() {
//   const res = await request<string>('/platform/auth', {
//     method: 'GET',
//   });
//   return res;
// }

// export async function getAuthorization(authCode: string) {
//   const res = await request('/platform/authorization', {
//     method: 'POST',
//     data: {
//       authCode,
//     },
//   });
//   return res;
// }
