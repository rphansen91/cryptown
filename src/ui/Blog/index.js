import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "material-ui/Typography";
import Coin from "../../explorer/Coin";
import Trend from "../../explorer/Trend";
import coinColor from "../../icons/colors";
import { graphql, Query } from "react-apollo";
import Button from "material-ui/Button";
import { CardActions } from "material-ui/Card";
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

export const Blog = compose(
  withArticles,
  withPost
)(({ setPost, q, loading, data, error }) => (
  <div class="row">
    {(data.news || []).reduce((acc, a, i) => {
      if (i && i % 2 === 0) {
        acc.push(
          <div className="col-md-3">
            <NewsDisplayAd
              style={{
                margin: "1em"
              }}
              key={i + "ad"}
            />
          </div>
        );
      }
      acc.push(
        <div className="col-md-3">
          <Link
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
                  <Button dense color="primary" raised>
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
    <SEO title={"Blog | Hodl Stream"} path={"/blog"} />
    <TopBannerDisplayAd />
    <section />
    <Typography type="title">Blog</Typography>
    <section />
    <section>
      <Blog />
    </section>
    <BottomBannerDisplayAd />
  </div>
);
