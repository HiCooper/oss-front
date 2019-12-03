import React, { Component } from 'react';
import './index.scss';
import { getCurrentBucket } from '../../util/Bucket';
import { getAclDesc } from '../../util/AclTable';
import LineChart from './components/LineChart';
import { StatisticsDailyQueryTimesApi } from '../../api/statis';

export default class BucketOverview extends Component {
  static displayName = 'BucketOverview';

  constructor(props) {
    super(props);
    this.state = {
      bucketInfo: getCurrentBucket(),
      data: {},
    };
  }

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps(nextProps, nextContent) {
    this.initData();
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    const bucketInfo = getCurrentBucket();
    StatisticsDailyQueryTimesApi({ bucket: bucketInfo.name })
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          this.setState({
            data: res.data,
            bucketInfo,
          });
        }
      });
  };

  render() {
    const { bucketInfo, data } = this.state;
    return (
      <div className="bucket-overview">
        <div className="oss-box">
          <div className="box-hd">
            <h3>基础设置</h3>
          </div>
          <div className="basic-setting-box">
            <div className="item basic-settings-item">
              <div className="item-key">
                读写权限
              </div>
              <div className="item-value">
                <div className="value-and-setting">
                  <span>{getAclDesc(bucketInfo.acl)}</span>
                  <a className="next-btn next-small next-btn-normal go-setting"
                    href={`/#/bucket/${bucketInfo.name}/settings`}
                  >
                    设置
                  </a>
                </div>
              </div>
            </div>
            <div className="item basic-settings-item">
              <div className="item-key">
                防盗链
              </div>
              <div className="item-value">
                <div className="value-and-setting">
                  <span>{bucketInfo.referer ? '已开启' : '未开启'}</span>
                  <a className="next-btn next-small next-btn-normal go-setting"
                    href={`/#/bucket/${bucketInfo.name}/settings`}
                  >
                    设置
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="oss-box">
          <div className="box-hd">
            <h3>最近30天的对象引用次数统计分布</h3>
          </div>
          <LineChart data={data} />
        </div>
      </div>
    );
  }
}
