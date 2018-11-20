import React, { Component } from "react"

export default class Ad extends Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  render () {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}