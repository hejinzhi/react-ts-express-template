import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormDateTimePicker } from '@ant-design/pro-form';
import { ProFormDatePicker, ProFormSelect } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';

import type { FC } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import type { Tracking } from './data';
import { addTracking, updateTracking, getTrackingById } from './service';
import type { DatePickerProps } from 'antd';
import { Button, message } from 'antd';
import { useModel, history } from 'umi';
import { getYwList } from '@/pages/dashboard/person/service';
import { getCustomList } from '@/pages/dashboard/custom/service';
import type { FieldProps } from '@ant-design/pro-form/lib/interface';
import { setFormField } from '@/utils/page-helper';
import { trackingColumnArray } from '.';
import { isMoment } from 'moment';

type QueryProps = {
  id: string;
};

const TrackingDetailPage: FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const query = history.location.query as QueryProps;

  const formRef = useRef<ProFormInstance<Tracking>>();
  const actionRef = useRef<ActionType>();
  const datePicker: (FieldProps & DatePickerProps) | undefined = {
    picker: 'date',
    format: 'YYYY-MM-DD',
  };
  const datetimePicker: (FieldProps & DatePickerProps) | undefined = {
    picker: 'date',
    format: 'YYYY-MM-DD HH:mm:ss',
  };

  // console.log(currentUser);
  // console.log(query?.id);
  const handleFormatDate = (tracking: Tracking) => {
    const keys = ['firstEta', 'firstEtd', 'secondEta', 'secondEtd', 'shipDate', 'arrivedDate'];
    keys.forEach((k) => {
      if (isMoment(tracking[k]) && tracking[k]) {
        tracking[k] = tracking[k].format('YYYY-MM-DD');
      }
    });
    if (isMoment(tracking.warehouseEta) && tracking.warehouseEta) {
      tracking.warehouseEta = (tracking.warehouseEta as any).format('YYYY-MM-DD HH:mm:ss');
    }
    return tracking;
  };

  const handleSave = async () => {
    const t = await formRef.current?.validateFields();
    if (t) {
      const tracking = handleFormatDate({ ...t });
      // console.log((tracking.shipDate as any).format('YYYY-MM-DD'));
      // return;
      if (tracking.id) {
        await updateTracking(tracking);
        message.success('保存成功', 2);
        history.push('/track/tracking');
      } else {
        const res = await addTracking(tracking);
        if (res.data) {
          message.success('保存成功', 2);
          history.push('/track/tracking');
        } else {
          message.error(res.message);
        }
      }
    }
    actionRef.current?.reload();
  };

  // if(query?.id) {
  //   const res = await getTrackingById(query.id)
  // }
  useEffect(() => {
    const getTrack = async () => {
      if (query?.id) {
        const res = await getTrackingById(query.id);
        if (res) {
          setFormField(trackingColumnArray, res, formRef, {
            ywName: 'ywId',
            customName: 'customId',
            // opName: 'opId',
          });
        }
      }
    };
    getTrack();
  }, [query.id]);

  return (
    <PageContainer>
      <ProCard
        title="货物追踪表详情"
        headerBordered
        extra={
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
        }
      >
        <ProForm formRef={formRef} title="新建货物追踪记录" submitter={false}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <ProFormText label="id" width="sm" name="id" hidden />

            <ProFormText
              label="部门"
              placeholder=""
              width="sm"
              name="deptName"
              disabled
              initialValue={query?.id ? '' : currentUser?.dept}
            />
            <ProFormSelect
              label="业务员"
              width="sm"
              name="ywId"
              rules={[
                {
                  required: true,
                  message: '业务员为必填项',
                },
              ]}
              request={getYwList}
              showSearch
              debounceTime={500}
            />

            <ProFormSelect
              label="客户"
              width="sm"
              name="customId"
              rules={[
                {
                  required: true,
                  message: '客户为必填项',
                },
              ]}
              request={getCustomList}
              showSearch
              debounceTime={500}
            />

            <ProFormText
              label="操作员"
              placeholder=""
              width="sm"
              name="opName"
              disabled
              initialValue={query?.id ? '' : currentUser?.name}
            />

            <ProFormDatePicker
              label="出货日期"
              width="sm"
              name="shipDate"
              fieldProps={datePicker}
            />
            <ProFormText
              label="运单号"
              placeholder=""
              width="sm"
              name="shipNo"
              rules={[
                {
                  required: true,
                  message: '运单号为必填项',
                },
              ]}
            />
            <ProFormSelect
              label="类型"
              placeholder=""
              width="sm"
              name="type"
              valueEnum={{
                散货: '散货',
                整柜: '整柜',
              }}
            />
            <ProFormSelect
              label="进出口类型"
              placeholder=""
              width="sm"
              name="shipType"
              valueEnum={{
                进口: '进口',
                出口: '出口',
              }}
            />

            <ProFormText label="运输方式" placeholder="" width="sm" name="tripType" />
            <ProFormText label="装货地" placeholder="" width="sm" name="fromLocation" />
            <ProFormText label="起运港" placeholder="" width="sm" name="fromPort" />
            <ProFormText label="目的港" placeholder="" width="sm" name="targetPort" />

            <ProFormText label="货物名称" placeholder="" width="sm" name="productName" />
            <ProFormText label="件数" placeholder="" width="sm" name="productQty" />
            <ProFormText label="柜数/柜型" placeholder="" width="sm" name="guiQty" />
            <ProFormText label="重量(kgs)" placeholder="" width="sm" name="weight" />

            <ProFormText label="方数(CBM)" placeholder="" width="sm" name="tiji" />
            <ProFormText label="船名/航次/航班/车次" placeholder="" width="sm" name="tripName" />
            <ProFormText label="报关行" placeholder="" width="sm" name="baoguan" />
            <ProFormText label="柜号" placeholder="" width="sm" name="guiNum" />

            <ProFormText label="封条号" placeholder="" width="sm" name="ftNum" />
            <ProFormText label="车牌" placeholder="" width="sm" name="carNum" />
            <ProFormDatePicker
              label="头程ETD"
              placeholder=""
              width="sm"
              name="firstEtd"
              fieldProps={datePicker}
            />
            <ProFormDatePicker
              label="头程ETA"
              placeholder=""
              width="sm"
              name="firstEta"
              fieldProps={datePicker}
            />

            <ProFormText label="中转港" placeholder="" width="sm" name="secondPort" />
            <ProFormDatePicker
              label="二程ETD"
              placeholder=""
              width="sm"
              name="secondEtd"
              fieldProps={datePicker}
            />
            <ProFormDatePicker
              label="二程ETA"
              placeholder=""
              width="sm"
              name="secondEta"
              fieldProps={datePicker}
            />
            <ProFormDatePicker
              label="签收日期"
              placeholder=""
              width="sm"
              name="arrivedDate"
              fieldProps={datePicker}
            />

            <ProFormText label="备注" placeholder="" width="sm" name="remark" />
            {/* <ProFormText label="主供应商" placeholder="" width="sm" name="supplier" /> */}
            <ProFormDateTimePicker
              label="入仓时间"
              placeholder=""
              width="sm"
              name="warehouseEta"
              fieldProps={datetimePicker}
            />
            {/* <ProFormText label="目的港清关" placeholder="" width="sm" name="destPort" /> */}
            <ProFormText label="收货地址" placeholder="" width="sm" name="address" />
          </div>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default TrackingDetailPage;
