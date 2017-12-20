import React from 'react';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import RegItem from './Item';
import coinQl from '../../gql/coin';
import CryptoIcon from '../../icons/CryptoIcon';
import Percent from '../../explorer/Percent';

const defaultCoin = (name) => ({ symbol: '', percent_change_24h: 0 })
const attrs = 'height="24px" width="24px" style="fill: rgba(0, 0, 0, 0.54);"'
const style = { height: 24, width: 24, marginRight: 16, fontSize: 10 }

export default coinQl(({ open, id, history, data: { loading, error, coin=defaultCoin } }) =>
<RegItem onClick={() => history.push(process.env.PUBLIC_URL + '/coin/' + id)}>
  <ListItemIcon>
    <CryptoIcon attrs={attrs} icon={coin.symbol} />
  </ListItemIcon>
  <ListItemText primary={coin.symbol} style={{ opacity: open ? 1 : 0 }} />
  <Percent value={coin.percent_change_24h} />
</RegItem>)
