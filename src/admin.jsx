import { Col, Row } from 'antd';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from './components/NavLeft';
import './style/common.less';
// import Home from './pages/home'
export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Row className="container">
        <Col span={4} className="nav-left">
          <NavLeft />
        </Col>
        <Col span={20} className="main">
          <Header />
          <div className="content">
            {this.props.children}
            {/* <Home /> */}
          </div>
          <Footer />
        </Col>
      </Row>
    );
  }
}
