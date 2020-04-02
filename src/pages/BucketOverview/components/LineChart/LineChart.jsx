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
        alias: '访问量',
        minTickInterval: 1,
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
        <Chart height={window.innerHeight - 410} data={temp} scale={cols} forceFit>
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
            color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
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
