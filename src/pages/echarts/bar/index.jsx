import React, { Component } from 'react'
import { Card } from 'antd'
import echartTheme from './../echartTheme.js'
// import echarts from 'echarts'
//按需加载
// import echarts from 'echarts/lib/echarts'老版本
import * as echarts from 'echarts/core'
//导入柱形图
import 'echarts/lib/chart/bar'
import ReactEcharts from 'echarts-for-react'

import {
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  MarkPointComponent
} from 'echarts/components'
export default class Bar extends Component {
  componentWillMount() {
    echarts.registerTheme('Imooc', echartTheme);
  }
  getOption = () => {
    let option = {
      title: {
        title: '用户骑行订单'
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
          type: 'bar',
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
        }
      ]
    }
    return option;
  }
  getOption2 = () => {
    let option = {
      title: {
        title: '用户骑行订单'
      },
      legend: {
        data: ['OFO', '摩拜', '小蓝']
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
          name: 'OFO',
          type: 'bar',
          data: [990, 2600, 657, 3067, 4565, 1450, 8040]
        },
        {
          name: '摩拜',
          type: 'bar',
          data: [1000, 6200, 5500, 3300, 2320, 3240, 8200]
        },
        {
          name: '小蓝',
          type: 'bar',
          data: [2300, 3500, 3400, 3450, 2540, 6500, 4800]
        }
      ]
    }
    return option;
  }
  render() {
    return (
      <div>
        <Card title="柱形图表之一">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
        </Card>
        <Card title="柱形图表之二" style={{ marginTop: 10 }}>
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
        </Card>
      </div>
    )
  }
}
