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
      title: '??????',
      align: 'center',
    },
    {
      dataIndex: 'tel',
      title: '??????',
      align: 'center',
    },
    {
      dataIndex: 'password',
      title: '??????',
      align: 'center',
      hideInTable: true,
      hideInSearch: true,
      hideInSetting: true,
      hideInDescriptions: true,
      hideInForm: true,
    },
    {
      dataIndex: 'roleId',
      title: '??????',
      align: 'center',
      valueType: 'select',
      fieldProps: {
        options: roleOptions,
      },
    },
    {
      dataIndex: 'deptId',
      title: '??????',
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
      title: '??????',
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
          ??????
        </a>,

        <Popconfirm
          key="deleteConfirm"
          title="???????????????????????????????"
          onConfirm={async () => {
            await deleteUser(record.id!);
            actionRef.current?.reload();
          }}
          okText="??????"
          cancelText="??????"
        >
          <a key="delete">??????</a>
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
            <PlusOutlined /> ??????
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
        title={isUpdate ? '????????????' : '????????????'}
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
            label="??????"
            placeholder="???????????????"
            rules={[
              {
                required: true,
                message: '??????????????????',
              },
            ]}
            width="sm"
            name="name"
          />
          <ProFormText
            label="??????"
            placeholder="?????????????????????"
            rules={[
              {
                required: true,
                message: '??????????????????',
              },
            ]}
            width="sm"
            name="tel"
          />

          <ProFormSelect
            label="??????"
            width="sm"
            name="deptId"
            options={deptList}
            rules={[
              {
                required: true,
                message: '??????????????????',
              },
            ]}
          />
        </ProForm.Group>

        <ProForm.Group>
          {!isUpdate && (
            <ProFormText.Password
              label="??????"
              placeholder="???????????????"
              rules={[
                {
                  required: true,
                  message: '??????????????????',
                },
              ]}
              width="sm"
              name="password"
            />
          )}

          <ProFormSelect
            label="??????"
            width="sm"
            name="roleId"
            options={roleOptions}
            rules={[
              {
                required: true,
                message: '??????????????????',
              },
            ]}
          />
        </ProForm.Group>
      </ModalForm>
    </PageContainer>
  );
};

export default UserPage;
