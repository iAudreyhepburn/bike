import React from 'react';
import MenuConfig from '../../config/menuConfig-1';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { switchMenu } from './../../redux/action'
import { NavLink } from 'react-router-dom';
import './index.less';

import logo from '/assets/logo-ant.svg';

const { SubMenu } = Menu;
class NavLeft extends React.Component {
  state = {
    // currentKey: '',
    menuTreeNode: ''
  }
  handleClick = ({ item, key }) => {
    console.log("item", item)
    const { dispatch } = this.props;
    dispatch(switchMenu(item.props.title));
    this.setState({
      currentKey: key
    })
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '');
    this.setState({
      currentKey,
      menuTreeNode,
    });
  }
  //菜单渲染
  renderMenu = (data) => {
    console.log("data", data)
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} title={item.title}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="logo">
          <img src={logo} alt="" />
          <h1>Imooc MS</h1>
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={this.state.currentKey}
          theme="dark"
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}
export default connect()(NavLeft);