import Highcharts from './highcharts'
import React, { Component } from 'react'
import randomId from './randomId'

export default class extends Component {
  constructor (props) {
    super(props)
    this.id = randomId('chart')
  }

  componentWillMount () {
    this.renderChart()
  }

  componentWillUpdate () {
    this.renderChart()
  }

  renderChart () {
    Promise.resolve()
    .then(() => this.chartOpts())
    .then(render(this.id))
  }

  chartOpts () {
    throw new Error('Must supply chartOpts method')
  }

  render () {
    return <div id={this.id}></div>
  }
}

function render (id) {
  let prevChart = null
  return function (chart) {
    if (chart === prevChart) return
    Highcharts.chart(id, chart)
    prevChart = chart
  }
}
