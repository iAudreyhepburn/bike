import React, { Component } from 'react';
import { Card, Button, Radio } from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    DownloadOutlined,
    RightOutlined,
    LeftOutlined,
} from '@ant-design/icons';
import './ui.less';
class Buttons extends Component {
    state = {
        loading: true,
        size: 'default',
    };
    handleCloseLoading = () => {
        this.setState({
            loading: false,
        });
    };
    handleChange = (e) => {
        this.setState({
            size: e.target.value,
        });
    };
    render() {
        return (
            <>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type="dashed">Imooc</Button>
                    <Button type="danger">Imooc</Button>
                    <Button disabled>Imooc</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button>
                        <PlusOutlined />
                        创建
                    </Button>
                    <Button>
                        <EditOutlined />
                        编辑
                    </Button>
                    <Button>
                        <DeleteOutlined />
                        删除
                    </Button>
                    <Button shape="circle">
                        <SearchOutlined />
                    </Button>
                    <Button type="primary">
                        <SearchOutlined />
                        搜索
                    </Button>
                    <Button type="primary">
                        <DownloadOutlined />
                        下载
                    </Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>
                        确定
                    </Button>
                    <Button
                        type="primary"
                        shape="circle"
                        loading={this.state.loading}
                    ></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>
                        关闭
                    </Button>
                </Card>
                <Card title="按钮组" style={{ marginBottom: 10 }}>
                    <Button.Group>
                        <Button type="primary">
                            <LeftOutlined />
                            返回
                        </Button>
                        <Button type="primary">
                            前进
                            <RightOutlined />
                        </Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>
                        Imooc
                    </Button>
                    <Button size={this.state.size}>Imooc</Button>
                    <Button type="dashed" size={this.state.size}>
                        Imooc
                    </Button>
                    <Button type="danger" size={this.state.size}>
                        Imooc
                    </Button>
                </Card>
            </>
        );
    }
}

export default Buttons;
