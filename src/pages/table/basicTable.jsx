import React, { Component } from 'react';
import { Card, Modal, Table, Button, message } from 'antd';
import axios from './../../axios';
import Utils from '../../utils/utils';
export default class BasicTable extends Component {
  state = {
    dataSource2: []
  };
  params = {
    page: 1
  }
  componentDidMount() {
    const data = [
      {
        id: '0',
        userName: 'Jack',
        sex: '1',
        status: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '杭州阿里飞天园区',
        time: '09:00'
      },
      {
        id: '1',
        userName: 'Tom',
        sex: '1',
        status: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '杭州阿里飞天园区',
        time: '09:00'
      },
      {
        id: '2',
        userName: 'susan',
        sex: '1',
        status: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '杭州阿里飞天园区',
        time: '09:00'
      },
    ]
    data.map((item, index) => {
      item.key = index;
    })
    this.setState({
      dataSource: data
    })
    this.request();
  }

  //动态获取mock数据
  request = () => {
    let _this = this;
    axios.ajax({
      url: '/table/basic/dataSource2',
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
          dataSource2: res.result.list,
          selectedRowKeys: [],
          selectedRows: null,
          pagination: Utils.pagination(res, (current) => {
            _this.params.page = current;
            this.request();
          })
        })
      }
    })
    // axios.get('/table/basic/dataSource2').then((res) => {
    //   if (res.status == '200' && res.data.code == 0) {
    //     this.setState({
    //       dataSource2: res.data.result
    //     })
    //   }
    // })
  }
  onRowClick = (record, index) => {
    let selectKey = [index];
    Modal.info({
      title: '信息',
      content: `用户名：${record.userName},爱好：${record.interest}`
    })
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  //多选执行删除操作
  handleDelete = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map(item => {
      ids.push(item.id);
    })
    Modal.confirm({
      title: '删除提示',
      content: `您确定要删除这些数据吗？${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功！');
        this.request();
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
        dataIndex: 'userName'
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
            '4': '前端达人'
          }
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
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
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        // let ids = [];
        // selectedRows.map(items => {
        //   ids.push(item.id);
        // })
        this.setState({
          selectedRowKeys,
          // selectIds: ids
          selectedRows
        })
      }
    }

    return (
      <div>
        <Card title="基础表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
        <Card title="动态数据渲染表格-Mock" style={{ margin: '10px 0' }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-单选" style={{ margin: '10px 0' }}>
          <Table
            rowSelection={rowSelection}
            bordered
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-多选" style={{ margin: '10px 0' }}>
          <div style={{ marginBottom: 10 }}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            rowSelection={rowCheckSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-表格分页" style={{ margin: '10px 0' }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}
