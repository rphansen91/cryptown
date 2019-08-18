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
import CircularProgress from "@material-ui/core/CircularProgress";
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
  <div>
    {loading && <CircularProgress style={{ margin: "auto" }} />}
    <div className="row">
      {data
        ? (data.news || []).reduce((acc, a, i) => {
            acc.push(
              <div className="col-lg-4 col-md-6 mb-4" key={i}>
                <Link
                  aria-label="Read More"
                  className="d-block"
                  onClick={() => setPost(a)}
                  to={`/post/${a.publishedAt}`}
                >
                  <Article
                    imageSize={160}
                    image={a.urlToImage}
                    title={a.title}
                    style={{ width: "100%" }}
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
              // <div className="col-lg-4 col-md-6 mb-4" key={i + "ad"}>
              //   <NewsDisplayAd
              //     style={{ maxWidth: "100%", margin: "auto", width: 350 }}
              //   />
              // </div>
            );
            return acc;
          }, [])
        : null}
    </div>
  </div>
));

export default () => (
  <div>
    <SEO title={"Blog | Hodl Stream"} path={"/blog"} />
    <TopBannerDisplayAd />
    <section />
    <Typography variant="h4" color="textPrimary">
      Blog
    </Typography>
    <section />
    <section className="container">
      <Blog />
    </section>
    <BottomBannerDisplayAd />
  </div>
);
