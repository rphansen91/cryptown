import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TopBannerDisplayAd, BottomBannerDisplayAd } from "../../ads/slots";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import PersonIcon from "@material-ui/icons/Person";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import ArticleSidebar from "../Article/Sidebar";
import AddThis from "../AddThis";
import withArticles from "../Article/withArticles";
import Layout from "../Layout";
import SEO from "../SEO";

const first = a => a && a[0];

const Post = ({ loading, post = {}, path }) => {
  return (
    <Layout
      content={
        <div>
          <SEO
            schema="Article"
            title={`Hodl Stream | ${post.title || ""}`}
            description={post.content}
            path={path}
            images={post.urlToImage}
          />
          <TopBannerDisplayAd />
          {loading && <CircularProgress />}
          <section>
            {post.urlToImage && (
              <img src={post.urlToImage} className="img-fluid" />
            )}
          </section>
          <section className="container">
            <Typography paragraph variant="h4" color="textPrimary">
              {post.title}
            </Typography>

            <div className="d-flex border-bottom pb-2 mb-4">
              <div className="text-left">
                <Typography
                  variant="caption"
                  color="textSecondary"
                  className="d-block"
                >
                  <PersonIcon className="mr-1" />
                  {post.author}
                  {post.source && post.source.name ? " - " : ""}
                  {post.source && post.source.name ? post.source.name : ""}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  className="d-block"
                >
                  <TimelapseIcon className="mr-1" />
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleString()
                    : ""}
                </Typography>
              </div>
              <div className="flex-grow-1" />
              <div className="addthis_inline_share_toolbox" />
            </div>

            <Typography variant="subtitle1" color="textSecondary">
              {post.content}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
          </section>
          <section>
            {post.url && (
              <a href={post.url} target="_blank">
                <Button aria-label="Read More">Read More</Button>
              </a>
            )}
          </section>
          <BottomBannerDisplayAd />
          <AddThis />
        </div>
      }
      sidebar={<ArticleSidebar activePost={post} />}
    />
  );
};

const activePost = Cmp => props => {
  const {
    match: { params },
    data: { news },
    post
  } = props;

  const selected =
    (post && post.data) ||
    (news || []).find(({ publishedAt }) => publishedAt === params.from) ||
    first(news);

  return <Cmp {...props} post={selected} />;
};

export default compose(
  connect(({ post, coins, pair }) => ({ coins, pair, post })),
  withArticles,
  withRouter,
  activePost
)(({ match: { params }, location, post, loading, error }) => (
  <Post
    loading={loading}
    error={error}
    post={post}
    {...params}
    path={location.pathname}
  />
));
