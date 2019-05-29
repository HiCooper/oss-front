import React, { Component } from 'react';
import { Menu } from 'antd';
import './index.scss';
import ChildrenRouter from './ChildrenRouter';
import { headMenuConfig } from '../../../../menuConfig';

export default class Bucket extends Component {
  constructor(props) {
    super(props);
    const pathname = this.props.location.pathname;
    const lastPath = pathname.substr(pathname.lastIndexOf('/'));
    this.state = {
      currentActivate: lastPath,
    };
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

  componentWillReceiveProps(nextProps, _) {
    const pathname = nextProps.location.pathname;
    const lastPath = pathname.substr(pathname.lastIndexOf('/'));
    this.setState({
      currentActivate: lastPath,
    });
  }

  render() {
    const { currentActivate } = this.state;
    return (
      <div className="bucket-home">
        <div className="bucket-header">
          <h1>hicooper</h1>
          <aside>
            <span className="info">
              <strong>读写权限</strong>
              <span className="oss-rc-acl">私有</span>
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
              <span>2019-05-27 14:17</span>
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
