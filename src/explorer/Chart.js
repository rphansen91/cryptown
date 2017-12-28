import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Line from '../charts/Line';
import { defaultColor } from '../utility/styles';
import { withTheme } from 'material-ui/styles';

const chartQuery = gql`
query Chart($id: String!, $pair: String!) {
  coin(id: $id) {
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

const Chart = ( { data: { loading, error, coin }, theme, ...props }={} ) => {
  if (loading) return <div />
  if (error) return <p>{ error.message }</p>
  if (!coin) return <div />

  const color = theme.palette.text.secondary
  const series = (coin.history || []).map((({ ts, value }) => [ts*1000, value]))
  return <Line title={coin.name} subtitle={coin.price_usd} series={{ [coin.symbol]: series }} colors={[color]} />
}

export default graphql(chartQuery, {
  options: ({ id, pair }) => ({ variables: { id, pair } })
})(withTheme()(Chart))
