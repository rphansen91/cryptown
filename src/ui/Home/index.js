import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Trend from "../../explorer/Trend";
import coinColor from "../../icons/colors";
import { withRouter } from "react-router-dom";
import { TopBannerDisplayAd, BottomBannerDisplayAd } from "../../ads/slots";
import Layout from "../Layout";
import ArticleSidebar from "../Article/Sidebar";
import SEO from "../SEO";
import "./style.css";

export default compose(
  connect(({ coins, pair }) => ({ coins, pair })),
  withRouter
)(({ coins, pair, history }) => (
  <div>
    <SEO />
    <Layout
      content={
        <section>
          <TopBannerDisplayAd />
          <section />
          <Typography variant="h4" color="textPrimary">
            Trends
          </Typography>
          <div className="icons responsive">
            {coins.map(c => (
              <Trend
                key={c.id}
                id={c.id}
                pair={pair}
                color={coinColor(c.id)}
                onClick={() => history.push("/coin/" + c.id)}
              />
            ))}
          </div>
          <BottomBannerDisplayAd />
        </section>
      }
      sidebar={<ArticleSidebar />}
    />
  </div>
));
