import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Avatar, Col, Dropdown, Icon, Layout, Menu, Row } from 'antd';
import MainRouter from './MainRouter';
import { sideMenuConfig } from '../../menuConfig';
import './index.scss';

const { Header, Content, Sider } = Layout;

const colorList = ['#00a2ae'];

class BasicLayout extends Component {
  static displayName = 'BasicLayout';

  theme = localStorage.getItem('theme');

  constructor(props) {
    super(props);
    const { pathname } = this.props.location;
    const base = pathname.substr(0, pathname.lastIndexOf('/'));
    console.log(base);
    this.state = {
      color: colorList[0],
      userName: 'HiCooper',
      activateMenuPath: base,
      currentTheme: this.theme || 'default',
      leftMenuConfig: sideMenuConfig,
    };
  }

  componentDidMount() {
    // 获取 bucket 列表
    const { leftMenuConfig } = this.state;
    leftMenuConfig.push(
      {
        name: 'hicooper',
        path: '/bucket/hicooper',
      },
      {
        name: 'newBucket',
        path: '/bucket/newBucket',
      }
    );
    this.setState({
      leftMenuConfig,
    });
  }

  subMenuSelect = (item) => {
    const location = this.props.location;
    console.log(item.key);
    if (`${item.key}/overview` !== (location.pathname + location.search)) {
      this.props.history.push(`${item.key}/overview`);
    }
  };


  componentWillReceiveProps(nextProps, _) {
    const pathname = nextProps.location.pathname;
    const base = pathname.substr(0, pathname.lastIndexOf('/'));
    this.setState({
      activateMenuPath: base,
    });
  }

  changeTheme = (type, e) => {
    e.preventDefault();
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
    const { color, userName, activateMenuPath, currentTheme, leftMenuConfig } = this.state;
    return (
      <Layout className="basic-layout">
        <Header className={currentTheme === 'default' ? 'default-header' : 'picture-header'}>
          <div className="left">
            <div className="logo">
              <Icon type="hdd" />
              <span style={{ marginLeft: '5px' }}>对象存储</span>
            </div>
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
                leftMenuConfig.map((item) => {
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
