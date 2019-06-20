import React, { Component } from 'react';
import { Menu } from 'antd';
import './index.scss';
import ChildrenRouter from './ChildrenRouter';
import { headMenuConfig } from '../../../../menuConfig';
import { GetBucketApi } from '../../../../api/bucket';
import { getAclDesc } from '../../../../util/AclTable';

export default class Bucket extends Component {
  constructor(props) {
    super(props);
    const pathname = this.props.location.pathname;
    const lastPath = pathname.substr(pathname.lastIndexOf('/'));
    this.state = {
      currentActivate: lastPath,
      bucketName: this.props.match.params.name,
      bucketInfo: '',
    };
  }

  componentDidMount() {
    const { bucketName } = this.state;
    this.getBucketInfo(bucketName);
  }

  subMenuSelect = (item) => {
    this.setState({
      currentActivate: item.key,
    });
    const pathname = this.props.location.pathname;
    const lastPath = pathname.substr(pathname.lastIndexOf('/'));
    const newUrl = pathname.replace(lastPath, item.key);
    if (newUrl !== this.props.location.pathname) {
      this.props.history.push(newUrl);
    }
  };

  getBucketInfo = (bucketName) => {
    GetBucketApi({ name: bucketName }).then((res) => {
      if (res.msg === 'SUCCESS') {
        this.setState({
          bucketInfo: res.data,
        });
      } else {
        this.props.history.push('/');
      }
    }).catch((e) => {
      console.error(e);
      this.props.history.push('/');
    });
  };

  componentWillReceiveProps(nextProps, ignore) {
    const pathname = nextProps.location.pathname;
    const lastPath = pathname.substr(pathname.lastIndexOf('/'));
    this.setState({
      currentActivate: lastPath,
      bucketName: nextProps.match.params.name,
    });
    this.getBucketInfo(nextProps.match.params.name);
  }

  render() {
    const { bucketName, bucketInfo, currentActivate } = this.state;
    return (
      <div className="bucket-home">
        <div className="bucket-header">
          <h1>{bucketName}</h1>
          <aside>
            <span className="info">
              <strong>读写权限</strong>
              <span className="oss-rc-acl">{getAclDesc(bucketInfo.acl)}</span>
            </span>
            <span className="info">
              <strong>类型</strong>
              标准存储
            </span>
            <span className="info">
              <strong>区域</strong>
              华北2（北京）
            </span>
            <span className="info">
              <strong>创建时间</strong>
              <span>{bucketInfo.createTime}</span>
            </span>
          </aside>
        </div>
        <div className="menu">
          <Menu
            onSelect={this.subMenuSelect}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[currentActivate]}
            selectedKeys={[currentActivate]}
            style={{ lineHeight: '46px' }}
          >
            {
              headMenuConfig && headMenuConfig.length > 0 ? headMenuConfig.map((item) => {
                return (
                  <Menu.Item key={item.path}>
                    {item.name}
                  </Menu.Item>
                );
              }) : null
            }
          </Menu>
        </div>
        <ChildrenRouter />
      </div>
    );
  }
}
