import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import usd from '../utility/usd';
import btc from '../utility/btc';
import gql from 'graphql-tag';
import CryptoIcon from '../icons/CryptoIcon';
import Percent from './Percent';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chart from './Chart';
import { defaultColor } from '../utility/styles';
import './Details.css'

const iconAttrs = "height='4em'"
const detailsQuery = gql`
query Details($id: String!) {
  coin(id: $id) {
    id
    name
    symbol
    price_usd
    price_btc
    percent_change_24h
  }
}
`

const loadingCoin = (name) => ({ symbol: '', name: 'Loading', price_usd: 0, price_btc: 0, percent_change_24h: 0 })
const defaultCoin = () => ({ symbol: 'NaC', name: 'Not Found', price_usd: 0, price_btc: 0, percent_change_24h: 0 })

class CoinDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggle () {
    const open = !this.state.open
    this.setState({ open })
  }

  setOpen (open) {
    this.setState({ open })
  }

  render () {
    let {
      data: { loading, error, coin },
      color=defaultColor,
      pos, neg, pair
    }=this.props
    let series = {}

    if (loading) coin = loadingCoin()
    if (error) coin = defaultCoin()
    if (!coin) coin = defaultCoin()

    return <Card className="details">
      <CardHeader
        avatar={
          <CryptoIcon icon={coin.symbol} className={(loading ? "App-logo" : "")} attrs={(iconAttrs + ' fill="' + color + '"')} />
        }
        title={ coin.name }
        subheader={ coin.price_usd }
      />
      <CardMedia
        style={{ height: 194 }}
        image="http://placehold.it/320x320"
        title={coin.name}
      />
      <CardActions disableActionSpacing>
        { this.props.actions || <div></div> }
        <div style={{ flex: '1 1 auto' }} />
        <IconButton
          onClick={this.toggle.bind(this)}
          aria-expanded={this.state.open}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
        { this.state.open ?
          <Chart color={color} id={coin.id} pair={pair} /> :
          <div />
        }
      </Collapse>
    </Card>
  }
}

export default graphql(detailsQuery, {
  options: ({ id, pair }) => ({ variables: { id, pair } })
})(CoinDetails)
