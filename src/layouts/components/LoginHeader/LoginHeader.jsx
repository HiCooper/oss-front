import React, { Component } from 'react';
import { Avatar, Button, Divider, Icon, Layout, Popover } from 'antd';
import { getUserInfo, removeAll } from '../../../util/auth';
import './index.scss';

const { Header } = Layout;

export default class LoginHeader extends Component {
  static displayName = 'LoginHeader';

  userInfo = getUserInfo() ? JSON.parse(getUserInfo()) : { username: '' };

  constructor(props) {
    super(props);
    this.state = {
      color: '#00a2ae',
      username: this.userInfo.username,
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

  content = () => {
    return (
      <div className="personal-card-content">
        <div className="btn-group">
          <div className="item" onClick={e => this.props.goPage('/home/person', e)}>
            <Icon type="user" style={{ fontSize: '20px' }} />
            <div className="title">
              个人信息
            </div>
          </div>
          <div className="item" onClick={e => this.props.goPage('/home/secret', e)}>
            <Icon type="key" style={{ fontSize: '20px' }} />
            <div className="title">
              密钥管理
            </div>
          </div>
        </div>
        <Divider style={{ margin: '10px 0' }} />
        <div className="footer">
          <Button type="link" style={{ color: '#ccccccc' }} onClick={this.logout}>
            <Icon type="poweroff" />
            退出当前账户
          </Button>
        </div>
      </div>
    );
  };

  logout = () => {
    removeAll();
    localStorage.clear();
    this.props.history.push('/user/login');
  };


  render() {
    const { color, username } = this.state;
    return (
      <Header className="default-header">
        <div className="left">
          <div className="logo" onClick={e => this.goPage('/', e)}>
            <Icon type="hdd" />
            <span style={{ marginLeft: '5px' }}>对象存储OSS</span>
          </div>
        </div>
        <div className="right">
          <Popover placement="bottomRight"
            title={this.text()}
            content={this.content()}
            trigger="click"
            className="personal-info"
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
