import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routerConfig from '../../routerConfig';
import NotFound from '../../components/NotFound';

export default class MainRouter extends Component {
    static displayName = 'MainRouter';

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
      console.log(item.path);
      if (item.component && (!item.children || item.children.length === 0)) {
        return (
          <Route key={item.path} path={item.path} component={item.component} exact={item.exact} />);
      }
      if (item.children && item.children.length > 0) {
        return (
          <Route key={item.path}
            path={item.path}
            // component={}
            exact={item.exact}
          />
        );
      }
    };

    render() {
      return (
        <Switch>
          {routerConfig.map(this.renderNormalRoute)}
          <Route component={NotFound} />
        </Switch>
      );
    }
}
