import React from 'react';
import Typography from 'material-ui/Typography';
import { TopBannerDisplayAd, BottomBannerDisplayAd } from '../../ads/slots';
import SEO from '../SEO';
import FbFeed from '../Social/FbFeed';
import InstaPosts from '../Social/InstaPosts';
import TwitterFeed from '../Social/TwitterFeed';
import './style.css';

export default () =>
  <div>
    <SEO title={'About | Hodl Stream'} path='/about' />
    <TopBannerDisplayAd />
    <section />
    <section>
      <Typography type="title">About</Typography>
      <Typography type="subtitle" color="secondary">Track your crypto portfolio and visualize how it changes over time.</Typography>
      <Typography type="subtitle" color="secondary">Your transaction data is never transmitted to our servers.</Typography>
    </section>
    <section className="about">
      <div className="about-content">
        <FbFeed page="hodlstream" name="Hodl Stream" tabs="timeline, events" />
      </div>
      <div className="about-content">
        <TwitterFeed username="hodl_stream" />
      </div>
      <div className="about-content">
        <InstaPosts username="hodlstream" link="edfee4f5133f008b0c0787bf13bede2b061e23953e3298f30356155e5f35197e" />
      </div>
    </section>
    <BottomBannerDisplayAd />
  </div>
