import { Col, Row } from 'antd';
import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import './style/common.less'
import Home from './pages/home'
export default class Admin extends React.Component {
    render() {
        return (
            <Row className="container">
                <Col span={4} className="nav-left">
                    <NavLeft />
                </Col>
                <Col span={20} className="main">
                    <Header />
                    <Row className="content">
                        {this.props.children}
                        {/* <Home /> */}
                    </Row>
                    <Footer />
                </Col>
            </Row>
        )
    }
}