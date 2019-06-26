import React, { Component } from 'react';
import { Divider, Timeline } from 'antd';
import './index.scss';

export default class OpLog extends Component {
  static displayName = 'OpLog';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="oplog-home">
        <div className="bread">
          操作日志
        </div>
        <Divider type="horizontal" />
        <div className="oplog-list">
          <Timeline>
            <Timeline.Item color="green">创建第一个密钥 2019-06-05 09:12:12</Timeline.Item>
            <Timeline.Item color="red">删除存储空间 - berry - 2019-06-03 09:12:12</Timeline.Item>
            <Timeline.Item color="green">
              <p>编辑个人信息 2019-06-02 09:12:12</p>
              <p>创建存储空间 - berry - 2019-06-02 10:12:12</p>
              <p>通过管理平台上传第一个对象 - 2019-06-02 12:12:12</p>
            </Timeline.Item>
            <Timeline.Item>注册账户 - 2019-06-01 11:11:11</Timeline.Item>
          </Timeline>
        </div>
      </div>
    );
  }
}
