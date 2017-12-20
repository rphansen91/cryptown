import React from 'react'
import AllCoins from '../../icons/AllCoins';
import { withRouter } from 'react-router-dom'
import './style.css'

export default withRouter((props) =>
<div className="page-footer primary-gradient">
  <section>
    <p className="footer-p">
      by <a href="http://github.com/rphansen91">Ryan P. Hansen</a>
    </p>
    <p className="footer-ps">
      Thank you to
      <a href="https://www.coinmarketcap.com" target="_blank">
        <img src={process.env.PUBLIC_URL + "/coinmarketcap_t.png"} height="15" width="auto" />
      </a>
      for providing price analytics and
      <a href="https://www.highcharts.com" target="_blank">
        <img src={process.env.PUBLIC_URL + "/highcharts_t.png"} height="25" width="auto" style={{transform: 'translate3d(0,-3px,0)'}}/>
      </a>
      for charting.
    </p>
  </section>
  <AllCoins color="#fff" onClick={coin => props.history.push(process.env.PUBLIC_URL + '/coin/' + coin)}/>
</div>)
