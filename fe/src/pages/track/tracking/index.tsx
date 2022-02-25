import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import type { FC } from 'react';
import { useRef } from 'react';
import type { Tracking } from './data';
import { deleteTracking, getTrackingListEnum } from './service';
import { history } from 'umi';

export const trackingColumnArray: ProColumns<Tracking>[] = [
  {
    dataIndex: 'ywName',
    title: '业务员',
    align: 'center',
    fixed: 'left',
    width: 100,
  },
  {
    dataIndex: 'shipDate',
    title: '出货日期',
    align: 'center',
    fixed: 'left',
    width: 120,
    hideInSearch: true,
  },
  {
    dataIndex: 'customName',
    title: '客户名称',
    align: 'center',
    fixed: 'left',
    width: 100,
  },
  {
    dataIndex: 'supplier',
    title: '主供应商',
    align: 'center',
    fixed: 'left',
    width: 100,
  },
  {
    dataIndex: 'shipNo',
    title: '运单号',
    align: 'center',
    fixed: 'left',
    width: 100,
  },

  {
    dataIndex: 'deptName',
    title: '部门',
    align: 'center',
    width: 100,
  },
  {
    dataIndex: 'type',
    title: '类型',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'opName',
    title: '操作员',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },

  {
    dataIndex: 'shipType',
    title: '进出口类型',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'tripType',
    title: '运输方式',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'fromLocation',
    title: '装货地',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'fromPort',
    title: '起运港',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'targetPort',
    title: '目的港',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'productName',
    title: '货物名称',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'productQty',
    title: '件数',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'guiQty',
    title: '柜数/柜型',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'weight',
    title: '重量(kgs)',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'tiji',
    title: '方数(CBM)',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'tripName',
    title: '船名/航次/航班/车次',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'baoguan',
    title: '报关行',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'guiNum',
    title: '柜号',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'ftNum',
    title: '封条号',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'carNum',
    title: '车牌',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'firstEtd',
    title: '头程ETD',
    align: 'center',
    width: 120,
    hideInSearch: true,
  },
  {
    dataIndex: 'firstEta',
    title: '头程ETA',
    align: 'center',
    width: 120,
    hideInSearch: true,
  },
  {
    dataIndex: 'secondPort',
    title: '中转港',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    dataIndex: 'secondEtd',
    title: '二程ETD',
    align: 'center',
    width: 120,
    hideInSearch: true,
  },
  {
    dataIndex: 'secondEta',
    title: '二程ETA',
    align: 'center',
    width: 120,
    hideInSearch: true,
  },
  {
    dataIndex: 'arrivedDate',
    title: '签收日期',
    align: 'center',
    width: 120,
    hideInSearch: true,
  },
  {
    dataIndex: 'remark',
    title: '备注',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },

  {
    dataIndex: 'warehouseEta',
    title: '入仓时间',
    align: 'center',
    width: 150,
    hideInSearch: true,
  },

  {
    dataIndex: 'address',
    title: '收货地址',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
];

const TrackingPage: FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Tracking>[] = [
    ...trackingColumnArray,
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      hideInSetting: true,
      fixed: 'right',
      width: 100,
      render: (text, record) => [
        <a
          key="edit"
          onClick={() => {
            history.push({
              pathname: '/track/tracking/detail',
              query: {
                id: record.id!.toString(),
              },
            });
          }}
        >
          编辑
        </a>,

        <Popconfirm
          key="deleteConfirm"
          title="确定要删除这笔记录吗?"
          onConfirm={async () => {
            await deleteTracking(record.id!);
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
      <ProTable<Tracking>
        scroll={{ x: '100%' }}
        toolBarRender={() => [
          // <Link to={'/track/tracking/detail'}>
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push({
                pathname: '/track/tracking/detail',
              });
              // resetForm(columnArray, formRef);
              // handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          // </Link>,
        ]}
        columns={columns}
        rowKey="id"
        bordered
        actionRef={actionRef}
        request={getTrackingListEnum}
        pagination={{ defaultPageSize: 10 }}
      />
    </PageContainer>
  );
};

export default TrackingPage;
