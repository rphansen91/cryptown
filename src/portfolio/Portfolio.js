/* global Highcharts */

import React from 'react'
import Stream from '../charts/Stream';
import { graphql, Query } from 'react-apollo';
import { connect } from 'react-redux';
import { allCoins, current, empty } from './compute';
import coinColor from '../icons/colors';
import gql from 'graphql-tag';

function identity (v) {
  return v
}

const portfolioQuery = gql`
query Portfolio ($ids: [String]!, $pair: String!) {
  coins(ids: $ids) {
    id
    symbol
    history(pair: $pair) {
      ts
      value
    }
  }
}
`

const Portfolio = (props) => {
  const { txs=[], data: { loading, error, coins } } = props

  if (!coins && error) return <p>{ error.message }</p>
  if (!coins) return <div style={{height: 400}} />

  const currentPortfolio = current(txs)
  const now = new Date().getTime()
  const series = coins
  .filter(identity)
  .filter((coin) => {
    return currentPortfolio(now)[coin.id] > 0
  }).reduce((acc, c) => {
    acc[c.symbol] = (c.history || []).reduce((accc, { ts, value }) => {
      const p = currentPortfolio(ts)
      const v = (p[c.id] || 0)
      if (!accc.length && empty(p)) return accc
      return accc.concat([
        [ts * 1000, (v * value)]
      ])
    }, [])
    return acc
  }, {})

  return <Stream {...props} name="portfolio" series={series} colors={Object.keys(series).map(coinColor)} />
}

export default connect(
  ({ txs, coins, pair }) => ({ txs, coins, pair })
)(graphql(portfolioQuery, {
  options: ({ coins, pair }) => ({ variables: {
    ids: coins.map(({ id }) => id),
    pair
  } })
})(Portfolio))
