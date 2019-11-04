import React, { Component } from 'react';
import { Axis, Chart, Geom, Tooltip } from 'bizcharts';

export default class LineChart extends Component {
  static displayName = 'LineChart';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.data;
    const cols = {
      value: {
        min: 0,
      },
    };
    let temp;
    if (data) {
      temp = Object.keys(data)
        .map((item) => {
          return {
            date: item,
            value: data[item],
          };
        });
    }
    return (
      <div>
        <Chart height={window.innerHeight - 385} data={temp} scale={cols} forceFit>
          <Axis name="date" />
          <Axis name="value" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="line" position="date*value" size={2} />
          <Geom
            type="point"
            position="date*value"
            size={4}
            shape="circle"
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}
