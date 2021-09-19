import React, { Component } from 'react';
import { Card, Modal, Table, Button, message, Form, Select } from 'antd';
import axios from './../../axios';
import Utils from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends Component {
  formRef = React.createRef();
  state = {
    list: [],
    isShowOpenCity: false
  }
  params = {
    page: 1
  }

  componentDidMount() {
    this.requestList();
  }
  //默认请求数据接口
  requestList = () => {
    let _this = this;
    axios.ajax({
      url: '/city/open_city',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
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


  // getValues = () => {
  //   // 得到 Form 实例
  //   const form = this.formRef.current;//获取到所有属性值
  //   const userInfo = this.formRef.current.getFieldsValue();
  //   // 使用 getFieldsValue 获取多个字段值
  //   const values = form.getFieldsValue(['name', 'age'])
  //   console.log(values)
  // }

  //开通城市
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }
  //城市开通提交
  handleSubmit = () => {
    console.log(this.formRef);
    let cityInfo = this.formRef.current.formRef.current.getFieldsValue()
    console.log(cityInfo);
    axios.ajax({
      url: '/city/open',
      data: {
        params: cityInfo
      }
    }).then((res) => {
      console.log(res)
      if (res.code === 0) {
        message.success('开通成功');
        this.setState({ isShowOpenCity: false });
        this.requestList();
      }
    })
  }
  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      }, {
        title: '城市名称',
        dataIndex: 'name'
      }, {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode) {
          return mode == 1 ? '停车点' : '禁停区';
        }
      }, {
        title: '营运模式',
        dataIndex: 'op_mode',
        render(op_mode) {
          return op_mode == 1 ? '自营' : '加盟';
        }
      }, {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      }, {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(arr) {
          return arr.map((item) => {
            return item.user_name;
          }).join(',');
        }
      }, {
        title: '城市开通时间',
        dataIndex: 'open_time'
      }, {
        title: '操作时间',
        dataIndex: 'update_time',
        render: Utils.formateDate
      }, {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ]
    return (
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal formRef={this.formRef}
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}
          onOk={this.handleSubmit}
        >
          <OpenCityForm ref={this.formRef} />
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
        <FormItem label="用车模式">
          <Select
            style={{ width: 120 }}
            placeholder="全部"
          >
            <Option value="">全部</Option>
            <Option value="1">指定停车点模式</Option>
            <Option value="2">禁停区模式</Option>
          </Select>
        </FormItem>
        <FormItem label="营运模式">
          <Select
            style={{ width: 80 }}
            placeholder="全部"
          >
            <Option value="">全部</Option>
            <Option value="1">自营</Option>
            <Option value="2">加盟</Option>
          </Select>
        </FormItem>
        <FormItem label="加盟商授权状态">
          <Select
            style={{ width: 100 }}
            placeholder="全部"
          >
            <Option value="">全部</Option>
            <Option value="1">已授权</Option>
            <Option value="2">未授权</Option>
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
class OpenCityForm extends Component {
  formRef = React.createRef();
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    return (
      <Form layout="horizontal" ref={this.formRef}>
        <FormItem label="选择城市" name='name' {...formItemLayout} initialValue="1">
          <Select style={{ width: 200 }}>
            <Option value="">全部</Option>
            <Option value="1">北京市</Option>
            <Option value="2">天津市</Option>
          </Select>
        </FormItem>
        <FormItem label="营运模式" name='op_mode' {...formItemLayout} initialValue="1">
          <Select style={{ width: 200 }}>
            <Option value="1">自营</Option>
            <Option value="2">加盟</Option>
          </Select>
        </FormItem>
        <FormItem label="用车模式" name='car_mode' {...formItemLayout} initialValue="1">
          <Select style={{ width: 200 }}>
            <Option value="1">指定停车点</Option>
            <Option value="2">禁停区</Option>
          </Select>
        </FormItem>
      </Form>
    )
  }
}