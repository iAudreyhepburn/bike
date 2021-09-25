import React, { Component } from 'react'
import { Card } from 'antd'
import echartTheme from './../themeLight'
// import echarts from 'echarts'
//按需加载
// import echarts from 'echarts/lib/echarts'老版本
import * as echarts from 'echarts/core'
//导入饼图
import 'echarts/lib/chart/line'
import ReactEcharts from 'echarts-for-react'

import {
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  MarkPointComponent
} from 'echarts/components'
export default class Pie extends Component {
  componentWillMount() {
    echarts.registerTheme('Imooc', echartTheme);
  }
  getOption = () => {
    let option = {
      title: {
        text: '用户骑车订单',
        x: 'center'
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: [
            {
              value: 2340,
              name: '周一'
            },
            {
              value: 4000,
              name: '周二'
            },
            {
              value: 3500,
              name: '周三'
            },
            {
              value: 5300,
              name: '周四'
            },
            {
              value: 1000,
              name: '周五'
            },
            {
              value: 3200,
              name: '周六'
            },
            {
              value: 6300,
              name: '周日'
            }
          ]
        }
      ]
    }
    return option;
  }
  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑车订单',
        x: 'center'
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['50%', '80%'],
          data: [
            {
              value: 2340,
              name: '周一'
            },
            {
              value: 4000,
              name: '周二'
            },
            {
              value: 3500,
              name: '周三'
            },
            {
              value: 5300,
              name: '周四'
            },
            {
              value: 1000,
              name: '周五'
            },
            {
              value: 3200,
              name: '周六'
            },
            {
              value: 6300,
              name: '周日'
            }
          ]
        }
      ]
    }
    return option;
  }
  getOption3 = () => {
    let option = {
      title: {
        text: '用户骑车订单',
        x: 'center'
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: [
            {
              value: 2340,
              name: '周一'
            },
            {
              value: 4000,
              name: '周二'
            },
            {
              value: 3500,
              name: '周三'
            },
            {
              value: 5300,
              name: '周四'
            },
            {
              value: 1000,
              name: '周五'
            },
            {
              value: 3200,
              name: '周六'
            },
            {
              value: 6300,
              name: '周日'
            }
          ].sort((a, b) => {
            return a.value - b.value;
          }),
          roseType: 'radius',
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    }
    return option;
  }
  render() {
    return (
      <div>
        <Card title="饼图图表之一">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
        </Card>
        <Card title="饼图图表之二" style={{ marginTop: 10 }}>
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
        </Card>
        <Card title="饼图图表之三" style={{ marginTop: 10 }}>
          <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: 500 }} />
        </Card>
      </div>
    )
  }
}
