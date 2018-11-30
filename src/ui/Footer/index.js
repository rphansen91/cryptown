import React from "react";
import AllCoins from "../../icons/AllCoins";
import { withRouter } from "react-router-dom";
import TwitterFollow from "../Social/TwitterFollow";
import Brand from "../Brand";
import "./style.css";

export default withRouter(props => (
  <div className="page-footer primary-gradient">
    <section>
      <Brand
        onClick={() => props.history.push("/")}
        style={{ color: "#fff", cursor: "pointer" }}
      />
      <p className="footer-ps">
        Thank you to
        <a href="https://www.coinmarketcap.com" target="_blank">
          <img
            src={(process.env.PUBLIC_URL || "") + "/coinmarketcap_t.png"}
            height="15"
            width="auto"
          />
        </a>
        for providing price analytics and
        <a href="https://www.highcharts.com" target="_blank">
          <img
            src={(process.env.PUBLIC_URL || "") + "/highcharts_t.png"}
            height="25"
            width="auto"
            style={{ transform: "translate3d(0,-3px,0)" }}
          />
        </a>
        for charting.
      </p>
    </section>
    <section>
      <div className="sharethis-inline-follow-buttons" />
      {/* <TwitterFollow username="hodl_stream" /> */}
    </section>
    <AllCoins color="#fff" />
  </div>
));
