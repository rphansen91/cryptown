import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { allCoins, current } from './compute';
import usd from '../utility/usd';
import btc from '../utility/btc';
import gql from 'graphql-tag';

const portfolioQuery = gql`
query Portfolio ($ids: [String]!) {
  coins(ids: $ids) {
    id
    symbol
    price_usd
    price_btc
  }
}
`

const CurrentValue = (props) => {
  const { txs=[], data: { loading, error, coins } } = props

  if (error) return <p>{ error.message }</p>
  if (!coins) return <div />

  const currentPortfolio = current(txs)(new Date().getTime())
  const { value_usd, value_btc } = coins.reduce((acc, c) => {
    acc['value_usd'] += c.price_usd * (currentPortfolio[c.id] || 0)
    acc['value_btc'] += c.price_btc * (currentPortfolio[c.id] || 0)
    return acc
  }, {
    value_usd: 0,
    value_btc: 0
  })

  return <div {...props}>
    <p style={{fontSize: '2em', lineHeight: '1em', margin: 0}}>{ usd.display(value_usd) } USD</p>
    <p style={{margin: 0, marginBottom: '1em'}}>{ btc.display(value_btc) } BTC</p>
  </div>
}

export default graphql(portfolioQuery, {
  options: ({ txs }) => ({ variables: { ids: allCoins(txs, ['bitcoin']) } })
})(CurrentValue)
