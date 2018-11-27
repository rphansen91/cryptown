import React, { Component, Children } from 'react';

const identity = v => v

export class LoadScript extends Component {
    componentDidMount () {
        const { src, onScriptLoaded=identity, onScriptError=identity } = this.props
        
        loadScript(src)
        .then(onScriptLoaded)
        .catch(onScriptError)
    }

    render () {
        const { children } = this.props;
        return Children.only(children);
    }
}


export default function loadScript (src) {
    return new Promise(function (res, rej) {
        const script = document.createElement('script')
        script.src = src
        script.onload = res
        script.onerror = rej
        document.body.appendChild(script)
    })
}