import React, { Component } from 'react';
import './index.scss';
import { Progress } from 'antd';
import { getUserInfo } from '../../util/auth';

import { StatisOverviewApi } from '../../api/statis';
import { formatFileSize } from '../../util/stringUtils';

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        totalObjectCount: 0,
        totalUsed: 0,
        bucketCount: 0,
        maxSize: 0,
        minSize: 0,
        allAverage: 0,
        capacity: 0,
      },
    };
  }

  componentDidMount() {
    const userInfo = getUserInfo();
    if (!userInfo) {
      this.props.history.push('/user/login');
    } else {
      this.initData();
    }
  }

  initData = () => {
    console.log('get statistics data');
    StatisOverviewApi()
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          console.log(res.data.total);
          this.setState({
            data: res.data.total,
          });
        }
      });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="overview">
        <div className="oss-box">
          <div className="box-hd">
            <h3>基础数据</h3>
          </div>

          <div className="box-bd">
            <div className="card-list">

              <div className="card left">
                <div className="card-hd">
                  <span>存储用量</span>
                  <div>
                    剩余可用:
                    {formatFileSize(data.capacity - data.totalUsed)}
                  </div>
                </div>
                <div className="card-bd">
                  <div className="info">
                    <div>
                      <span>已使用：</span>
                      <span className="display-value">{formatFileSize(data.totalUsed)}</span>
                    </div>
                    <div>
                      <span>总容量：</span>
                      <span className="display-value">{formatFileSize(data.capacity)}</span>
                    </div>
                  </div>
                  <Progress percent={Math.ceil(data.totalUsed / data.capacity)} size="small" />
                </div>
              </div>

              <div className="card right-statis">
                <div className="item">
                  <div className="card-hd">
                    <span>Bucket 数量</span>
                  </div>
                  <div className="card-bd">
                    <span className="display-value">{data.bucketCount}</span>
                    <span className="display-unit">个</span>
                  </div>
                </div>
                <div className="item">
                  <div className="card-hd">
                    <span>Object 数量</span>
                  </div>
                  <div className="card-bd">
                    <span className="display-value">{data.totalObjectCount}</span>
                    <span className="display-unit">个</span>
                  </div>
                </div>
                <div className="item">
                  <div className="card-hd">
                    <span>最大对象大小</span>
                  </div>
                  <div className="card-bd">
                    <span className="display-value">{formatFileSize(data.maxSize)}</span>
                  </div>
                </div>
                <div className="item">
                  <div className="card-hd">
                    <span>最小对象大小</span>
                  </div>
                  <div className="card-bd">
                    <span className="display-value">{formatFileSize(data.minSize)}</span>
                  </div>
                </div>
                <div className="item">
                  <div className="card-hd">
                    <span>平均对象大小</span>
                  </div>
                  <div className="card-bd">
                    <span className="display-value">{formatFileSize(data.allAverage)}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
