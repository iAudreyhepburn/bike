import { Col, Row } from 'antd';
import React from 'react';
import './index.less';
import Util from '../../utils/utils';
import axios from '../../axios';
import logo from '/assets/logo-ant.svg';
import { connect } from 'react-redux';
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
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
    const { menuType } = this.props;
    return (
      <div className="header">
        <Row className="header-top">
          {
            menuType ? <Col span={6} className="logo">
              <img src={logo} alt="" />
              <span>IMooc 通用管理系统</span>
            </Col> : ""
          }
          <Col span={menuType ? 18 : 24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        {
          menuType ? "" :
            <Row className="breadcrumb">
              <Col span={4} className="breadcrumb-title">
                {this.props.menuName}
              </Col>
              <Col span={20} className="weather">
                <span className="date">{this.state.sysTime}</span>
                <span className="weather-detail">
                  {/* <img src={this.state.dayPictureUrl} alt='' /> */}
                  {this.state.weather}
                </span>
              </Col>
            </Row>
        }
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    menuName: state.menuName
  }
}
export default connect(mapStateToProps)(Header)