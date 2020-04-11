import React, { Component } from 'react';

import {
  BellOutlined,
  FileSearchOutlined,
  GithubOutlined,
  HddOutlined,
  KeyOutlined,
  MoreOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Avatar, Badge, Button, Divider, Layout, List, Popover, Tooltip } from 'antd';
import { getUserInfo, removeAll } from '../../../util/auth';
import './index.scss';

const { Header } = Layout;
const data = [
  {
    title: '系统通知 1',
  },
  {
    title: '系统通知 2',
  },
  {
    title: '系统通知 3',
  },
  {
    title: '系统通知 4',
  },
];
export default class LoginHeader extends Component {
  static displayName = 'LoginHeader';

  userInfo = getUserInfo() ? JSON.parse(getUserInfo()) : { username: '' };

  constructor(props) {
    super(props);
    this.state = {
      color: '#00a2ae',
      username: this.userInfo.username,
      noticePopShow: false,
      personPopShow: false,
    };
  }

  text = () => {
    const { username, color } = this.state;
    return (
      <div className="personal">
        <Avatar style={{
          backgroundColor: color,
          verticalAlign: 'middle',
          marginRight: '5px',
        }}
          size="large"
        >
          {username.substr(0, 1)}
        </Avatar>
        <span>{username}</span>
      </div>
    );
  };

  logout = (e) => {
    e.preventDefault();
    removeAll();
    localStorage.clear();
    window.location.replace(`${window.location.protocol}//${window.location.host}/#/user/login`);
  };

  goPage = (route, e) => {
    e.preventDefault();
    window.location.replace(`${window.location.protocol}//${window.location.host}/#${route}`);
    this.setState({
      noticePopShow: false,
      personPopShow: false,
    });
  };


  content = () => {
    return (
      <div className="personal-card-content">
        <div className="btn-group">
          <div className="item" onClick={e => this.goPage('/home/profile', e)}>
            <UserOutlined style={{ fontSize: '20px' }} />
            <div className="title">
              个人中心
            </div>
          </div>
          <div className="item" onClick={e => this.goPage('/home/secret', e)}>
            <KeyOutlined style={{ fontSize: '20px' }} />
            <div className="title">
              密钥管理
            </div>
          </div>
        </div>
        <Divider style={{ margin: '10px 0' }} />
        <div className="footer">
          <Button type="link" style={{ color: '#ccccccc' }} onClick={this.logout}>
            <PoweroffOutlined />
            退出当前账户
          </Button>
        </div>
      </div>
    );
  };

  noticePopContent = () => {
    return (
      <div className="notice-card-content">
        <div className="notice-list">
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge status="processing" />}
                  title={<a href="https://ant.design" style={{ fontSize: '12px' }}>{item.title}</a>}
                  description={
                    <span style={{ fontSize: '10px' }}>Message, message, message</span>
                  }
                />
              </List.Item>
            )}
          />
        </div>
        <Divider style={{ margin: '10px 0' }} />
        <div className="footer">
          <Button type="link" style={{ color: '#ccccccc' }} onClick={e => this.goPage('/home/notice', e)}>
            <MoreOutlined />
            更多通知
          </Button>
        </div>
      </div>
    );
  };

  handleVisibleChange = (visible) => {
    this.setState({ noticePopShow: visible });
  };

  handlePersonVisibleChange = (visible) => {
    this.setState({ personPopShow: visible });
  };

  render() {
    const { color, username, personPopShow, noticePopShow } = this.state;
    return (
      <Header className="default-header">
        <div className="left">
          <div className="logo" onClick={e => this.goPage('/', e)}>
            <HddOutlined />
            <span style={{ marginLeft: '5px' }} title="返回首页">对象存储OSS</span>
          </div>
        </div>
        <div className="right">
          <Popover content="Fork me on Github" className="item">
            <a href="https://github.com/HiCooper/oss-backend"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubOutlined />
            </a>
          </Popover>
          <Popover content="文档" className="item">
            <a href="https://hicooper007.gitbook.io/oss/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileSearchOutlined />
            </a>
          </Popover>
          <Popover placement="bottomRight"
            title={<span>系统通知(5未读)</span>}
            content={this.noticePopContent()}
            trigger="click"
            visible={noticePopShow}
            className="notice-bell"
            onVisibleChange={this.handleVisibleChange}
          >
            <Tooltip placement="bottom">
              <div className="item">
                <Badge dot>
                  <BellOutlined />
                </Badge>
              </div>
            </Tooltip>
          </Popover>
          <Popover placement="bottomRight"
            title={this.text()}
            content={this.content()}
            trigger="click"
            visible={personPopShow}
            className="item"
            onVisibleChange={this.handlePersonVisibleChange}
          >
            <div>
              <Avatar style={{
                backgroundColor: color,
                verticalAlign: 'middle',
                marginRight: '5px',
              }}
              >
                {username.substr(0, 1)
                  .toLocaleUpperCase()}
              </Avatar>
              <span style={{
                fontWeight: 'bold',
                marginRight: '5px',
              }}
              >
                {username}
              </span>
            </div>
          </Popover>
        </div>
      </Header>
    );
  }
}
