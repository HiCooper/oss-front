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
      temp = Object.keys(data).map((item) => {
        return {
          name: item,
          value: data[item],
        };
      }).sort((a, b) => a.value - b.value);
    }
    return (
      <div>
        <Chart height={400} data={temp} forceFit>
          <Coord transpose />
          <Axis
            name="name"
            label={{
              offset: 12,
            }}
          />
          <Axis name="value" />
          <Tooltip />
          <Geom type="interval" position="name*value" />
        </Chart>
      </div>
    );
  }
}
