import React from 'react'
import AllCoins from '../../icons/AllCoins';
import './style.css'

export default () =>
<div className="page-footer">
  <section>
    <p className="footer-p">
      by <a href="http://github.com/rphansen91">Ryan P. Hansen</a>
    </p>
    <p className="footer-ps">
      Thank you to
      <a href="https://www.coinmarketcap.com" target="_blank">
        <img src="./coinmarketcap_t.png" height="15" width="auto" />
      </a>
      for providing price analytics and
      <a href="https://www.highcharts.com" target="_blank">
        <img src="./highcharts_t.png" height="25" width="auto" style={{transform: 'translate3d(0,-3px,0)'}}/>
      </a>
      for charting.
    </p>
  </section>
  <div style={{marginLeft: 60}}>
    <AllCoins />
  </div>
</div>
