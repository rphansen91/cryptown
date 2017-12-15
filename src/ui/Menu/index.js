import React from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { MainListItems, OtherListItems, CoinListItems } from './links';

export default ({ permanent, open, onClose, coins }) =>
  <Drawer open={open} onRequestClose={onClose} type={permanent ? "permanent" : ""} style={{overflowX: 'hidden'}}>
    <MainListItems className={(open) ? 'links open' : 'links'} />
    <Divider />
    <CoinListItems coins={coins} open={open} className={(open) ? 'links open' : 'links'} />
    <Divider />
    <OtherListItems className={(open) ? 'links open' : 'links'} />
  </Drawer>
