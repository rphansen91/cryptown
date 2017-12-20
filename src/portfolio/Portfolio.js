/* global Highcharts */

import React from 'react'
import Stream from '../charts/Stream';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { allCoins, current } from './compute';
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
  if (!coins) return <div />

  const currentPortfolio = current(txs)
  const series = coins.filter(identity).reduce((acc, c) => {
    acc[c.symbol] = (c.history || []).map(({ ts, value }) => {
      const p = currentPortfolio(ts)
      const v = (p[c.id] || 0)
      return [ts * 1000, (v * value)]
    }).filter(identity)
    return acc
  }, {})

  return <Stream {...props} series={series} colors={Object.keys(series).map(coinColor)} />
}

export default connect(
  ({ txs, coins, pair }) => ({ txs, coins, pair })
)(graphql(portfolioQuery, {
  options: ({ coins, pair }) => ({ variables: {
    ids: coins.map(({ id }) => id),
    pair
  } })
})(Portfolio))
