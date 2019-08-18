import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Coin from "../../explorer/Coin";
import Trend from "../../explorer/Trend";
import coinColor from "../../icons/colors";
import { graphql, Query } from "react-apollo";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { withRouter } from "react-router-dom";
import withProducts from "./withProducts";
import { setPost, withPost } from "../../store/reducers/post";
import {
  TopBannerDisplayAd,
  BottomBannerDisplayAd,
  NewsDisplayAd
} from "../../ads/slots";
import Article from "../Article";
import SEO from "../SEO";

export const Shop = compose(
  withProducts,
  withPost
)(({ setPost, q, loading, data, error }) => (
  <div class="row">
    {(data.checkout && data.checkout.products
      ? data.checkout.products
      : []
    ).reduce((acc, a, i) => {
      acc.push(
        <div className="col-lg-4 col-md-6" key={i}>
          <Article
            imageSize={160}
            image={a.images[0]}
            title={a.name}
            actions={
              <CardActions>
                <Button color="primary" aria-label="Read More">
                  Buy Now
                </Button>
              </CardActions>
            }
          />
        </div>
      );
      acc.push(
        <div className="col-lg-4 col-md-6" key={i + "ad"}>
          <NewsDisplayAd
            style={{
              width: 350,
              display: "inline-block",
              margin: "1em"
            }}
          />
        </div>
      );
      return acc;
    }, [])}
  </div>
));

export default () => (
  <div>
    <SEO title={"Shop | Hodl Stream"} path={"/shop"} />
    <TopBannerDisplayAd />
    <section />
    <Typography variant="h4" color="textPrimary">
      Shop
    </Typography>
    <section />
    <section className="container">
      <Shop />
    </section>
    <BottomBannerDisplayAd />
  </div>
);
