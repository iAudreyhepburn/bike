import React, { Component } from 'react';
import { Card, Carousel } from 'antd';
import './ui.less';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
export default class Carousels extends Component {
    render() {
        return (
            <div>
                <Card title="图片背景轮播" className="card-wrap">
                    <Carousel>
                        <div>
                            <h3 style={contentStyle}>Ant Motion Banner - React</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>Ant Motion Banner - Vue</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>Ant Motion Banner - Angular</h3>
                        </div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}

