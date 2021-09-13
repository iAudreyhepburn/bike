import React, { Component } from 'react';
import { Card, message, Tabs } from 'antd';
import { AppleOutlined, LoginOutlined, PlusCircleOutlined } from '@ant-design/icons'
import './ui.less';
const { TabPane } = Tabs;
export default class tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    newTabIndex = 0;
    handleCallback = (key) => {
        message.info("Hi,您选择了页签" + key);
    }
    componentWillMount() {
        const panes = [
            {
                title: 'Tab 1',
                content: 'Tab 1',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: 'Tab 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Tab 3',
                key: '3'
            }
        ]
        this.setState({
            activeKey: panes[0].key,
            panes
        })
    }
    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };

    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };
    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActivekey="1" onChange={this.handleCallback}>
                        <TabPane tab="tab 1" key="1">
                            欢迎学习React课程
                        </TabPane>
                        <TabPane tab="tab 2" key="2" disabled>
                            欢迎学习React课程
                        </TabPane>
                        <TabPane tab="tab 3" key="3">
                            React 很 nice.
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActivekey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><AppleOutlined />tab 1</span>} key="1">
                            欢迎学习React课程
                        </TabPane>
                        <TabPane tab={<span><LoginOutlined />tab 1</span>} key="2">
                            欢迎学习React课程
                        </TabPane>
                        <TabPane tab={<span><PlusCircleOutlined />tab 1</span>} key="3">
                            React 很 nice.
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        // defaultActivekey="1"
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panel) => {
                                return <TabPane
                                    tab={panel.title}
                                    key={panel.key}
                                />
                            })
                        }
                    </Tabs>
                </Card>
            </div >
        );
    }
}
