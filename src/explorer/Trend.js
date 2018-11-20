import React, { Component } from 'react'
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import usd from '../utility/usd';
import btc from '../utility/btc';
import Percent from './Percent';
import CryptoIcon from '../icons/CryptoIcon';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Line from '../charts/Line';
import { defaultColor } from '../utility/styles';
import { withTheme } from 'material-ui/styles';
import './Coin.css';

const trendQuery = gql`
query Coin($id: String!, $pair: String!) {
  coin(id: $id) {
    id
    name
    symbol
    price_usd
    price_btc
    percent_change_24h
    history(pair: $pair) {
      ts
      value
    }
  }
}
`

const loadingCoin = (name) => ({ symbol: '', name: 'Loading', price_usd: 0, price_btc: 0, percent_change_24h: 0 })
const defaultCoin = () => ({ symbol: 'NaC', name: 'Not Found', price_usd: 0, price_btc: 0, percent_change_24h: 0 })

const Trend = ( { id, data: { loading, error, coin }, pos, neg, theme, ...props }={} ) => {
  if (loading) coin = loadingCoin()
  if (error) coin = defaultCoin()
  if (!coin) coin = defaultCoin()

  const series = (coin.history || []).map((({ ts, value }) => [ts*1000, value]))
  const color = theme.palette.text.secondary
  return <div className={["coin trend"].concat(props.classList).filter(c => c).join(' ')} style={{ color }} { ...props } >
    <div className="coin-header">
      <CryptoIcon icon={coin.symbol} className={(loading ? "App-logo" : "")} attrs={{ fill: color }} style={{ height: "4em" }} />
      <div className="coin-details">
        <p className="coin-name">{ coin.name }</p>
        <p>{ usd.display(coin.price_usd) } USD</p>
        <p>{ btc.display(coin.price_btc) } BTC</p>
        <div className="coin-seperator" />
        <Percent value={coin.percent_change_24h} pos={pos} neg={neg} />
      </div>
    </div>
    {
      <Line
          title={coin.name}
          name={`trend-${id}`}
          subtitle={coin.price_usd}
          series={{ [coin.symbol]: series }}
          colors={[color]}
        />
    }
  </div>
}

export default graphql(trendQuery, {
  options: ({ id, pair }) => ({ variables: { id, pair } }),
})(withTheme()(Trend))
