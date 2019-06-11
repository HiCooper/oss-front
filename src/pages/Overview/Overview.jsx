import React, { Component } from 'react';
import './index.scss';
import { Progress } from 'antd';

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="overview">
        <div className="oss-box">

          <div className="box-hd">
            <h3>基础数据</h3>
          </div>

          <div className="box-bd">

            <div className="card-list">
              <div className="card">
                <div className="card-hd">
                  <span>存储用量</span>
                  <span>剩余可用: 12.383 G</span>
                </div>
                <div className="card-bd">
                  <div className="info">
                    <div>
                      <span>已使用：</span>
                      <span className="display-value">5.307</span>
                      <span className="display-unit">G</span>
                    </div>
                    <div>
                      <span>总容量：</span>
                      <span className="display-value">17.69</span>
                      <span className="display-unit">G</span>
                    </div>
                  </div>
                  <Progress percent={30} size="small" />
                </div>
              </div>
              <div className="card">
                <div className="card-hd">
                  <span>Bucket</span>
                </div>
                <div className="card-bd">
                  <span className="display-value">2</span>
                  <span className="display-unit">个</span>
                </div>
              </div>
              <div className="card">
                <div className="card-hd">
                  <span>存储用量</span>
                  <span>剩余可用: 12.383 G</span>
                </div>
                <div className="card-bd">
                  <div className="info">
                    <div>
                      <span>已使用：</span>
                      <span className="display-value">5.307</span>
                      <span className="display-unit">G</span>
                    </div>
                    <div>
                      <span>总容量：</span>
                      <span className="display-value">17.69</span>
                      <span className="display-unit">G</span>
                    </div>
                  </div>
                  <Progress percent={30} size="small" />
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}
