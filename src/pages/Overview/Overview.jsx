import React, { Component } from 'react';
import './index.scss';
import { Progress } from 'antd';
import { getUserInfo } from '../../util/auth';

import { StatisOverviewApi } from '../../api/statis';

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        totalCapacity: 0,
        usedCapacity: 0,
        bucketCount: 0,
        objectCount: 0,
        objectMaxSize: '',
        objectMinSize: '',
        objectAverageSize: '',
        lastMonthObjectReferenceData: {},
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
          this.setState({
            data: res.data,
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
                    {data.totalCapacity - data.usedCapacity}
                    <span>G</span>
                  </div>
                </div>
                <div className="card-bd">
                  <div className="info">
                    <div>
                      <span>已使用：</span>
                      <span className="display-value">{data.usedCapacity}</span>
                      <span className="display-unit">G</span>
                    </div>
                    <div>
                      <span>总容量：</span>
                      <span className="display-value">{data.totalCapacity}</span>
                      <span className="display-unit">G</span>
                    </div>
                  </div>
                  <Progress percent={Math.ceil(data.usedCapacity / data.totalCapacity)} size="small" />
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
                    <span className="display-value">{data.objectCount}</span>
                    <span className="display-unit">个</span>
                  </div>
                </div>
                <div className="item">
                  <div className="card-hd">
                    <span>最大对象大小</span>
                  </div>
                  <div className="card-bd">
                    <span className="display-value">{data.objectMaxSize}</span>
                  </div>
                </div>
                <div className="item">
                  <div className="card-hd">
                    <span>最小对象大小</span>
                  </div>
                  <div className="card-bd">
                    <span className="display-value">{data.objectMinSize}</span>
                  </div>
                </div>
                <div className="item">
                  <div className="card-hd">
                    <span>平均对象大小</span>
                  </div>
                  <div className="card-bd">
                    <span className="display-value">{data.objectAverageSize}</span>
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
