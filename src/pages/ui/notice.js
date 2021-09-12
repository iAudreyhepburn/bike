import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd';
import './ui.less'

export default class notice extends Component {
    openNotification = () => {
        notification.success({

        })
    }
    render() {
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={this.openNotification}></Button>
                </Card>
            </div>
        );
    }
}
