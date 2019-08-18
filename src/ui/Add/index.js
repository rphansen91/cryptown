import React from "react";
import Add, { Transactions } from "../../portfolio/Add";
import { TopBannerDisplayAd, BottomBannerDisplayAd } from "../../ads/slots";
import ArticleSidebar from "../Article/Sidebar";
import Layout from "../Layout";
import SEO from "../SEO";

export default () => (
  <Layout
    content={
      <div>
        <SEO title="Add | Hodl Stream" path="/add" />
        <TopBannerDisplayAd />
        <section />
        <section>
          <div className="contained">
            <Add />
            <Transactions />
          </div>
        </section>
        <BottomBannerDisplayAd />
      </div>
    }
    sidebar={<ArticleSidebar />}
  />
);
