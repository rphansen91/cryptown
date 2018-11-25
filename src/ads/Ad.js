import React, { Component, Children } from "react"

export default class Ad extends Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  render () {
    const { children } = this.props;
    return Children.only(children)
  }
}