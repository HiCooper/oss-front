import React, { Component } from 'react';
import { Menu } from 'antd';
import './index.scss';
import { headMenuConfig } from '../../menuConfig';

export default class Home extends Component {
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
        <div className="menu">
          <Menu
            onSelect={this.subMenuSelect}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[currentActivate]}
            selectedKeys={[currentActivate]}
            style={{ lineHeight: '64px' }}
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
        <div className="menu-content">
dd
        </div>
      </div>
    );
  }
}
