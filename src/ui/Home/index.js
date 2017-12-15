import React from 'react';
import Typography from 'material-ui/Typography';
import Coin from '../../explorer/Coin';
import Trend from '../../explorer/Trend';
import coinColor from '../../icons/colors';
import './style.css';

export default ({ coins=[], pair='USD' }) =>
<div>
  <section />

  <section>
    <Typography type="title">Tickers</Typography>
    <div className="icons">
      { coins.map(coin => <Coin color={coinColor(coin.id)} key={coin.id} id={coin.id} />) }
    </div>
  </section>

  <section>
    <Typography type="title">Trends</Typography>
    <div className="icons responsive">
      { coins.map(c => <Trend key={c.id} color={coinColor(c.id)} id={c.id} pair={pair} />) }
    </div>
  </section>
</div>
