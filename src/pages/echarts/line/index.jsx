import React, { Component } from 'react'
import { Card } from 'antd'
import echartTheme from './../echartTheme'
// import echarts from 'echarts'
//按需加载
// import echarts from 'echarts/lib/echarts'老版本
import * as echarts from 'echarts/core'
//导入饼图
import 'echarts/lib/chart/pie'
import ReactEcharts from 'echarts-for-react'

import {
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  MarkPointComponent
} from 'echarts/components'
export default class Line extends Component {
  componentWillMount() {
    echarts.registerTheme('Imooc', echartTheme);
  }
  getOption = () => {
    let option = {
      title: {
        text: '用户骑车订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [
            1000,
            2000,
            1500,
            3000,
            2000,
            1200,
            800
          ]
        }
      ]
    }
    return option;
  }
  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑车订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['OFO订单量', '摩拜订单量']
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'OFO订单量',
          type: 'line',
          data: [
            1300,
            2500,
            3400,
            2900,
            4200,
            4600,
            1800
          ]
        },
        {
          name: '摩拜订单量',
          type: 'line',
          data: [
            1000,
            2000,
            1500,
            3000,
            2000,
            1200,
            800
          ]
        }
      ]
    }
    return option;
  }
  getOption3 = () => {
    let option = {
      title: {
        text: '用户骑车订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [
            1000,
            2000,
            1500,
            3000,
            2000,
            1200,
            800
          ],
          areaStyle: {}
        }
      ]
    }
    return option;
  }
  render() {
    return (
      <div>
        <Card title="折线图表之一">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
        </Card>
        <Card title="折线图表之二" style={{ marginTop: 10 }}>
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
        </Card>
        <Card title="折线图表之三" style={{ marginTop: 10 }}>
          <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: 500 }} />
        </Card>
      </div>
    )
  }
}
