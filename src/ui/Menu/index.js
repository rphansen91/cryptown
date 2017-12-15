import React from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { MainListItems, OtherListItems } from './links';

export default ({ permanent, open, onClose }) =>
  <Drawer open={open} onRequestClose={onClose} type={permanent ? "permanent" : ""}>
    <MainListItems className={(open) ? 'links open' : 'links'} />
    <Divider />
    <OtherListItems className={(open) ? 'links open' : 'links'} />
  </Drawer>
