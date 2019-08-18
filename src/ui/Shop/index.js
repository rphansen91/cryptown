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
import withArticles from "../Article/withArticles";
import { setPost, withPost } from "../../store/reducers/post";
import {
  TopBannerDisplayAd,
  BottomBannerDisplayAd,
  NewsDisplayAd
} from "../../ads/slots";
import Article from "../Article";
import SEO from "../SEO";

export const Shop = compose(
  withArticles,
  withPost
)(({ setPost, q, loading, data, error }) => (
  <div class="row">
    {(data.news || []).reduce((acc, a, i) => {
      if ((i + 1) % 2 === 0) {
        acc.push(
          <NewsDisplayAd
            style={{
              width: 350,
              display: "inline-block",
              margin: "1em"
            }}
            key={i + "ad"}
          />
        );
      }
      acc.push(
        <div className="col-md-3">
          <Link
            aria-label="Read More"
            className="d-block"
            onClick={() => setPost(a)}
            to={`/post/${a.publishedAt}`}
            key={i}
          >
            <Article
              imageSize={160}
              image={a.urlToImage}
              title={a.title}
              actions={
                <CardActions>
                  <Button color="primary" aria-label="Read More">
                    Read More
                  </Button>
                </CardActions>
              }
            />
          </Link>
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
    <section>
      <Shop />
    </section>
    <BottomBannerDisplayAd />
  </div>
);
