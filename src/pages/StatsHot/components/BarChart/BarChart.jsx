import React, { Component } from 'react';

import { Axis, Chart, Coord, Geom, Label, Tooltip } from 'bizcharts';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

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
          name: decodeURIComponent(item.fullPath),
          value: item.count,
        };
      })
        .sort((a, b) => a.value - b.value);
    }

    return (
      <Chart height={window.innerHeight - 283} data={temp} forceFit padding={['auto', 100, 'auto']}>
        <Coord transpose />
        <Axis
          name="name"
          label={{
            offset: 12,
            formatter: (text => text.substr(text.lastIndexOf('/') + 1)),
          }}
        />
        <Axis name="value" />
        <Tooltip />
        <Geom type="interval" position="name*value" color={['value', '#E6F6C8-#3376CB']}>
          <Label content={['name*value', (name, value) => value]} />
        </Geom>
      </Chart>
    );
  }
}
