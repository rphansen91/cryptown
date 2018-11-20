import React from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Coin from '../../explorer/Coin';
import Trend from '../../explorer/Trend';
import coinColor from '../../icons/colors';
import { withRouter } from 'react-router-dom';
import { TopBannerDisplayAd } from '../../ads/slots';
import SEO from '../SEO';
import './style.css';

export default connect(
  ({ coins, pair }) => ({ coins, pair }),
  dispatch => ({})
)(withRouter(({ coins, pair, history }) =>
<div>
  <SEO />

  <section />

  <TopBannerDisplayAd />

  <section />

  {/* <section>
    <Typography type="title">Tickers</Typography>
    <div className="icons">
      { coins.map(c => <Coin
        key={c.id}
        id={c.id}
        color={coinColor(c.id)}
        onClick={() => history.push((process.env.PUBLIC_URL || '') + '/coin/' + c.id)} />) }
    </div>
  </section> */}

  <section>
    <Typography type="title">Trends</Typography>
    <div className="icons responsive">
      { coins.map(c => <Trend
        key={c.id}
        id={c.id}
        pair={pair}
        color={coinColor(c.id)}
        onClick={() => history.push((process.env.PUBLIC_URL || '') + '/coin/' + c.id)} />) }
    </div>
  </section>
</div>))
