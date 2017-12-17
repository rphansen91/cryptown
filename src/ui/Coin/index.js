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
import gql from 'graphql-tag';
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

const Coin = ( { data: { loading, error, coin }, onRemove, txs, color=defaultColor, pos, neg, ...props }={} ) => {
  if (loading) coin = loadingCoin()
  if (error) coin = defaultCoin()
  if (!coin) coin = defaultCoin()

  const series = (coin.history || []).map((({ ts, value }) => [ts*1000, value]))

  return <div>
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

      <Line title="" subtitle="" series={{ [coin.symbol]: series }} colors={[color]} />

      <List>
        {
          txs.filter(tx => tx.coin === coin.id)
          .map((tx, i) =>
            <Tx key={i} tx={tx} onRemove={() => onRemove(i)} />)
        }
      </List>
    </section>
  </div>
}

export default connect(
  ({ txs, pair }) => ({ txs, pair }),
  dispatch => ({})
)(graphql(coinQuery, {
  options: ({ id, pair }) => ({ variables: { id, pair } })
})(Coin))
