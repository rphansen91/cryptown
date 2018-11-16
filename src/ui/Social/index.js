/* global FB */
import React, { Component } from 'react';

function loadScript (src) {
  return new Promise(function (res, rej) {
    const script = document.createElement('script')
    script.src = src
    script.onload = res
    script.onerror = rej
    document.body.appendChild(script)
  })
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount () {
    loadScript('https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9')
    .then(() => {
      this.setState({ loaded: true })
    })
    .then(() => {
      FB.XFBML.parse()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render () {
    const { page, name, tabs='timeline' } = this.props
    return <div className="fb-page" data-href={`https://www.facebook.com/${page}/`} data-tabs={tabs} data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
      <blockquote cite={`https://www.facebook.com/${page}/`} className="fb-xfbml-parse-ignore">
        <a href={`https://www.facebook.com/${page}/`}>{ name }</a>
      </blockquote>
    </div>
  }
}
