import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import MainRouter from './MainRouter';
import { headMenuConfig, sideMenuConfig } from '../../menuConfig';
import './index.scss';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class BasicLayout extends Component {
    static displayName = 'BasicLayout';

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <Layout className="basic-layout">
          <Header className="header">
            <div className="logo" />
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
          </Header>
          <Layout>
            <Sider width={200} className="side">
              <Menu
                mode="inline"
                defaultOpenKeys={['1']}
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                {
                  sideMenuConfig.map((item, index) => {
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
                          item.children && item.children.length > 0 ? (
                            item.children.map((i) => {
                              return (
                                <Menu.Item key={i.name}>{i.name}</Menu.Item>
                              );
                            })
                          ) : null
                        }
                      </SubMenu>
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
