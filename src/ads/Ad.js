import React, { Component, Children } from "react"

export default class Ad extends Component {
  componentDidMount () {
    this.frame = window.requestAnimationFrame(() => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    })
  }
  componentWillUnmount () {
    window.cancelAnimationFrame(this.frame)
  }
  render () {
    const { children } = this.props;
    return Children.only(children)
  }
}