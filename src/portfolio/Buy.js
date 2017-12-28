import React from 'react'
import qs from '../utility/qs'

const whitelist = ["BTC", "LTC", "ETH"]
const CODE = 'c5372b33-7ff2-5f67-b180-be35081bc1ce'

export class Buy extends React.Component {
  constructor (props) {
    super(props)
    this.code = CODE
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
  popout () {
    const {
      address,
      amount,
      code=CODE,
      currency='USD',
      prefill_name,
      prefill_phone,
      prefill_email,
      crypto_currency='BTC',
      state,
      width=500,
      height=600
    } = this.props

    const query = qs({ address, amount, code, currency, prefill_name, prefill_phone, prefill_email, crypto_currency, state })
    window.open(`https://buy.coinbase.com/` + query, '', `width=${width},height=${height}`)
  }
  render () {
    const {
      address,
      amount,
      code=CODE,
      currency='USD',
      prefill_name,
      prefill_phone,
      prefill_email,
      crypto_currency='BTC',
      state
    } = this.props

    if (!crypto_currency || !whitelist.includes(crypto_currency)) return <div />

    return <a className="coinbase-widget coinbase-button primary-gradient"
    // ref={el => this.loadWidget(el)}
    onClick={() => this.popout()}
    id="coinbase_widget"
    data-address={address}
    data-amount={amount}
    data-code={code}
    data-currency={currency}
    data-crypto_currency={crypto_currency}>Buy {crypto_currency} with Coinbase</a>
  }
}

export const BuyBTC = () => <Buy crypto_currency="BTC" />
export const BuyBCH = () => <Buy crypto_currency="BCH" />
export const BuyLTC = () => <Buy crypto_currency="LTC" />
export const BuyETH = () => <Buy crypto_currency="ETH" />
