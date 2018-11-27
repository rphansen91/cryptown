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
    publishedAt
    urlToImage
  }
}
`

const Blog = ({ q, loading, data, error }) => (
    <div>
         {
           (data.news || [])
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
)

export default connect(
  ({ coins, pair }) => ({ coins, pair }),
  dispatch => ({})
)(withRouter(({ q="cryptocurrency" }) =>
<div>
  <SEO title={'Blog | Hodl Stream'} path={'/blog'}/>
  <TopBannerDisplayAd />
  <section />
  <Typography type="title">Blog</Typography>
  <section />
  <section>
    <Query query={blogQuery} variables={{ q }}>
        {(data) => <Blog q={q} {...data} />}
    </Query>
  </section>
  <BottomBannerDisplayAd />
</div>))
