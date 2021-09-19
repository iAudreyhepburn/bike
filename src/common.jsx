import { Col, Row } from 'antd';
import React from 'react';
import Header from './components/Header';
import './style/common.less';
export default class Common extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div >
        <Row className="simple-page">
          <Header menuType="second" style={{ flex: 1 }} />
        </Row>
        <div className="content" style={{ padding: 40 }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
