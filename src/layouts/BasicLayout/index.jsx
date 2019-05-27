import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Avatar, Col, Dropdown, Icon, Layout, Menu, Row } from 'antd';
import MainRouter from './MainRouter';
import { headMenuConfig, sideMenuConfig } from '../../menuConfig';
import './index.scss';
import { getParamsFromUrl, getPathnameFromUrl, paramsToUrl } from '../../util/stringUtils';

const { Header, Content, Sider } = Layout;

const colorList = ['#00a2ae'];

class BasicLayout extends Component {
  static displayName = 'BasicLayout';

  theme = localStorage.getItem('theme');

  constructor(props) {
    super(props);
    this.state = {
      color: colorList[0],
      userName: 'HiCooper',
      activateMenuPath: this.props.location.pathname,
      currentTheme: this.theme || 'default',
    };
  }

  subMenuSelect = (item) => {
    console.log(item);
    const pathname = item.key;
    const baseUrlParams = getParamsFromUrl(pathname);
    const baseUrl = getPathnameFromUrl(pathname);
    const location = this.props.location;
    const params = {};
    const paramsFromUrl = getParamsFromUrl(location.search);
    // 新的type
    if (baseUrlParams.type) {
      params.type = baseUrlParams.type;
    }
    // 保留展示布局 vmode 参数
    if (paramsFromUrl.vmode) {
      params.vmode = paramsFromUrl.vmode;
    }
    // 全部文件 默认 list 布局
    if (pathname === '/all' && !paramsFromUrl.vmode) {
      params.vmode = 'list';
    }
    const paramsStr = paramsToUrl(params);
    const newUrl = `${baseUrl}?${paramsStr}`;
    if (newUrl !== (location.pathname + location.search)) {
      this.props.history.push(newUrl);
    }
  };

  componentWillReceiveProps(nextProps, _) {
    this.setState({
      activateMenuPath: nextProps.location.pathname,
    });
  }

  changeTheme = (type, e) => {
    e.preventDefault();
    console.log(type);
    if (type !== this.state.currentTheme) {
      this.setState({
        currentTheme: type,
      });
      localStorage.setItem('theme', type);
    }
  };

  themeSelect = () => (
    <Menu>
      <Menu.Item>
        <span onClick={e => this.changeTheme('default', e)}>默认</span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={e => this.changeTheme('picture', e)}>图片</span>
      </Menu.Item>
    </Menu>
  );

  menu = () => (
    <Menu>
      <Menu.Item>
        <Link to="/">
          安全推出
        </Link>
      </Menu.Item>
    </Menu>
  );

  render() {
    const { color, userName, activateMenuPath, currentTheme } = this.state;
    return (
      <Layout className="basic-layout">
        <Header className={currentTheme === 'default' ? 'default-header' : 'picture-header'}>
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
            <Dropdown overlay={this.themeSelect}>
              <span style={{ fontWeight: 'bold' }}>
                <Icon type="bg-colors" style={{ marginRight: '10px', fontSize: '20px', fontWeight: 'bold' }} />
              </span>
            </Dropdown>
            <Avatar style={{ backgroundColor: color, verticalAlign: 'middle', marginRight: '5px' }}>
              {userName.substr(0, 1)}
            </Avatar>
            <Dropdown overlay={this.menu}>
              <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
                {userName}
                <Icon type="down" />
              </span>
            </Dropdown>
          </div>
        </Header>
        <Layout className="main-section">
          <Sider width={200} className={currentTheme === 'picture' ? 'picture-side' : 'default-side'}>
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
                    <Menu.Item key={item.path}>
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
