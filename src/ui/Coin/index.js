import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import List from 'material-ui/List';
import Line from '../../charts/Line';
import { graphql, Query } from 'react-apollo';
import usd from '../../utility/usd';
import btc from '../../utility/btc';
import { setAdding } from '../../store/reducers/adding';
import { setPost } from '../../store/reducers/post';
import { defaultColor } from '../../utility/styles';
import CryptoIcon from '../../icons/CryptoIcon';
import Percent from '../../explorer/Percent';
import Tx from '../../portfolio/Tx';
import { Buy } from '../../portfolio/Buy';
import { current } from '../../portfolio/compute';
import { TopBannerDisplayAd, BottomBannerDisplayAd, NewsDisplayAd } from '../../ads/slots';
import gql from 'graphql-tag';
import SEO from '../SEO';
import Article from '../Article';
import './style.css';

const iconStyle = { height: '4em' }
const coinQuery = gql`
query CoinDetail($id: String!, $pair: String!) {
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
      publishedAt
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

const Coin = connect(
  ({}) => ({}),
  ({ setPost })
)(({ setPost, id, data, onRemove, txs, pos, neg, theme, ...props }={}) => {
  let { loading, error, coin } = data || {};

  if (loading) coin = loadingCoin()
  if (error) coin = defaultCoin()
  if (!coin) coin = defaultCoin()

  const color = theme.palette.text.secondary
  const image = (process.env.PUBLIC_URL || 'https://hodlstream.com') + '/png/' + coin.symbol +'.png'
  const total = current(txs)(new Date().getTime())[id]
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
      path={'/coin/' + id}
       />
    <div className="row">
      <div className="col-md-9 pr-0">
        <TopBannerDisplayAd />
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

          <Line title={coin.id && !series.length ? `No ${coin.id} historical data found` : ""} subtitle=""
            name={`coin-${id}`}
            series={{ [coin.symbol]: series }}
            annotations={annotations}
            colors={[color]}
            onClick={(e) => {
              props.setAdding(coin.id, e.point.x)
              props.history.push((process.env.PUBLIC_URL || '') + '/add')
            }} />
        </section>

        <section style={{marginLeft: 25}}>
          <Buy crypto_currency={coin.symbol} />
        </section>
        <BottomBannerDisplayAd />
        <dection />
      </div>
      <div className="col-md-3 border-left pl-0">
        <Typography type="title" className="my-2">Articles</Typography>
        <div className="article-sidebar">
         {
           (coin.articles || [])
           .reduce((acc, a, i) => {
             if (i && i % 2 === 0) {
               acc.push(<NewsDisplayAd style={{
                  display: "inline-block",
                  width: 350
                }} key={i + "ad"} />)
            }
            acc.push(
              <Link onClick={() => setPost(a)}
                to={`/post/${coin.id}/${a.publishedAt}`} key={i}><Article
                image={a.urlToImage}
                title={a.title}
                actions={<CardActions>
                  <Button dense color="primary">
                    Read More
                  </Button>
                </CardActions>} />
              </Link>
            )
            return acc
          }, [])
        }
        </div>
      </div>
    </div>
  </div>
})

const connector = connect(
  ({ txs, pair }) => ({ txs, pair }),
  dispatch => ({
    setAdding: (coin, createdAt) => {
      dispatch(setAdding({ coin, createdAt }))
    }
  })
)

const ConnCoin = withRouter(withTheme()(Coin))

export default connector((props) => <Query query={coinQuery} variables={props}>{
  (data) => <ConnCoin {...props} {...data} />
}</Query>)