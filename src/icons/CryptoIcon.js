import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'

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
    const defaultIcon = '404'
    try {
      fn(require('!raw-loader!./svg/' + icon + '.svg'))
    } catch (err) {
      fn(require('!raw-loader!./svg/' + defaultIcon + '.svg'))
    }
  })
}
