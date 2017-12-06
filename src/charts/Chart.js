/* global Highcharts */

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
  return function (chart) {
    Highcharts.chart(id, chart)
  }
}
