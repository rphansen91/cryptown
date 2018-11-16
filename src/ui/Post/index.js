import React from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Coin from '../../explorer/Coin';
import Trend from '../../explorer/Trend';
import coinColor from '../../icons/colors';
import { withRouter } from 'react-router-dom';
import SEO from '../SEO';

export default connect(
  ({ coins, pair }) => ({ coins, pair }),
  dispatch => ({})
)(withRouter(({ id, coins, pair, history }) =>
<div>
  <SEO
    // title={post.title + ' | Hodl Stream'} path={'/coin/' + post.id}
    />

  <section />

</div>))
