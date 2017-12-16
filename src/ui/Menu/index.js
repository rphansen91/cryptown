import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { closeMenu } from '../../store/reducers/menu';
import { MainListItems, OtherListItems, CoinListItems } from './links';

const mapStateToProps = state => ({
  open: state.menu
})

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeMenu())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ open, onClose }) =>
  <Drawer open={open} onRequestClose={onClose} type="permanent" style={{overflowX: 'hidden'}}>
    <MainListItems className={(open) ? 'links open' : 'links'} />
    <Divider />
    <CoinListItems className={(open) ? 'links open' : 'links'} />
    <Divider />
    <OtherListItems className={(open) ? 'links open' : 'links'} />
  </Drawer>)
