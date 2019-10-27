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

    const label = {
      offset: 12, // 数值，设置坐标轴文本 label 距离坐标轴线的距离
      // 设置文本的显示样式，还可以是个回调函数，回调函数的参数为该坐标轴对应字段的数值
      rotate: -30, // 文本旋转角度
      textStyle: {
        textAlign: 'center', // 文本对齐方向，可取值为： start center end
        fill: '#404040', // 文本的颜色
        fontSize: '12', // 文本大小
        fontWeight: 'bold', // 文本粗细
        textBaseline: 'top', // 文本基准线，可取 top middle bottom，默认为middle
      },
    };

    return (
      <div>
        <Chart height={400} data={temp} forceFit>
          <Coord transpose />
          <Axis
            name="name"
            rotate={30}
            label={label}
          />
          <Axis name="value" />
          <Tooltip />
          <Geom type="interval" position="name*value" />
        </Chart>
      </div>
    );
  }
}
