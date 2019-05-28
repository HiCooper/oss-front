import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Button, Col, Divider, Drawer, Dropdown, Icon, Input, Layout, Menu, Popover, Row } from 'antd';
import MainRouter from './MainRouter';
import { sideMenuConfig } from '../../menuConfig';
import './index.scss';

const { Header, Content, Sider } = Layout;
const Search = Input.Search;

class BasicLayout extends Component {
  static displayName = 'BasicLayout';

  theme = localStorage.getItem('theme');

  constructor(props) {
    super(props);
    const { pathname } = this.props.location;
    const base = pathname.substr(0, pathname.lastIndexOf('/'));
    this.state = {
      color: '#00a2ae',
      userName: 'HiCooper',
      activateMenuPath: base,
      currentTheme: this.theme || 'default',
      leftMenuConfig: [],
      visible: false,
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


   text = () => {
     const { userName, color } = this.state;
     return (
       <div className="personal">
         <Avatar style={{ backgroundColor: color, verticalAlign: 'middle', marginRight: '5px' }} size="large">
           {userName.substr(0, 1)}
         </Avatar>
         <span>{userName}</span>
       </div>
     );
   };

   content = () => {
     return (
       <div className="personal-card-content">
         <div className="btn-group">
           <div className="item">
             <Icon type="user" style={{ fontSize: '20px' }} />
             <div className="title">
               个人信息
             </div>
           </div>
           <div className="item">
             <Icon type="key" style={{ fontSize: '20px' }} />
             <div className="title">
               密钥管理
             </div>
           </div>
         </div>
         <Divider style={{ margin: '10px 0' }} />
         <div className="footer">
           <Button type="link" style={{ color: '#ccccccc' }}>
             <Icon type="poweroff" />
             退出当前账户
           </Button>
         </div>
       </div>
     );
   };

   renderMenuItem = (item) => {
     return (
       <Menu.Item key={item.path}>
         <Row>
           <Col span={4}>
             {
               item.icon ? (<Icon type={item.icon} theme="filled" />) : <span className="bucket-dot" />
             }
           </Col>
           <Col span={20}>
             {item.name}
           </Col>
         </Row>
       </Menu.Item>
     );
   };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { color, userName, activateMenuPath, currentTheme, leftMenuConfig } = this.state;
    return (
      <Layout className="basic-layout">
        <Header className={currentTheme === 'default' ? 'default-header' : 'picture-header'}>
          <div className="left">
            <div className="logo">
              <Icon type="hdd" />
              <span style={{ marginLeft: '5px' }}>对象存储OSS</span>
            </div>
          </div>
          <div className="right">
            <Dropdown overlay={this.themeSelect}>
              <span style={{ fontWeight: 'bold' }}>
                <Icon type="bg-colors" style={{ marginRight: '20px', fontSize: '20px', fontWeight: 'bold' }} />
              </span>
            </Dropdown>
            <Popover placement="bottomRight" title={this.text()} content={this.content()} trigger="click" className="personal-info">
              <div>
                <Avatar style={{ backgroundColor: color, verticalAlign: 'middle', marginRight: '5px' }}>
                  {userName.substr(0, 1)}
                </Avatar>
                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
                  {userName}
                </span>
              </div>
            </Popover>
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
                 sideMenuConfig.map(this.renderMenuItem)
               }
              <div className="operate">
                <Search
                  placeholder="搜索存储空间"
                  onSearch={value => console.log(value)}
                  style={{ width: 130 }}
                />
              </div>
              <div className="bucket-list-title">
                <span>存储空间</span>
                <div>
                  <Popover placement="top" content="新建Bucket" trigger="hover">
                    <Icon type="plus" style={{ cursor: 'pointer', marginRight: '8px' }} onClick={this.showDrawer} />
                  </Popover>
                  <Popover placement="top" content="刷新" trigger="hover">
                    <Icon type="sync" style={{ cursor: 'pointer' }} />
                  </Popover>
                </div>
              </div>
              {
                leftMenuConfig.map(this.renderMenuItem)
               }
            </Menu>
          </Sider>
          <Layout className="main-content">
            <Content className="content">
              <MainRouter />
            </Content>
          </Layout>
        </Layout>

        <Drawer
          width={640}
          placement="right"
          closable
          maskClosable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p style={{ ...pStyle, marginBottom: 24 }}>User Profile</p>
          <p style={pStyle}>Personal</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Full Name" content="Lily" />
              {' '}
            </Col>
            <Col span={12}>
              <DescriptionItem title="Account" content="AntDesign@example.com" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="City" content="HangZhou" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Country" content="China🇨🇳" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Birthday" content="February 2,1900" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Website" content="-" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Message"
                content="Make things as simple as possible but no simpler."
              />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>Company</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Position" content="Programmer" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Responsibilities" content="Coding" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Department" content="AFX" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Skills"
                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
              />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>Contacts</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content="AntDesign@example.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Github"
                content={(
                  <a href="http://github.com/ant-design/ant-design/">
                     github.com/ant-design/ant-design/
                  </a>
)}
              />
            </Col>
          </Row>
        </Drawer>

      </Layout>
    );
  }
}

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}
:
    </p>
    {content}
  </div>
);

export default withRouter(BasicLayout);
