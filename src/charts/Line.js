import React from 'react'
import Highcharts from './highcharts'
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
  annotations=[],
  colors=Highcharts.getOptions().colors
}) {
  return {
    chart: {
      zoomType: 'x',
      backgroundColor: 'rgba(0,0,0,0)'
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

    points: [],

    series: Object.keys(series)
    .map((name, i) => ({
      name,
      type: 'area',
      data: series[name],
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, colors[i]],
          [1, Highcharts.Color(colors[i]).setOpacity(0).get('rgba')]
        ]
      }
    })),

    annotations: annotations,

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          yAxis: {
            labels: {
              align: 'left',
              x: 0,
              y: -5
            },
            title: {
              text: null
            }
          },
          subtitle: {
            text: null
          }
        }
      }]
    },

    exporting: {
      enabled: false
    },

    credits: {
      enabled: false
    }
  }
}
