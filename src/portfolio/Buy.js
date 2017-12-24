import React from 'react'

const whitelist = ["BTC", "LTC", "ETH"]

export class Buy extends React.Component {
  constructor (props) {
    super(props)
  }
  loadWidget (embedder) {
    if (!embedder || this.loaded) return;
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    var theUrl = 'https://buy.coinbase.com/static/widget.js';
    s.src = theUrl+ (theUrl.indexOf("?") >= 0 ? '&' : '?') + 'ref=' + encodeURIComponent(window.location.href);
    embedder.appendChild(s);
    this.loaded = true;
  }
  render () {
    const { symbol="BTC", fiat="USD" } = this.props
    if (!symbol || !whitelist.includes(symbol)) return <div />

    return <a className="coinbase-widget"
    ref={el => this.loadWidget(el)}
    target="_blank"
    id="coinbase_widget"
    data-address=""
    data-amount=""
    data-code="c5372b33-7ff2-5f67-b180-be35081bc1ce"
    data-currency={fiat}
    data-crypto_currency={symbol}
    href="">Buy with Coinbase</a>
  }
}

export const BuyBTC = () => <Buy symbol="BTC" />
export const BuyLTC = () => <Buy symbol="LTC" />
export const BuyETH = () => <Buy symbol="ETH" />
