import React, { Component } from 'react';
import { Divider } from 'antd';
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
      </div>
    );
  }
}
