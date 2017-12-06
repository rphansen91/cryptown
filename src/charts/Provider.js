/* global window Highcharts */

import React, { Component } from 'react'
import waitFor from '../utility/waitFor'

function loadScript (src) {
  return new Promise((res, rej) => {
    const script = document.createElement('script')
    document.body.appendChild(script)
    script.src = src
    script.onload = res
    script.onerror = rej
  })
}

function chain (values, fn) {
  return values.reduce((acc, val) => {
    return acc.then(() => fn(val))
  }, Promise.resolve())
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { ready: false, error: null }
  }

  componentWillMount () {
    chain([
      "https://code.highcharts.com/highcharts.js",
      "https://code.highcharts.com/modules/streamgraph.js",
      "https://code.highcharts.com/modules/series-label.js",
      "https://code.highcharts.com/modules/annotations.js",
      "https://code.highcharts.com/modules/exporting.js",
    ], loadScript)
    .then(waitFor(100))
    .then(() => this.setState({ ready: true }))
    .catch(({ message: error }) => this.setState({ error }))
  }

  render () {
    if (!this.state.ready) return <div />
    return this.props.children
  }
}
