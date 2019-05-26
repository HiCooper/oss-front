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
 */
    renderNormalRoute = (item, index) => {
      return item.component ? (
        <Route key={index} path={item.path} component={item.component} exact />) : null;
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
