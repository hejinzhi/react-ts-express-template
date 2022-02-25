/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canOpen: (route: any)=> { 
      // const list = currentUser?.permissions?.split(',')
      // const result =  list?.includes(route.path)
      // return result
      return true
    }
  };
}
