import React, { Component } from 'react';
import MainRouter from './MainRouter';

export default class BasicLayout extends Component {
    static displayName = 'BasicLayout';

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <div>
          <MainRouter />
        </div>
      );
    }
}
