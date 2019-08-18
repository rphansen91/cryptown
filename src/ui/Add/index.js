import React from "react";
import Add from "../../portfolio/Add";
import { TopBannerDisplayAd, BottomBannerDisplayAd } from "../../ads/slots";
import SEO from "../SEO";

export default () => (
  <div>
    <SEO title="Add | Hodl Stream" path="/add" />
    <TopBannerDisplayAd />
    <section />
    <section>
      <div className="contained">
        <Add />
      </div>
    </section>
    <BottomBannerDisplayAd />
  </div>
);
