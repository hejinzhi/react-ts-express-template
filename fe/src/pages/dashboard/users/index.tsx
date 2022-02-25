import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import type { User } from './data';
import { getUserList, addUser, deleteUser, updateUser } from './service';
import { setFormField, resetForm } from '@/utils/page-helper';
import { getRoleList } from '../role/service';
import { getDeptList } from '../dept/service';

const UserPage: FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance<User>>();
  const actionRef = useRef<ActionType>();
  const [roleOptions, setRoleOptions] = useState<{ label: string; value: number }[]>([]);
  const [deptList, setDeptList] = useState<{ label: string; value: number }[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const handleGetRoles = async () => {
      const res = await getRoleList({
        current: 1,
        pageSize: 999,
      });
      const result: { label: string; value: number }[] = [];
      res.data.forEach((v) => {
        result.push({
          label: v.name,
          value: v.id!,
        });
      });
      setRoleOptions(result);
    };

    const handleGetDeptList = async () => {
      const res = await getDeptList({
        current: 1,
        pageSize: 999,
      });
      const result: { label: string; value: number }[] = [];
      res.data.forEach((v) => {
        result.push({
          label: v.name,
          value: v.id!,
        });
      });
      setDeptList(result);
    };

    handleGetDeptList();
    handleGetRoles();
  }, []);

  const columnArray: ProColumns<User>[] = [
    {
      dataIndex: 'name',
      title: '姓名',
      align: 'center',
    },
    {
      dataIndex: 'tel',
      title: '电话',
      align: 'center',
    },
    {
      dataIndex: 'password',
      title: '密码',
      align: 'center',
      hideInTable: true,
      hideInSearch: true,
      hideInSetting: true,
      hideInDescriptions: true,
      hideInForm: true,
    },
    {
      dataIndex: 'roleId',
      title: '角色',
      align: 'center',
      valueType: 'select',
      fieldProps: {
        options: roleOptions,
      },
    },
    {
      dataIndex: 'deptId',
      title: '部门',
      align: 'center',
      valueType: 'select',
      fieldProps: {
        options: deptList,
      },
    },
  ];

  const columns: ProColumns<User>[] = [
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
            await deleteUser(record.id!);
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
      <ProTable<User>
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
        request={getUserList}
        pagination={{ defaultPageSize: 10 }}
      />
      <ModalForm
        formRef={formRef}
        title={isUpdate ? '更新用户' : '新建用户'}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        width="60%"
        layout="vertical"
        onFinish={async () => {
          const user = await formRef.current?.validateFields();
          if (user) {
            if (user.id) {
              await updateUser(user);
            } else {
              await addUser(user);
            }
          }
          handleModalVisible(false);
          actionRef.current?.reload();
          resetForm(columnArray, formRef);
        }}
      >
        <ProForm.Group>
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
            label="电话"
            placeholder="请输入电话号码"
            rules={[
              {
                required: true,
                message: '电话为必填项',
              },
            ]}
            width="sm"
            name="tel"
          />

          <ProFormSelect
            label="部门"
            width="sm"
            name="deptId"
            options={deptList}
            rules={[
              {
                required: true,
                message: '部门为必填项',
              },
            ]}
          />
        </ProForm.Group>

        <ProForm.Group>
          {!isUpdate && (
            <ProFormText.Password
              label="密码"
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: '密码为必填项',
                },
              ]}
              width="sm"
              name="password"
            />
          )}

          <ProFormSelect
            label="角色"
            width="sm"
            name="roleId"
            options={roleOptions}
            rules={[
              {
                required: true,
                message: '角色为必填项',
              },
            ]}
          />
        </ProForm.Group>
      </ModalForm>
    </PageContainer>
  );
};

export default UserPage;
