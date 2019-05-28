import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Avatar, Button, Col, Divider, Dropdown, Icon, Layout, Menu, Popover, Row } from 'antd';
import MainRouter from './MainRouter';
import { sideMenuConfig } from '../../menuConfig';
import './index.scss';

const { Header, Content, Sider } = Layout;

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
