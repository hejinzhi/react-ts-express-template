import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { DrawerForm } from '@ant-design/pro-form';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Tree } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import type { Role } from './data';
import { getRoleList, addRole, updateRole, deleteRole } from './service';
import { setFormField, resetForm } from '@/utils/page-helper';
import { getMenus } from '../users/service';
import type { RouteInterface, TreeInterface } from '@/interface';

const RolePage: FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [drawModalVisible, setDrawModalVisible] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance<Role>>();
  const actionRef = useRef<ActionType>();
  const [routeTree, setRoutetree] = useState<TreeInterface[]>([]);
  const [checkedKeys, setCheckedkeys] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>();

  const onCheck = (cks: any) => {
    setCheckedkeys(cks);
  };

  const handleRouteToTree = (r: RouteInterface[]) => {
    const defaultTree: TreeInterface[] = [
      {
        title: '全部',
        key: 'all',
        children: [],
      },
    ];
    r.forEach((v) => {
      const obj: TreeInterface = {
        title: v.desc,
        key: v.name,
        children: [],
      };
      if (v.routes.length > 0) {
        v.routes.forEach((vv) => {
          obj.children.push({
            title: vv.desc,
            key: vv.path,
          });
        });
      }
      defaultTree[0].children.push(obj);
    });
    setRoutetree(defaultTree);
  };
  useEffect(() => {
    getMenus().then((res) => {
      const r = JSON.parse(res.data) as RouteInterface[];
      handleRouteToTree(r);
    });
  }, []);

  const handleDrawModalFinish = async () => {
    if (selectedRole) {
      await updateRole({ ...selectedRole, permissions: checkedKeys.join(',') });
    }
    setDrawModalVisible(false);
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };

  const columnArray: ProColumns<Role>[] = [
    {
      dataIndex: 'name',
      title: '角色',
      align: 'center',
    },
    {
      dataIndex: 'desc',
      title: '描述',
      align: 'center',
    },
  ];
  const columns: ProColumns<Role>[] = [
    ...columnArray,
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      hideInSetting: true,
      width: 200,
      render: (text, record) => [
        <a
          key="edit"
          onClick={() => {
            setFormField(columnArray, record, formRef);
            handleModalVisible(true);
          }}
        >
          编辑
        </a>,

        <a
          key="role"
          onClick={() => {
            setCheckedkeys(record.permissions.split(','));
            setSelectedRole(record);
            setDrawModalVisible(true);
          }}
        >
          授权
        </a>,

        <Popconfirm
          key="deleteConfirm"
          title="确定要删除这笔记录吗?"
          onConfirm={async () => {
            await deleteRole(record.id!);
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
      <ProTable<Role>
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              // setMenu();
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
        request={getRoleList}
        pagination={{ defaultPageSize: 10 }}
      />
      <ModalForm
        formRef={formRef}
        title="新建角色"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        // width="60%"
        layout="vertical"
        onFinish={async () => {
          const role = await formRef.current?.validateFields();
          if (role) {
            if (role.id) {
              await updateRole(role);
            } else {
              await addRole(role);
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
            label="角色"
            placeholder="请输入角色"
            rules={[
              {
                required: true,
                message: '角色为必填项',
              },
            ]}
            width="sm"
            name="name"
          />

          <ProFormText label="描述" placeholder="请输入描述" width="sm" name="desc" />
        </ProForm.Group>
      </ModalForm>

      <DrawerForm
        title="角色权限配置"
        drawerProps={{
          forceRender: true,
          destroyOnClose: true,
        }}
        onFinish={async () => {
          // 不返回不会关闭弹框
          handleDrawModalFinish();
          return true;
        }}
        visible={drawModalVisible}
        onVisibleChange={setDrawModalVisible}
      >
        <Tree
          checkable
          treeData={routeTree}
          onCheck={onCheck}
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
        />
      </DrawerForm>
    </PageContainer>
  );
};

export default RolePage;
