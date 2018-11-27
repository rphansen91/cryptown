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

const Post = ({ q, loading, data, error, path }) => {
  const [post, ...posts] = (data.news || [{}])
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
        <a href={post.url} target="_blank"><Button raised>Read More</Button></a>
      </section>
    </div>
    <section>
      <div className="articles responsive">
          {
            (posts || [])
            .reduce((acc, a, i) => {
              if (i && i % 2 === 0) {
                acc.push(<NewsDisplayAd style={{
                  display: "inline-block",
                  width: 350
                }} key={i + "ad"} />)
            }
            acc.push(
              <Link to={`/post/${q}/${a.publishedAt}`} key={i}><Article
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
}

export default connect(
  ({ coins, pair }) => ({ coins, pair }),
  dispatch => ({})
)(withRouter(({ match: { params }, location, data }) =>
<div>
  <TopBannerDisplayAd />
  <section />
  
  {
    console.log({ data }) || data
    ? <Post {...data} {...params} path={location.pathname} />
    : <Query query={blogQuery} variables={params}>
      {(data) => <Post {...data} {...params} path={location.pathname} />}
    </Query>
  }
  
  <BottomBannerDisplayAd />
</div>))
