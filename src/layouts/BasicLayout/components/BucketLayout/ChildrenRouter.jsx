import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../../../../components/NotFound';
import { childRouterConfig } from '../../../../routerConfig';

export default class ChildrenRouter extends Component {
    static displayName = 'ChildrenRouter';

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
        {childRouterConfig.map(this.renderNormalRoute)}
        <Route component={NotFound} />
      </Switch>
    );
  }
}
