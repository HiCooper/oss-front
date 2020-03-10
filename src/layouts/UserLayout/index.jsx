import React, { Component } from 'react';
import { Icon, Layout, Menu } from 'antd';
import UserRouter from './UserRouter';
import LoginHeader from '../components/LoginHeader';
import './index.scss';
import { homeUserMenuConfig } from '../../menuConfig';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class UserLayout extends Component {
  static displayName = 'UserLayout';

  constructor(props) {
    super(props);
    const pathname = this.props.location.pathname;
    const lastPath = pathname.substr(pathname.lastIndexOf('/'));
    this.state = {
      currentActivate: lastPath,
    };
  }

  subMenuSelect = (item) => {
    this.setState({
      currentActivate: item.key,
    });
    const base = this.props.match.url;
    const newUrl = base + item.key;
    if (newUrl !== this.props.location.pathname) {
      this.props.history.push(newUrl);
    }
  };

  componentWillReceiveProps(nextProps, nextContent) {
    const pathname = nextProps.location.pathname;
    const currentActivate = pathname.substr(pathname.lastIndexOf('/'));
    this.setState({
      currentActivate,
    });
  }

  render() {
    const { currentActivate } = this.state;
    return (
      <Layout style={{ height: '100%' }}>
        <LoginHeader />
        <Layout style={{
          marginTop: '50px',
          height: '100%',
        }}
        >
          <Sider width={200} className="user-sider">
            <Menu
              onSelect={this.subMenuSelect}
              mode="inline"
              defaultSelectedKeys={[currentActivate]}
              selectedKeys={[currentActivate]}
              defaultOpenKeys={['0', '1']}
              style={{
                height: '100%',
                borderRight: 0,
              }}
            >
              {
                homeUserMenuConfig && homeUserMenuConfig.length > 0
                  ? homeUserMenuConfig.map((item, index) => {
                    return (
                      <SubMenu
                        key={index}
                        title={(
                          <span>
                            <Icon type={item.icon} />
                            {item.name}
                          </span>
                        )}
                      >
                        {
                          item.children && item.children.length > 0
                            ? item.children.map((child) => {
                              return (
                                <Menu.Item key={child.path}>{child.name}</Menu.Item>
                              );
                            }) : null
                        }
                      </SubMenu>
                    );
                  })
                  : null
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 18px' }}>
            <Content
              style={{
                background: '#fff',
                padding: 18,
                margin: 0,
                height: '100%',
                overflowY: 'auto',
                minHeight: 280,
              }}
            >
              <UserRouter />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
