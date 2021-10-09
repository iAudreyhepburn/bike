import React, { Component } from 'react';
import { Card, Modal, Button, Radio, Form, Input, DatePicker, Select } from 'antd';
import axios from './../../axios';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
export default class User extends Component {
  formRef = React.createRef();
  params = {
    page: 1
  }
  state = {
    isVisible: false
  }
  formList = [
    {
      type: 'INPUT',
      label: '用户名',
      field: 'user_name',
      placeholder: '请输入用户昵称',
      width: 100,
    },
    {
      type: 'INPUT',
      label: '手机号',
      field: 'user_mobile',
      placeholder: '请输入手机号',
      width: 100,
    },
    {
      type: 'DATE',
      label: '请选择入职日期',
      field: 'user_date',
      placeholder: '请输入日期'
    },
  ]
  componentDidMount() {
    this.requestList();
  }
  handleFilter = (params) => {
    this.params = params;
    this.requestList();
  }

  requestList = () => {
    axios.requestList(this, '/user/list', this.params);
  }

  handleOperate = (type) => {
    let item = this.state.selectedItem;
    console.log("item", item);
    if (type == 'create') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工',
        userInfo: {}
      })
    } else if (type == 'edit') {
      console.log("selectedItem", this.state.selectedItem);
      if (item.length < 1) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return;
      }
      this.setState({
        type,
        isVisible: true,
        title: '编辑员工',
        userInfo: item
      })
    } else if (type == 'detail') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return;
      }
      this.setState({
        type,
        isVisible: true,
        title: '员工详情',
        userInfo: item
      })
      console.log("this.state.userInfo", this.state.userInfo);
    } else {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return;
      }
      let _this = this;
      Modal.confirm({
        title: '确认删除',
        content: '是否要删除当前选中的员工',
        onOk() {
          axios.ajax({
            url: '/user/delete',
            data: {
              params: {
                id: item.id
              }
            }
          }).then((res) => {
            if (res.code == 0) {
              _this.setState({
                isVisible: false
              })
              _this.requestList();
            }
          })
        }
      })
    }
  }

  //创建员工提交
  handleSubmit = () => {
    // let item = this.state.selectedItem;
    let type = this.state.type;
    let data = this.formRef.current.formRef.current.getFieldsValue();
    axios.ajax({
      url: type == 'create' ? '/user/add' : '/user/edit',
      data: { params: data }
    }).then((res) => {
      this.formRef.current.formRef.current.resetFields();
      if (res.code == 0) {
        this.setState({
          isVisible: false,
          selectedRowKeys: [],
          selectedItem: []
        })
        this.requestList();
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          return {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者',
          }[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
          return {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
            '6': '骑行',
            '7': '桌球',
            '8': '麦霸',
          }[interest]
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '联系地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]
    let footer = {};
    if (this.state.type == 'detail') {
      footer = {
        footer: null
      }
    }
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{ marginTop: 10 }} className='operate-wrap'>
          <Button type="primary" onClick={() => { this.handleOperate('create') }}><PlusOutlined />创建员工</Button>
          <Button type="primary" onClick={() => { this.handleOperate('edit') }}><EditOutlined />编辑员工</Button>
          <Button type="primary" onClick={() => { this.handleOperate('detail') }}>员工详情</Button>
          <Button type="primary" onClick={() => { this.handleOperate('delete') }}><DeleteOutlined />删除员工</Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            pagination={false}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
          />
        </div>
        <Modal formRef={this.formRef}
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.formRef.current.formRef.current.resetFields();
            this.setState({
              isVisible: false
            })
          }}
          width={600}
          destroyOnClose
          {...footer}
        >
          <UserForm userInfo={this.state.userInfo} type={this.state.type} ref={this.formRef} />
        </Modal>
      </div>
    )
  }
}
class UserForm extends Component {
  formRef = React.createRef();
  getState = (state) => {
    return {
      '1': '咸鱼一条',
      '2': '风华浪子',
      '3': '北大才子一枚',
      '4': '百度FE',
      '5': '创业者'
    }[state]
  }
  getSex = (sex) => {
    return {
      1: '男',
      2: '女',
    }[sex]
  }
  render() {
    let type = this.props.type;
    console.log("type", type);
    let userInfo = this.props.userInfo || {};
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    }
    return (
      <Form layout="horizontal" ref={this.formRef}>
        <FormItem label="用户名" {...formItemLayout} initialValue={userInfo.username} >
          {
            type == "detail" ? userInfo.username :
              <FormItem  {...formItemLayout} name="username" initialValue={userInfo.username} >
                <Input type="text" placeholder="请输入用户名" />
              </FormItem>
          }
        </FormItem>
        <FormItem label="性别" {...formItemLayout} initialValue={userInfo.sex} >
          {
            type == "detail" ? this.getSex(userInfo.sex) :
              <FormItem {...formItemLayout} name="sex" initialValue={userInfo.sex} >
                <RadioGroup>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </RadioGroup>
              </FormItem>
          }
        </FormItem>

        <FormItem label="状态" {...formItemLayout} initialValue={userInfo.state} >
          {
            type == "detail" ? this.getState(userInfo.state) :
              <FormItem  {...formItemLayout} name="state" initialValue={userInfo.state} >
                <Select>
                  <Option value={1}>咸鱼一条</Option>
                  <Option value={2}>风华浪子</Option>
                  <Option value={3}>北大才子</Option>
                  <Option value={4}>百度FE</Option>
                  <Option value={5}>创业者</Option>
                </Select>
              </FormItem>
          }
        </FormItem>
        <FormItem label="生日" {...formItemLayout} initialValue={moment(userInfo.birthday)}  >
          {
            userInfo && type == 'detail' ? userInfo.birthday :
              <FormItem {...formItemLayout} name="birthday" initialValue={moment(userInfo.birthday)}  >
                <DatePicker />
              </FormItem >
          }
        </FormItem >
        <FormItem label="联系地址" {...formItemLayout} initialValue={userInfo.address}  >
          {
            userInfo && type == 'detail' ? userInfo.address :
              <FormItem {...formItemLayout} name="address" initialValue={userInfo.address}  >
                <TextArea rows={3} placeholder="请输入联系地址" />
              </FormItem >
          }
        </FormItem >
      </Form >
    )
  }
}
