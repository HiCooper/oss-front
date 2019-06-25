import React, { Component } from 'react';
import { Layout } from 'antd';
import UserRouter from './UserRouter';
import LoginHeader from '../components/LoginHeader';
import './index.scss';

const { Content } = Layout;
export default class UserLayout extends Component {
  static displayName = 'UserLayout';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <LoginHeader />
        <Content className="info-content">
          <UserRouter />
        </Content>
      </div>
    );
  }
}
