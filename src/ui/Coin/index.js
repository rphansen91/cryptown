import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Line from '../../charts/Line';
import { graphql } from 'react-apollo';
import usd from '../../utility/usd';
import btc from '../../utility/btc';
import { setAdding } from '../../store/reducers/adding';
import { defaultColor } from '../../utility/styles';
import CryptoIcon from '../../icons/CryptoIcon';
import Percent from '../../explorer/Percent';
import Tx from '../../portfolio/Tx';
import { Buy } from '../../portfolio/Buy';
import { current } from '../../portfolio/compute';
import gql from 'graphql-tag';
import SEO from '../SEO';
import Article from '../Article';
import './style.css';

const iconStyle = { height: '4em' }
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
    articles {
      title
      url
      urlToImage
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

const Coin = ( { data: { loading, error, coin }, onRemove, txs, pos, neg, theme, ...props }={} ) => {
  if (loading) coin = loadingCoin()
  if (error) coin = defaultCoin()
  if (!coin) coin = defaultCoin()

  const color = theme.palette.text.secondary
  const image = (process.env.PUBLIC_URL || '') + '/png/' + coin.symbol +'.png'
  const total = current(txs)(new Date().getTime())[coin.id]
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
      acc[1].labels.push({ point: p, text: `Sold ${Math.abs(tx.value)}` })
    }
    return acc
  }, [
    { labels: [] }, // Buy Labels
    { labels: [] } // Sell Labels
  ])

  return <div>
    <SEO
      images={{
        google: image,
        facebook: image,
        twitter: image
      }}
      title={coin.symbol + ' | Hodl Stream'}
      path={'/coin/' + coin.id}
       />
    <section />
    <section>
      <CryptoIcon icon={coin.symbol} className={(loading ? "App-logo" : "")} attrs={{ fill: color }} style={iconStyle} />
      <Typography type="title">{ coin.name }</Typography>
      <div className="coin-details">
        <Typography type="body1">{ usd.display(coin.price_usd) } USD</Typography>
        <Typography type="body2" >{ btc.display(coin.price_btc) } BTC</Typography>
        <div className="coin-seperator" />
        <Percent value={coin.percent_change_24h} pos={pos} neg={neg} />
        <Typography type="body2" >{total} {coin.symbol}</Typography>
      </div>

      <Line title="" subtitle=""
        series={{ [coin.symbol]: series }}
        annotations={annotations}
        colors={[color]}
        onClick={(e) => {
          console.log(e)
          props.setAdding(coin.id, e.point.x)
          props.history.push((process.env.PUBLIC_URL || '') + '/add')
        }} />

      {/* <List>
        {
          txs.filter(({ value }) => value).filter(tx => tx.coin === coin.id)
          .map((tx, i) => <Tx key={i} tx={tx} />)
        }
      </List> */}
    </section>
    <section>
      <div className="articles responsive">
         {
           (coin.articles || []).map((a, i) =>
              <a href={a.url} target="_blank" key={i}><Article
                image={a.urlToImage}
                title={a.title}
                actions={<CardActions>
                  <Button dense color="primary">
                    Read More
                  </Button>
                </CardActions>} />
              </a>)
         }
      </div>
    </section>
    <section style={{marginLeft: 25}}>
      <Buy crypto_currency={coin.symbol} />
    </section>
  </div>
}

export default connect(
  ({ txs, pair }) => ({ txs, pair }),
  dispatch => ({
    setAdding: (coin, createdAt) => {
      dispatch(setAdding({ coin, createdAt }))
    }
  })
)(graphql(coinQuery, {
  options: ({ id, pair }) => ({ variables: { id, pair } })
})(withRouter(withTheme()(Coin))))
