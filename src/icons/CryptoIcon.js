import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import defaultIcon from './defaultIcon'
import fetch from 'isomorphic-fetch'
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
    const __html = (svg || '').replace('viewBox', (attrs ? attrs + ' viewBox' : 'viewBox'))
    const icon = <span {...this.props} onClick={onClick} className='icon' dangerouslySetInnerHTML={{ __html }} />
    if (!button) return icon
    return <IconButton onClick={onClick}>{ icon }</IconButton>
  }
}

function loadIcon (icon, fn) {
  fetch((process.env.PUBLIC_URL || '') + '/svg/' + icon + '.svg')
  .then(res => res.text())
  .then(res => {
    if (!typeof res === 'string') return Promise.reject('Not found')
    if (res.trim().indexOf('<svg') !== 0) return Promise.reject('Not svg')
    return res
  })
  .then(icon => fn(icon))
  .catch(() => fn(defaultIcon))
}
