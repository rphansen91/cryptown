import Highcharts from './highcharts'
import React from 'react'
import Chart from './Chart'

export default class extends Chart {
  constructor (props) {
    super(props)
  }

  chartOpts () {
    return stream(this.props)
  }
}

function stream ({
  title='Cryptocurrency Portfolio',
  subtitle='',
  colors=[],
  series={}
}) {
  return {
    chart: {
      type: 'streamgraph',
      marginBottom: 30,
      zoomType: 'x',
      backgroundColor: 'rgba(0,0,0,0)'
    },

    colors: colors.concat(Highcharts.getOptions().colors),

    title: {
      text: title
    },

    subtitle: {
      text: subtitle
    },

    xAxis: {
      type: 'datetime'
    },

    yAxis: {
      visible: false,
      startOnTick: false,
      endOnTick: false
    },

    legend: {
      enabled: true,
      verticalAlign: 'top',
      align: 'left',
      layout: 'vertical',
      itemStyle: {
        color: '#ffffff'
      }
    },

    annotations: [{
      labels: [{
        point: {
          x: 0,
          xAxis: 0,
          y: 0,
          yAxis: 0
        },
        text: 'Cancelled<br>during<br>World War II'
      }, {
        point: {
          x: 2,
          xAxis: 0,
          y: 10,
          yAxis: 0
        },
        text: 'Soviet Union fell,<br>Germany united'
      }],
      labelOptions: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderColor: 'silver'
      }
    }],

    plotOptions: {
      series: {
        label: {
          minFontSize: 5,
          maxFontSize: 15,
          style: {
            color: 'rgba(255,255,255,0.75)'
          }
        }
      }
    },

    points: [],

    series: Object.keys(series)
      .map(name => ({ name, data: series[name] })),

    exporting: {
      sourceWidth: 800,
      sourceHeight: 600,
      enabled: false
    },

    credits: {
      enabled: false
    }
  }
}

