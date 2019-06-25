import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import UserRouter from './UserRouter';
import LoginHeader from '../components/LoginHeader';
import './index.scss';
import { homeUserMenuConfig } from '../../menuConfig';

const { Content } = Layout;
export default class UserLayout extends Component {
  static displayName = 'UserLayout';

  constructor(props) {
    super(props);
    const pathname = this.props.location.pathname;
    const lastPath = pathname.substr(pathname.lastIndexOf('/'));
    console.log(lastPath);
    this.state = {
      currentActivate: lastPath,
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  subMenuSelect = (item) => {
    this.setState({
      currentActivate: item.key,
    });
    const pathname = this.props.location.pathname;
    const lastPath = pathname.substr(pathname.lastIndexOf('/'));
    const newUrl = pathname.replace(lastPath, item.key);
    if (newUrl !== this.props.location.pathname) {
      this.props.history.push(newUrl);
    }
  };

  goPage = (route) => {
    this.props.history.push(route);
  };

  render() {
    const { currentActivate } = this.state;
    return (
      <div>
        <LoginHeader goPage={this.goPage} />
        <Content className="info-content">
          <Menu
            onSelect={this.subMenuSelect}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[currentActivate]}
            selectedKeys={[currentActivate]}
            style={{ lineHeight: '46px' }}
          >
            {
              homeUserMenuConfig && homeUserMenuConfig.length > 0 ? homeUserMenuConfig.map((item) => {
                return (
                  <Menu.Item key={item.path}>
                    {item.name}
                  </Menu.Item>
                );
              }) : null
            }
          </Menu>
          <UserRouter />
        </Content>
      </div>
    );
  }
}
