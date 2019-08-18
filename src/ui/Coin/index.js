import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/styles";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import Line from "../../charts/Line";
import { graphql, Query } from "react-apollo";
import usd from "../../utility/usd";
import btc from "../../utility/btc";
import { setAdding } from "../../store/reducers/adding";
import Layout from "../Layout";
import { defaultColor } from "../../utility/styles";
import CryptoIcon from "../../icons/CryptoIcon";
import Percent from "../../explorer/Percent";
import Tx from "../../portfolio/Tx";
import { Buy } from "../../portfolio/Buy";
import { current } from "../../portfolio/compute";
import {
  TopBannerDisplayAd,
  BottomBannerDisplayAd,
  NewsDisplayAd
} from "../../ads/slots";
import gql from "graphql-tag";
import SEO from "../SEO";
import ArticleSidebar from "../Article/Sidebar";
import "./style.css";

const iconStyle = { height: "4em" };
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
    }
  }
`;

const loadingCoin = name => ({
  symbol: "",
  name: "Loading",
  price_usd: 0,
  price_btc: 0,
  percent_change_24h: 0
});
const defaultCoin = () => ({
  symbol: "NaC",
  name: "Not Found",
  price_usd: 0,
  price_btc: 0,
  percent_change_24h: 0
});
const computeValueAt = series => createdAt => {
  for (var i = 0; i < series.length; i++) {
    if (createdAt <= series[i][0]) return series[i][1];
  }
  return 0;
};

const Coin = ({ id, data, onRemove, txs, pos, neg, ...props } = {}) => {
  let { loading, error, coin } = data || {};
  const theme = useTheme();

  if (loading) coin = loadingCoin();
  if (error) coin = defaultCoin();
  if (!coin) coin = defaultCoin();

  const color = theme.palette.text.secondary;
  const image = (process.env.PUBLIC_URL || "") + "/png/" + coin.symbol + ".png";
  const total = current(txs)(new Date().getTime())[id];
  const point = (x, y) => ({ x, y, xAxis: 0, yAxis: 0 });
  const series = (coin.history || []).map(({ ts, value }) => [
    ts * 1000,
    value
  ]);
  const valueAt = computeValueAt(series);
  const annotations = txs.reduce(
    (acc, tx) => {
      if (tx.coin !== coin.id) return acc;
      if (!tx.value) return acc;

      const t = tx.createdAt * 1000;
      const x = new Date(t);
      const y = valueAt(t);
      const p = point(x, y);

      if (tx.value >= 0) {
        acc[0].labels.push({ point: p, text: `Purchased ${tx.value}` });
      } else {
        acc[1].labels.push({ point: p, text: `Sold ${Math.abs(tx.value)}` });
      }
      return acc;
    },
    [
      { labels: [] }, // Buy Labels
      { labels: [] } // Sell Labels
    ]
  );

  return (
    <div>
      <SEO
        images={{
          google: image,
          facebook: image,
          twitter: image
        }}
        title={coin.symbol + " | Hodl Stream"}
        path={"/coin/" + id}
      />
      <Layout
        content={
          <section>
            <TopBannerDisplayAd />
            <section />
            <section>
              <CryptoIcon
                icon={coin.symbol}
                className={loading ? "App-logo" : ""}
                attrs={{ fill: color }}
                style={iconStyle}
              />
              <Typography variant="h4" color="textPrimary">
                {coin.name}
              </Typography>
              <div className="coin-details">
                <Typography type="body1" color="textSecondary">
                  {usd.display(coin.price_usd)} USD
                </Typography>
                <Typography type="body2" color="textSecondary">
                  {btc.display(coin.price_btc)} BTC
                </Typography>
                <div className="coin-seperator" />
                <Percent value={coin.percent_change_24h} pos={pos} neg={neg} />
                <Typography type="body2" color="textSecondary">
                  {total} {coin.symbol}
                </Typography>
              </div>

              <Line
                title={
                  coin.id && !series.length
                    ? `No ${coin.id} historical data found`
                    : ""
                }
                subtitle=""
                name={`coin-${id}`}
                series={{ [coin.symbol]: series }}
                annotations={annotations}
                colors={[color]}
                onClick={e => {
                  props.setAdding(coin.id, e.point.x);
                  props.history.push((process.env.PUBLIC_URL || "") + "/add");
                }}
              />
            </section>

            <section style={{ marginLeft: 25 }}>
              <Buy crypto_currency={coin.symbol} />
            </section>
            <BottomBannerDisplayAd />
          </section>
        }
        sidebar={<ArticleSidebar />}
      />
    </div>
  );
};

const connector = connect(
  ({ txs, pair }) => ({ txs, pair }),
  dispatch => ({
    setAdding: (coin, createdAt) => {
      dispatch(setAdding({ coin, createdAt }));
    }
  })
);

const ConnCoin = withRouter(Coin);

export default connector(props => (
  <Query query={coinQuery} variables={props}>
    {data => <ConnCoin {...props} {...data} />}
  </Query>
));
