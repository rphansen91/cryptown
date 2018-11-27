import React from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import { graphql, Query } from 'react-apollo';
import Coin from '../../explorer/Coin';
import Trend from '../../explorer/Trend';
import coinColor from '../../icons/colors';
import { withRouter } from 'react-router-dom';
import { Blog, blogQuery } from '../Blog';
import { TopBannerDisplayAd, BottomBannerDisplayAd } from '../../ads/slots';
import SEO from '../SEO';
import './style.css';

export default connect(
  ({ coins, pair }) => ({ coins, pair })
)(withRouter(({ q="cryptocurrency", coins, pair, history }) =>
<div>
  <SEO />
  <div className="row">
    <div className="col-md-9 pr-0">
      <TopBannerDisplayAd />
      <section />
      <Typography type="title">Trends</Typography>
      <div className="icons responsive">
        { coins.map(c => <Trend
          key={c.id}
          id={c.id}
          pair={pair}
          color={coinColor(c.id)}
          onClick={() => history.push((process.env.PUBLIC_URL || '') + '/coin/' + c.id)} />) }
      </div>
      <BottomBannerDisplayAd />
      <section />
    </div>
    <div className="col-md-3 border-left pl-0">
      <Typography type="title" className="my-2">Articles</Typography>
      <div className="article-sidebar">
        <Query query={blogQuery} variables={{ q }}>
          {(data) => <Blog q={q} {...data} />}
        </Query>  
      </div>
    </div>
  </div>
</div>))
