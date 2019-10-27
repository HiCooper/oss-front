import React, { Component } from 'react';
import BarChart from './components/BarChart';
import { StatisticsHotDataApi } from '../../api/statis';
import { getCurrentBucket } from '../../util/Bucket';

export default class StatsHot extends Component {
  static displayName = 'StatsHot';

  constructor(props) {
    super(props);
    const bucketInfo = getCurrentBucket();
    this.state = {
      bucketInfo,
      hotData: [],
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    const { bucketInfo } = this.state;
    StatisticsHotDataApi({ bucket: bucketInfo.name })
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          this.setState({
            hotData: res.data,
          });
        }
      });
  };

  render() {
    const { hotData } = this.state;
    return (
      <div>
        <div className="oss-box">
          <div className="box-hd">
            <h3>最近30天热点数据排行前10</h3>
          </div>
          <BarChart data={hotData} />
        </div>
      </div>
    );
  }
}
