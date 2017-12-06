import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import usd from '../utility/usd';
import btc from '../utility/btc';
import gql from 'graphql-tag';
import CryptoIcon from '../icons/CryptoIcon';
import Percent from './Percent';
import './Coin.css';

const iconAttrs = "height='4em'"
const coinQuery = gql`
query Coin($id: String!) {
  coin(id: $id) {
    name
    symbol
    price_usd
    price_btc
    percent_change_24h
  }
}
`

const loadingCoin = (name) => ({ symbol: 'FCT', name: 'Loading', price_usd: 0, price_btc: 0, percent_change_24h: 0 })
const defaultCoin = () => ({ symbol: 'NaC', name: 'Not Found', price_usd: 0, price_btc: 0, percent_change_24h: 0 })

const Coin = ( { data: { loading, error, coin }, color='#00aacc', pos, neg, ...props }={} ) => {
  if (loading) coin = loadingCoin()
  if (error) coin = defaultCoin()
  if (!coin) coin = defaultCoin()

  return <div className={["coin"].concat(props.classList).filter(c => c).join(' ')} style={{ color }} { ...props } >
    <div className="coin-header">
      <CryptoIcon icon={coin.symbol} className={(loading ? "App-logo" : "")} attrs={(iconAttrs + ' fill="' + color + '"')} />
    </div>
    <div className="coin-details">
      <p className="coin-name">{ coin.name }</p>
      <p>{ usd.display(coin.price_usd) }</p>
      <p>{ btc.display(coin.price_btc) }</p>
      <div className="coin-seperator" />
      <Percent value={coin.percent_change_24h} pos={pos} neg={neg} />
    </div>
  </div>
}


export default graphql(coinQuery, {
  options: ({ id }) => ({ variables: { id } })
})(Coin)
