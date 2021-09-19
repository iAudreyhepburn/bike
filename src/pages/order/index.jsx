import React, { Component } from 'react';
import { Card, Modal, Table, Button, message, Form, Select, DatePicker } from 'antd';
import axios from './../../axios';
import Utils from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends Component {
  state = {
    orderInfo: {},
    orderConfirmVisble: false
  }
  params = {
    page: 1
  }
  componentDidMount() {
    this.requestList();
  }
  requestList = () => {
    let _this = this;
    axios.ajax({
      url: '/order/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then(res => {
      this.setState({
        list: res.result.item_list.map((item, index) => {
          item.key = index;
          return item;
        }),
        pagination: Utils.pagination(res, (current) => {
          _this.params.page = current;
          _this.requestList();
        })
      })
    })
  }
  //订单结束确认
  handleConfirm = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: "信息",
        content: "请选择一条订单进行结束"
      })
      return;
    }
    axios.ajax({
      url: '/order/ebike_info',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          orderInfo: res.result,
          orderConfirmVisble: true
        })
      }
    })
  }
  //结束订单
  handleFinishOrder = () => {
    let item = this.state.selectedItem;
    axios.ajax({
      url: '/order/finish_order',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then(res => {
      if (res.code == 0) {
        message.success('订单结束成功！');
        this.setState({
          orderConfirmVisble: false
        })
        this.requestList();
      }
    })
  }
  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: "信息",
        content: "请先选择一条订单"
      })
      return;
    }
    window.open(`/#/common/order/detail/${item.id}`, "_black");
  }
  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render(distance) {
          return distance / 1000 + "KM";
        }
      },
      {
        title: '形式时长',
        dataIndex: 'total_time'
      },
      {
        title: '状态',
        dataIndex: 'status'
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ]
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    return (
      <div>
        <FilterForm />
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleConfirm}>结束订单</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisble}
          onCancel={() => {
            this.setState({
              orderConfirmVisble: false
            })
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout="horizontal">
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
class FilterForm extends Component {
  render() {
    return (
      <Form layout="inline" ref={this.formRef}>
        <FormItem label="城市">
          <Select
            style={{ width: 100 }}
            placeholder="全部"
          >
            <Option value="">全部</Option>
            <Option value="1">北京市</Option>
            <Option value="2">天津市</Option>
            <Option value="3">深圳市</Option>
          </Select>
        </FormItem>
        <FormItem label="订单时间">
          <DatePicker name="start_time" showTime format="YYYY-MM-DD HH:mm:ss" />
        </FormItem>
        <FormItem>
          <DatePicker name="end_time" showTime format="YYYY-MM-DD HH:mm:ss" />
        </FormItem>
        <FormItem label="订单状态">
          <Select
            style={{ width: 80 }}
            placeholder="全部"
            name="op_mode"
          >
            <Option value="">全部</Option>
            <Option value="1">进行中</Option>
            <Option value="2">结束行程</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    )
  }
}