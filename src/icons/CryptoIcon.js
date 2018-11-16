import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import defaultIcon from './defaultIcon'
import fetch from 'isomorphic-fetch'
import { loadSvg } from '../store/reducers/svgs'
import { connect } from 'react-redux'

class CryptoIcon extends Component {
  constructor (props) {
    super(props)
  }
  // componentWillMount () {
  //   const { loadIcon } = this.props;
  //   loadIcon();
  // }

  // componentWillUpdate () {
  //   const { loadIcon } = this.props;
  //   loadIcon();
  // }

  render () {
    const { icon, attrs, button, onClick=(v=>v), btnstyle, loadIcon } = this.props
    const query = Object.keys(attrs).map(k => `${k}=${attrs[k]}`).join("&")
    const Icon = <img className='icon' src={`/svg/${icon}.svg?${query}`} {...this.props} onClick={onClick} />

    if (!button) return Icon
    return <IconButton onClick={onClick} style={btnstyle}>{ Icon }</IconButton>
  }
}

export default CryptoIcon