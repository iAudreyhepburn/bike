import { Col, Row } from 'antd';
import React from 'react';
import './index.less';
import Util from '../../utils/utils';
import axios from '../../axios';
export default class Header extends React.Component {
  state = { userName: '', sysTime: '', dayPictureUrl: '', weather: '' };
  componentDidMount() {
    this.setState({
      userName: '河畔一角',
    });
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime());
      this.setState({
        sysTime,
      });
    }, 1000);
    this.getWeatherAPIData();
  }
  getWeatherAPIData = () => {
    let city = '福州';
    axios
      .jsonp({
        url:
          'https://www.tianqiapi.com/api?version=v1&appid=21375891&appsecret=fTYv7v5E&city=' +
          encodeURIComponent(city),
      })
      .then((res) => {
        if (res.countryEn === 'China') {
          let data1 = res.data[5];
          this.setState({
            dayPictureUrl: data1.wea_img,
            weather: data1.wea,
          });
        }
      });
  };
  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            首页
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-detail">
              {/* <img src={this.state.dayPictureUrl} alt='' /> */}
              {this.state.weather}
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}
