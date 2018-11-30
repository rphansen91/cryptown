import React, { Component, Children } from "react";

export default class Ad extends Component {
  constructor(props) {
    super(props);
    this.timer = props.timer || 400;
  }
  componentDidMount() {
    this.timerId = setTimeout(() => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, this.timer);
  }
  componentWillUnmount() {
    clearTimeout(this.timerId);
  }
  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}
