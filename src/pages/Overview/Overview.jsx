import React, { Component } from 'react';
import './index.scss';
import { Progress } from 'antd';

import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import { StatisOverviewApi } from '../../api/statis';

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        totalCapacity: 0,
        usedCapacity: 0,
        bucketCount: 0,
        objectMaxSize: '',
        objectMinSize: '',
        objectAverageSize: '',
        lastMonthObjectReferenceData: {},
      },
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    StatisOverviewApi()
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          this.setState({
            data: res.data,
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  render() {
    const { data } = this.state;
    const { lastMonthObjectReferenceData, lastMonthHotObjectRanking } = data;
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
                    <span className="display-value">{data.bucketCount}</span>
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

        <div className="oss-box">
          <div className="box-hd">
            <h3>最近30天的对象引用次数统计分布</h3>
          </div>
          <LineChart data={lastMonthObjectReferenceData} />
        </div>

        <div className="oss-box">
          <div className="box-hd">
            <h3>最近30天热点数据排行前10</h3>
          </div>
          <BarChart data={lastMonthHotObjectRanking} />
        </div>

      </div>
    );
  }
}
