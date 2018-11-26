import React from 'react';
import Typography from 'material-ui/Typography';
import { TopBannerDisplayAd, BottomBannerDisplayAd } from '../../ads/slots';
import SEO from '../SEO';
import Social from '../Social';
import './style.css';

export default () =>
  <div>
    <SEO title={'About | Hodl Stream'} path='/about' />
    <TopBannerDisplayAd />
    <section />
    <section className="about">
      <div className="about-content">
        <Typography type="title">About</Typography>
      </div>
      <div className="about-sidebar">
        <Social page="hodlstream" name="Hodl Stream" tabs="timeline, events" />
      </div>
    </section>
    <BottomBannerDisplayAd />
  </div>
