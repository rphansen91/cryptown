/* global Highcharts */

import React from 'react'
import Chart from './Chart'

export default class extends Chart {
  constructor (props) {
    super(props)
  }

  chartOpts () {
    return line(this.props)
  }
}

function line ({
  title='',
  subtitle='',
  yAxis='',
  series={},
  colors=Highcharts.getOptions().colors
}) {
  return {
    chart: {
      zoomType: 'x'
    },

    colors: colors,

    title: {
      text: title
    },

    subtitle: {
      text: subtitle
    },

    yAxis: {
      title: {
        text: yAxis
      }
    },

    xAxis: {
      type: 'datetime'
    },

    legend: {
      enabled: false
    },

    series: Object.keys(series)
    .map(name => ({ name, data: series[name] })),
  }
}
