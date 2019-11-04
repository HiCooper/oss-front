import React, { Component } from 'react';

import { Axis, Chart, Coord, Geom, Tooltip } from 'bizcharts';

export default class BarChart extends Component {
  static displayName = 'BarChart';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.data;
    let temp;
    if (data) {
      temp = data.map((item) => {
        return {
          name: item.fullPath,
          value: item.count,
        };
      }).sort((a, b) => a.value - b.value);
    }

    return (
      <div>
        <Chart height={window.innerHeight - 283} data={temp} forceFit>
          <Coord transpose />
          <Axis
            name="name"
            label={{
              offset: 12,
            }}
          />
          <Tooltip />
          <Geom type="interval" position="name*value" />
        </Chart>
      </div>
    );
  }
}
