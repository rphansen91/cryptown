import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Coin from '../../explorer/Coin';
import Trend from '../../explorer/Trend';
import coinColor from '../../icons/colors';
import { graphql, Query } from 'react-apollo';
import Button from 'material-ui/Button';
import { CardActions } from 'material-ui/Card';
import { withRouter } from 'react-router-dom';
import { setPost } from '../../store/reducers/post';
import { TopBannerDisplayAd, BottomBannerDisplayAd, NewsDisplayAd } from '../../ads/slots';
import Article from '../Article';
import gql from 'graphql-tag';
import SEO from '../SEO';

const blogQuery = gql`
query Blog($q: String!, $from: String) {
  news(q: $q, from: $from) {
    url
    title
    content
    publishedAt
    urlToImage
  }
}
`

const Post = connect(
  ({}) => ({}),
  ({ setPost })
)(({ setPost, q, loading, post={}, news, error, path }) => {
  return <div>
      <div className="container">
      <SEO title={`Hodl Stream | ${post.title || ""}`} path={path} />
      <section>
        {post.urlToImage && <img src={post.urlToImage} className="img-fluid" /> }
      </section>
      <section>
        <Typography type="title">{post.title}</Typography>
        <Typography type="subtitle" color="secondary">{post.content}</Typography>
      </section>
      <section>
        {post.url && <a href={post.url} target="_blank"><Button raised>Read More</Button></a>}
      </section>
    </div>
    <section>
      <div className="articles responsive">
          {
            (news || [])
            .reduce((acc, a, i) => {
              if (i && i % 2 === 0) {
                acc.push(<NewsDisplayAd style={{
                  display: "inline-block",
                  width: 350
                }} key={i + "ad"} />)
            }
            acc.push(
              <Link onClick={() => setPost(a)} 
                to={`/post/${q}/${a.publishedAt}`} key={i}><Article
                image={a.urlToImage}
                title={a.title}
                actions={<CardActions>
                  <Button dense color="primary">
                    Read More
                  </Button>
                </CardActions>} />
              </Link>
            )
            return acc
          }, [])
        }
      </div>
    </section>
  </div>
})

const first = a => a && a[0]

export default connect(
  ({ post, coins, pair }) => ({ coins, pair, post }),
)(withRouter(({ match: { params }, location, post }) =>
<div>
  <TopBannerDisplayAd />
  <section />
  
  <Query query={blogQuery} variables={params}>
    {({ loading, data: { news } = {}, error }) => {
      const p = post && post.data || first(news)
      return <Post 
      loading={loading}
      error={error}
      post={p}
      news={(news || []).filter(v => v).filter(v => v.title !== p.title)}
      {...params} 
      path={location.pathname} />
    }}
  </Query>
  
  <BottomBannerDisplayAd />
</div>))
