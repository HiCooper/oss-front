import React, { Component } from 'react';
import { Descriptions, Divider } from 'antd';
import './index.scss';

export default class PersonInfo extends Component {
  static displayName = 'PersonInfo';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="profile-home">
        <div className="bread">
          个人信息
        </div>
        <Divider type="horizontal" />

        <Descriptions title="基本信息">
          <Descriptions.Item label="用户名">Berry_Cooper</Descriptions.Item>
          <Descriptions.Item label="手机号">1810000000</Descriptions.Item>
          <Descriptions.Item label="邮箱">xxx@seassoon.com</Descriptions.Item>
          <Descriptions.Item label="等级">Shanghai, Xuhui</Descriptions.Item>
          <Descriptions.Item label="备注">无</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}
