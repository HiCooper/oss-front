import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Avatar, Dropdown, Icon, Layout, Menu } from 'antd';
import MainRouter from './MainRouter';
import { headMenuConfig, sideMenuConfig } from '../../menuConfig';
import './index.scss';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const colorList = ['#00a2ae'];

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/">
        安全推出
      </Link>
    </Menu.Item>
  </Menu>
);

class BasicLayout extends Component {
  static displayName = 'BasicLayout';

  constructor(props) {
    super(props);
    this.state = {
      color: colorList[0],
      userName: 'HiCooper',
    };
  }

  subMenuSelect = (item) => {
    this.props.history.push(item.key);
  };

  render() {
    const { color, userName } = this.state;
    return (
      <Layout className="basic-layout">
        <Header className="header">
          <div className="left">
            <div className="logo">
              <span>对象存储OSS</span>
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              {
                headMenuConfig.map((item, index) => {
                  return (
                    <Menu.Item key={index + 1}>{item.name}</Menu.Item>
                  );
                })
              }
            </Menu>
          </div>
          <div className="right">
            <Avatar style={{ backgroundColor: color, verticalAlign: 'middle', marginRight: '5px' }} size="large">
              {userName.substr(0, 1)}
            </Avatar>
            <Dropdown overlay={menu}>
              <span style={{ color: '#ffffff' }}>
                {userName}
                <Icon type="down" />
              </span>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="side">
            <Menu
              onSelect={this.subMenuSelect}
              mode="inline"
              defaultOpenKeys={['1']}
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                sideMenuConfig.map((item, index) => {
                  if (item.children && item.children.length > 0) {
                    return (
                      <SubMenu
                        key={index + 1}
                        title={(
                          <span>
                            <Icon type={item.icon} />
                            {item.name}
                          </span>
                        )}
                      >
                        {
                          item.children.map((i) => {
                            return (
                              <Menu.Item key={i.path}>{i.name}</Menu.Item>
                            );
                          })
                        }
                      </SubMenu>
                    );
                  }
                  return (
                    <Menu.Item key={item.path}>
                      {
                        item.icon ? (<Icon type={item.icon} />) : null
                      }
                      {item.name}
                    </Menu.Item>
                  );
                })
              }
            </Menu>
          </Sider>
          <Layout className="main-content">
            <Content className="content">
              <MainRouter />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(BasicLayout);
