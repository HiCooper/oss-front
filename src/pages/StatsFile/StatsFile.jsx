import React, { Component } from 'react';

export default class StatsFile extends Component {
    static displayName = 'StatsFile';

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <div>
                文件访问统计
        </div>
      );
    }
}
