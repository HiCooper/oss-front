import React, { Component } from 'react';
import { Descriptions, Divider } from 'antd';
import './index.scss';
import { getUserInfo } from '../../util/auth';

export default class PersonInfo extends Component {
  static displayName = 'PersonInfo';

  constructor(props) {
    super(props);
    const userInfo = getUserInfo();
    this.state = {
      userInfo: userInfo ? JSON.parse(userInfo) : {},
    };
  }

  render() {
    const { userInfo } = this.state;
    return (
      <div className="profile-home">
        <div className="bread">
          个人信息
        </div>
        <Divider type="horizontal" />

        <Descriptions title="基本信息">
          <Descriptions.Item label="用户名">{userInfo.username}</Descriptions.Item>
          <Descriptions.Item label="手机号">{userInfo.phone || '无'}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{userInfo.email || '无'}</Descriptions.Item>
          <Descriptions.Item label="所在地">{userInfo.address || '无'}</Descriptions.Item>
          <Descriptions.Item label="备注">{userInfo.remark || '无'}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}
