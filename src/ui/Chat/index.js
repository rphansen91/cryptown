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

  componentWillMount () {
    loadScript('https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9')
    .then(() => {
      this.setState({ loaded: true })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render () {
    const { page_id } = this.props
    return <div className="fb-customerchat" page_id={page_id} />
  }
}
