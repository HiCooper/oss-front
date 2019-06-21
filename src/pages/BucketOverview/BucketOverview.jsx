import React, { Component } from 'react';
import './index.scss';
import { Button } from 'antd';

export default class BucketOverview extends Component {
  static displayName = 'BucketOverview';

  constructor(props) {
    super(props);
    this.state = {
      bucketName: this.props.match.params.name,
      showAclSettingBtn: false,
    };
  }

  componentDidMount() {
    console.log(this.state.bucketName);
  }

  showAclSettingBtn = () => {
    const { showAclSettingBtn } = this.state;
    this.setState({
      showAclSettingBtn: !showAclSettingBtn,
    });
  };

  render() {
    const { showAclSettingBtn } = this.state;
    return (
      <div className="bucket-overview">
        <div className="oss-box">
          <div className="box-hd">
            <h3>基础设置</h3>
          </div>
          <div className="basic-setting-box">
            <div className="item" onMouseEnter={this.showAclSettingBtn} onMouseLeave={this.showAclSettingBtn}>
              <div className="item-key">
                读写权限
              </div>
              <div className="item-value">
                私有
              </div>
              {
                showAclSettingBtn ? (
                  <Button size="small" onClick={this.showAclSelect}>设置</Button>
                ) : null
              }
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
