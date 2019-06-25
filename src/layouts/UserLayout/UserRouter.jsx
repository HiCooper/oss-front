import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { loginUserRouterConfig } from '../../routerConfig';
import NotFound from '../../components/NotFound';

export default class UserRouter extends Component {
  static displayName = 'UserRouter';

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 渲染路由组件
   * @param item
   * @returns {*}
   */
  renderNormalRoute = (item) => {
    return (
      <Route key={item.path} path={item.path} component={item.component} exact={item.exact} />);
  };

  render() {
    return (
      <Switch>
        {loginUserRouterConfig.map(this.renderNormalRoute)}
        <Route component={NotFound} />
      </Switch>
    );
  }
}
