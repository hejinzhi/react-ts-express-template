// 设置表单数据
export const setFormField = (columnArray: any[], r: any, formRef: any) => {
  const keys: string[] = ['id'];
  columnArray.forEach((v) => keys.push(v.dataIndex as string));
  const obj = {} as any;
  keys.forEach((k: string) => {
    obj[k] = r[k];
  });
  setTimeout(() => {
    formRef.current?.setFieldsValue(obj);
  }, 10);
};

// 重置表单数据
export const resetForm = (columnArray: any[], formRef: any, defaultOption: any = {}) => {
  const obj = { id: null } as any;
  columnArray.forEach((v) => {
    obj[v.dataIndex] = defaultOption[v.dataIndex] ? defaultOption[v.dataIndex] : '';
  });
  formRef.current?.setFieldsValue(obj);
};

// 生成 ModalForm 栏位
export const genModalForm = (columnArray: any[]) => {
  const arr: { name: string; label: string }[] = [];
  columnArray.forEach((v) =>
    arr.push({
      name: v.dataIndex as string,
      label: v.title as string,
    }),
  );
  let result = '<ProFormText label="id" width="sm" name="id" hidden />';
  arr.forEach((v) => {
    result += `<ProFormText label="${v.label}" placeholder="请输入" width="sm" name="${v.name}" />`;
  });
  console.log(result);
};
