import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Trend from "../../explorer/Trend";
import coinColor from "../../icons/colors";
import Add from "../../portfolio/Add";
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
        <div>
          <TopBannerDisplayAd />
          <section />
          <div className="container">
            <Typography variant="h4" color="textPrimary" className="mb-3">
              Trends
            </Typography>
            <div className="row">
              {coins.map(c => (
                <div className="col-md-6 mb-3" key={c.id}>
                  <Trend
                    id={c.id}
                    pair={pair}
                    color={coinColor(c.id)}
                    onClick={() => history.push("/coin/" + c.id)}
                  />
                </div>
              ))}
              <div className="col-md-6 mb-3">
                <div className="trend h-100">
                  <Add />
                </div>
              </div>
            </div>
          </div>
          <BottomBannerDisplayAd />
        </div>
      }
      sidebar={<ArticleSidebar />}
    />
  </div>
));
