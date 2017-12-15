import React from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { MainListItems, OtherListItems } from './links';

export default ({ open, onClose }) =>
  <Drawer open={open} onRequestClose={onClose}>
    <MainListItems style={{ width: 250 }} />
    <Divider />
    <OtherListItems style={{ width: 250 }} />
  </Drawer>
