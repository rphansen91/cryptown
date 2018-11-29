import React from "react";
import Ad from "./Ad";
import "./index.css";

export const TopBannerDisplayAd = () => (
  <Ad>
    <ins
      className="adsbygoogle top-banner-display-ad"
      style={{ display: "block" }}
      data-ad-client="ca-pub-7183056818143738"
      data-ad-slot="3387340853"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </Ad>
);

export const BottomBannerDisplayAd = () => (
  <Ad>
    <ins
      className="adsbygoogle bottom-banner-display-ad"
      style={{ display: "block" }}
      data-ad-client="ca-pub-7183056818143738"
      data-ad-slot="9637764870"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </Ad>
);

export const NewsDisplayAd = ({ style }) => (
  <Ad>
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-7183056818143738"
      data-ad-slot="4394011205"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </Ad>
);

export const PortfolioBannerAd = ({}) => (
  <Ad>
    <ins
      className="adsbygoogle"
      style={{ display: "inline-block", width: "100%", height: 60 }}
      data-ad-client="ca-pub-7183056818143738"
      data-ad-slot="3292492573"
    />
  </Ad>
);
