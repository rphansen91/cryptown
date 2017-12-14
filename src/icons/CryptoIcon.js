import React, { Component } from 'react'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      svg: ''
    }
  }
  componentWillMount () {
    const { icon } = this.props
    loadIcon(icon, svg => this.setState({ svg }))
  }
  componentWillUpdate ({ icon: nextIcon }, nextState) {
    const { icon } = this.props
    if (nextIcon === icon) return
    loadIcon(nextIcon, svg => this.setState({ svg }))
  }
  render () {
    const { attrs } = this.props
    const { svg } = this.state
    const __html = svg.replace('viewBox', (attrs ? attrs + ' viewBox' : 'viewBox'))
    return <span {...this.props} className='icon' dangerouslySetInnerHTML={{ __html }} />
  }
}

function loadIcon (icon, fn) {
  return require.ensure([], function () {
    const defaultIcon = '404'
    try {
      fn(require('!raw-loader!./svg/' + icon + '.svg'))
    } catch (err) {
      fn(require('!raw-loader!./svg/' + defaultIcon + '.svg'))
    }
  })
}
