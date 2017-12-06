/* global Highcharts */

import React from 'react'
import Stream from '../charts/Stream';
import { graphql } from 'react-apollo';
import { allCoins, current } from './compute';
import gql from 'graphql-tag';

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

  if (error) return <p>{ error.message }</p>
  if (!coins) return <div />

  const currentPortfolio = current(txs)
  const series = coins.reduce((acc, c) => {
    acc[c.symbol] = c.history.map(({ ts, value }) => {
      const p = currentPortfolio(ts)
      const v = (p[c.id] || 0)
      return [ts * 1000, (v * value)]
    })
    return acc
  }, {})

  return <Stream {...props} series={series} />
}

export default graphql(portfolioQuery, {
  options: ({ txs, pair }) => ({ variables: { ids: allCoins(txs, ['bitcoin']), pair } })
})(Portfolio)
