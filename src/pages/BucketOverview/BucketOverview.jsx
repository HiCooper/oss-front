import React, { Component } from 'react';
import './index.scss';

export default class BucketOverview extends Component {
    static displayName = 'BucketOverview';

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <div className="bucket-overview">
          <div className="oss-box">
            <div className="box-hd">
              <h3>基础设置</h3>
            </div>
            <div className="basic-setting-box">
              <div className="item">
                <div className="item-key">
                  读写权限
                </div>
                <div className="item-value">
                  私有
                </div>
              </div>
              <div className="item">
                <div className="item-key">
                  防盗链
                </div>
                <div className="item-value">
                  未开启
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
