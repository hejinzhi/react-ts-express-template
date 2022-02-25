import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import  { ModalForm, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import type { Dept } from './data';
import { getDeptList, addDept, deleteDept, updateDept } from './service';
import { setFormField, resetForm } from '@/utils/page-helper';

const DeptPage: FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance<Dept>>();
  const actionRef = useRef<ActionType>();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {

  }, []);

  const columnArray: ProColumns<Dept>[] = [
    {
      dataIndex: 'name',
      title: '名称',
      align: 'center',
    },
    {
      dataIndex: 'desc',
      title: '备注',
      align: 'center',
    },
  ];
  const columns: ProColumns<Dept>[] = [
    ...columnArray,
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      hideInSetting: true,
      render: (text, record) => [
        <a
          key="edit"
          onClick={() => {
            setIsUpdate(true);
            setFormField(columnArray, record, formRef);
            handleModalVisible(true);
          }}
        >
          编辑
        </a>,

        <Popconfirm
          key="deleteConfirm"
          title="确定要删除这笔记录吗?"
          onConfirm={async () => {
            await deleteDept(record.id!);
            actionRef.current?.reload();
          }}
          okText="确定"
          cancelText="取消"
        >
          <a key="delete">删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<Dept>
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              // setMenu();
              setIsUpdate(false);
              resetForm(columnArray, formRef);
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        columns={columns}
        rowKey="id"
        bordered
        actionRef={actionRef}
        request={getDeptList}
        pagination={{ defaultPageSize: 10 }}
      />
      <ModalForm
        formRef={formRef}
        title={isUpdate ? '更新部门' : '新建部门'}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        width="60%"
        layout="vertical"
        onFinish={async () => {
          const dept = await formRef.current?.validateFields();
          if (dept) {
            if (dept.id) {
              await updateDept(dept);
            } else {
              await addDept(dept);
            }
          }
          handleModalVisible(false);
          actionRef.current?.reload();
          resetForm(columnArray, formRef);
        }}
      >
        {/* <ProForm.Group> */}
          <ProFormText label="id" width="sm" name="id" hidden />

          <ProFormText
            label="名称"
            placeholder="请输入名称"
            rules={[
              {
                required: true,
                message: '名称为必填项',
              },
            ]}
            width="sm"
            name="name"
          />
          <ProFormText
            label="备注"
            placeholder="请输入备注"
            width="sm"
            name="desc"
          />
        {/* </ProForm.Group> */}
      </ModalForm>
    </PageContainer>
  );
};

export default DeptPage;
