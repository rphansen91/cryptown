import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'

const defaultIcon = require('!raw-loader!./svg/404.svg') // eslint-disable-line import/no-webpack-loader-syntax
export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      svg: defaultIcon
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
    const { attrs, button, onClick=(v=>v) } = this.props
    const { svg } = this.state
    const __html = svg.replace('viewBox', (attrs ? attrs + ' viewBox' : 'viewBox'))
    const icon = <span {...this.props} onClick={onClick} className='icon' dangerouslySetInnerHTML={{ __html }} />
    if (!button) return icon
    return <IconButton onClick={onClick}>{ icon }</IconButton>
  }
}

function loadIcon (icon, fn) {
  return require.ensure([], function () {
    try {
      fn(require('!raw-loader!./svg/' + icon + '.svg'))
    } catch (err) {
      fn(defaultIcon)
    }
  })
}
