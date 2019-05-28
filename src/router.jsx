/**
 * 定义应用路由
 */
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import BasicLayout from './layouts/BasicLayout';


// 按照 Layout 分组路由
// UserLayout 对应的路由：/user/xxx
// BasicLayout 对应的路由：/xxx
const router = () => {
  return (
    <HashRouter>
      <Switch>
        <Redirect exact strict from="/" to="/dashboard/overview" />
        <Route path="/" component={BasicLayout} />
      </Switch>
    </HashRouter>
  );
};

export default router();
