import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Avatar, Col, Dropdown, Icon, Layout, Menu, Row } from 'antd';
import MainRouter from './MainRouter';
import { headMenuConfig, sideMenuConfig } from '../../menuConfig';
import './index.scss';
import { getParamsFromUrl, paramsToUrl } from '../../util/stringUtils';

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
      activateMenuPath: this.props.location.pathname,
    };
  }

  subMenuSelect = (item) => {
    const menuItem = JSON.parse(item.key);
    const location = this.props.location;
    const params = {};

    // 设置新的 type
    if (menuItem.type) {
      params.type = menuItem.type;
    }
    const paramsFromUrl = getParamsFromUrl(location.search);
    // 保留展示布局 vmode 参数
    if (paramsFromUrl.vmode) {
      params.vmode = paramsFromUrl.vmode;
    }
    // 全部文件 默认 list 布局
    if (menuItem.path === '/all' && !paramsFromUrl.vmode) {
      params.vmode = 'list';
    }
    const paramsStr = paramsToUrl(params);
    const newUrl = `${menuItem.path}?${paramsStr}`;
    if (newUrl !== (location.pathname + location.search)) {
      this.props.history.push(newUrl);
    }
  };

  componentWillReceiveProps(nextProps, _) {
    this.setState({
      activateMenuPath: nextProps.location.pathname,
    });
  }

  render() {
    const { color, userName, activateMenuPath } = this.state;
    return (
      <Layout className="basic-layout">
        <Header className="header">
          <div className="left">
            <div className="logo">
              <Icon type="hdd" />
              <span style={{ marginLeft: '5px' }}>对象存储</span>
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              {
                headMenuConfig && headMenuConfig.length > 0 ? headMenuConfig.map((item, index) => {
                  return (
                    <Menu.Item key={index + 1}>
                      <Link to={item.path}>{item.name}</Link>
                    </Menu.Item>
                  );
                }) : null
              }
            </Menu>
          </div>
          <div className="right">
            <Avatar style={{ backgroundColor: color, verticalAlign: 'middle', marginRight: '5px' }}>
              {userName.substr(0, 1)}
            </Avatar>
            <Dropdown overlay={menu}>
              <span style={{ color: '#ffffff', fontWeight: 'bold' }}>
                {userName}
                <Icon type="down" />
              </span>
            </Dropdown>
          </div>
        </Header>
        <Layout className="main-section">
          <Sider width={200} className="side">
            <Menu
              onSelect={this.subMenuSelect}
              mode="inline"
              defaultOpenKeys={['1']}
              defaultSelectedKeys={[activateMenuPath]}
              selectedKeys={[activateMenuPath]}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                sideMenuConfig.map((item) => {
                  return (
                    <Menu.Item key={JSON.stringify(item)}>
                      <Row>
                        <Col span={4}>
                          {
                            item.icon ? (<Icon type={item.icon} theme="filled" />) : null
                          }
                        </Col>
                        <Col span={20}>
                          {item.name}
                        </Col>
                      </Row>
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
