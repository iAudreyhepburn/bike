import React, { Component } from 'react';
import { Card, Modal, Table, Button, message, Badge } from 'antd';
import axios from './../../axios';

export default class HighTable extends Component {
  state = {
    dataSource: []
  };
  params = {
    page: 1
  }
  componentDidMount() {
    this.request();
  }
  //动态获取mock数据
  request = () => {
    // let _this = this;
    axios.ajax({
      url: '/table/high/dataSource3',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      if (res.code == 0) {
        res.result.list.map((item, index) => {
          item.key = index;
        })
        this.setState({
          dataSource: res.result.list,
        })
      }
    })
  }

  handleChange = (pagination, filters, sorter) => {
    // console.log('sorter.order', sorter.order)
    // console.log('sorter', sorter)
    this.setState({
      sortOrder: sorter.order
    })
  }
  //删除操作
  handleDelete = item => {
    let id = item.id;
    Modal.confirm({
      title: '确认',
      content: '您确认要删除此条数据吗？',
      onOk: () => {
        message.success('删除成功');
        this.request();
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        width: 80,
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '用户名',
        width: 80,
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '性别',
        width: 80,
        dataIndex: 'sex',
        key: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        width: 80,
        dataIndex: 'status',
        key: 'status',
        render(state) {
          let config = {
            '1': "咸鱼",
            '2': '风华浪子',
            '3': '北大才子',
            '4': '前端达人',

          }
          return config[state];
        }
      },
      {
        title: '爱好',
        width: 80,
        dataIndex: 'interest',
        key: 'interest',
        render(interest) {
          let config = {
            '1': "游泳",
            '2': '跑步',
            '3': '跳舞',
            '4': '篮球'
          }
          return config[interest];
        }
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '地址',
        width: 120,
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '早起时间',
        width: 80,
        dataIndex: 'time',
        key: 'time'
      }
    ]
    const columns2 = [
      {
        title: 'id',
        fixed: 'left',
        width: 80,
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '用户名',
        fixed: 'left',
        width: 80,
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '性别',
        width: 80,
        dataIndex: 'sex',
        key: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        width: 80,
        dataIndex: 'status',
        key: 'status',
        render(state) {
          let config = {
            '1': "咸鱼",
            '2': '风华浪子',
            '3': '北大才子',
            '4': '前端达人',

          }
          return config[state];
        }
      },
      {
        title: '爱好',
        width: 80,
        dataIndex: 'interest',
        key: 'interest',
        render(interest) {
          let config = {
            '1': "游泳",
            '2': '跑步',
            '3': '跳舞',
            '4': '篮球'
          }
          return config[interest];
        }
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '地址',
        width: 120,
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '早起时间',
        fixed: 'right',
        width: 80,
        dataIndex: 'time',
        key: 'time'
      }
    ]
    const columns3 = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => {
          return a.age - b.age;
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render(state) {
          let config = {
            '1': "咸鱼",
            '2': '风华浪子',
            '3': '北大才子',
            '4': '前端达人',

          }
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        key: 'interest',
        render(interest) {
          let config = {
            '1': "游泳",
            '2': '跑步',
            '3': '跳舞',
            '4': '篮球'
          }
          return config[interest];
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        key: 'time'
      }
    ]
    const columns4 = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '年龄',
        dataIndex: 'age'
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
        dataIndex: 'status',
        render(state) {
          let config = {
            '1': "咸鱼",
            '2': '风华浪子',
            '3': '北大才子',
            '4': '前端达人',

          }
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
          let config = {
            '1': <Badge status="success" text="成功" />,
            '2': <Badge status="error" text='报错' />,
            '3': <Badge status="default" text='正常' />,
            '4': <Badge status="processing" text='进行中' />,
            '5': <Badge status="warning" text='警告' />
          }
          return config[interest];
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '操作',
        render: (text, item) => {
          return <Button size="small" onClick={item => { this.handleDelete(item) }}>删除</Button>
        }
      }
    ]
    return (
      <div>
        <Card title="头部固定">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{ y: 240 }}
          />
        </Card>
        <Card title="左侧固定" style={{ margin: '10px 0' }}>
          <Table
            bordered
            columns={columns2}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{ y: 1970 }}
          />
        </Card>
        <Card title="表格排序" style={{ margin: '10px 0' }}>
          <Table
            bordered
            columns={columns3}
            dataSource={this.state.dataSource}
            pagination={false}
            onChange={this.handleChange}
          />
        </Card>
        <Card title="操作按钮" style={{ margin: '10px 0' }}>
          <Table
            bordered
            columns={columns4}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}

