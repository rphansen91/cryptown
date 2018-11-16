import React from 'react';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from "react-router-dom";
import RegItem from './Item';
import coinQl from '../../gql/coin';
import CryptoIcon from '../../icons/CryptoIcon';
import Percent from '../../explorer/Percent';
import { withTheme } from 'material-ui/styles';

const defaultCoin = (name) => ({ symbol: '', percent_change_24h: 0 })
const attrs = c => ({
  fill: c
})
const iconStyle =  {
  height: 24,
  width: 24
}
const style = { height: 24, width: 24, marginRight: 16, fontSize: 10 }

export default coinQl(withTheme()(({ theme, open, id, history, data: { loading, error, coin=defaultCoin } }) => {
  const color = theme.palette.action.active
  return <Link to={'/coin/' + id}><RegItem>
    <ListItemIcon>
      <CryptoIcon attrs={attrs(color)} icon={coin.symbol} style={iconStyle} />
    </ListItemIcon>
    <ListItemText primary={coin.symbol} style={{ opacity: open ? 1 : 0 }} />
      <Percent value={coin.percent_change_24h} />
    </RegItem></Link>
}))
