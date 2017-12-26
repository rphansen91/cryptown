import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List';
import Line from '../../charts/Line';
import { graphql } from 'react-apollo';
import usd from '../../utility/usd';
import btc from '../../utility/btc';
import { defaultColor } from '../../utility/styles';
import CryptoIcon from '../../icons/CryptoIcon';
import Percent from '../../explorer/Percent';
import Tx from '../../portfolio/Tx';
import { Buy } from '../../portfolio/Buy';
import gql from 'graphql-tag';
import SEO from '../SEO';
import './style.css';

const iconAttrs = "height='4em'"
const coinQuery = gql`
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
const computeValueAt = series => createdAt => {
  for (var i = 0; i < series.length; i++) {
    if (createdAt <= series[i][0]) return series[i][1]
  }
  return 0
}

const Coin = ( { data: { loading, error, coin }, onRemove, txs, color=defaultColor, pos, neg, ...props }={} ) => {
  if (loading) coin = loadingCoin()
  if (error) coin = defaultCoin()
  if (!coin) coin = defaultCoin()

  const point = (x, y) => ({ x, y, xAxis: 0, yAxis: 0 })
  const series = (coin.history || []).map((({ ts, value }) => [ts*1000, value]))
  const valueAt = computeValueAt(series)
  const annotations = txs.reduce((acc, tx) => {
    if (tx.coin !== coin.id) return acc
    if (!tx.value) return acc

    const t = tx.createdAt * 1000
    const x = new Date(t)
    const y = valueAt(t)
    const p = point(x, y)

    if (tx.value >= 0) {
      acc[0].labels.push({ point: p, text: `Purchased ${tx.value}`})
    } else {
      acc[1].labels.push({ point: p, text: `Sold ${tx.value}` })
    }
    return acc
  }, [
    { labels: [] },
    { labels: [] }
  ])

  return <div>
    <SEO title={coin.symbol + ' | Hodl Stream'} path={'/coin/' + coin.id} />
    <section />
    <section>
      <CryptoIcon icon={coin.symbol} className={(loading ? "App-logo" : "")} attrs={(iconAttrs + ' fill="' + color + '"')} />
      <Typography type="title">{ coin.name }</Typography>
      <div className="coin-details">
        <p>{ usd.display(coin.price_usd) } USD</p>
        <p>{ btc.display(coin.price_btc) } BTC</p>
        <div className="coin-seperator" />
        <Percent value={coin.percent_change_24h} pos={pos} neg={neg} />
      </div>

      <Line title="" subtitle=""
        series={{ [coin.symbol]: series }}
        annotations={annotations}
        colors={[color]} />

      <List>
        {
          txs.filter(({ value }) => value).filter(tx => tx.coin === coin.id)
          .map((tx, i) => <Tx key={i} tx={tx} />)
        }
      </List>
    </section>
    <p style={{marginLeft: 25}}>
      <Buy crypto_currency={coin.symbol} />
    </p>
  </div>
}

export default connect(
  ({ txs, pair }) => ({ txs, pair }),
  dispatch => ({})
)(graphql(coinQuery, {
  options: ({ id, pair }) => ({ variables: { id, pair } })
})(Coin))
