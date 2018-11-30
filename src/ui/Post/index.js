import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TopBannerDisplayAd, BottomBannerDisplayAd } from "../../ads/slots";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import ArticleSidebar from "../Article/Sidebar";
import withArticles from "../Article/withArticles";
import Layout from "../Layout";
import SEO from "../SEO";

const first = a => a && a[0];

const Post = ({ loading, post = {}, path }) => {
  return (
    <Layout
      content={
        <section>
          <SEO
            schema="Article"
            title={`Hodl Stream | ${post.title || ""}`}
            description={post.content}
            path={path}
            images={post.urlToImage}
          />
          <TopBannerDisplayAd />
          <section />
          {loading && <CircularProgress />}
          <section>
            {post.urlToImage && (
              <img src={post.urlToImage} className="img-fluid" />
            )}
          </section>
          <section>
            <Typography type="title">{post.title}</Typography>
            <Typography type="subtitle" color="secondary">
              {post.content}
            </Typography>
          </section>
          <section>
            {post.url && (
              <a href={post.url} target="_blank">
                <Button raised aria-label="Read More">
                  Read More
                </Button>
              </a>
            )}
          </section>
          <BottomBannerDisplayAd />
        </section>
      }
      sidebar={<ArticleSidebar filter={({ title }) => title !== post.title} />}
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
