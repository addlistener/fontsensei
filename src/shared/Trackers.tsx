import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/react"
import {PRODUCT_DOMAIN} from "../browser/productConstants";
import React from "react";
import Script from "next/script";

const UmamiScript = (props: {src: string, websiteId: string}) => {
  /* avoid gtag removing trackers, recommended by https://umami.is/docs/guides/google-tag-manager */
  return (<Script id="um">{
    /* language=javascript */
    `(function () {
  var el = document.createElement('script');
  el.setAttribute('src', '${props.src}');
  el.setAttribute('data-website-id', '${props.websiteId}');
  document.body.appendChild(el);
})();`
  }</Script>);
};

const Trackers = () => {
  return (<>
      <SpeedInsights/>
      <Analytics/>
      {PRODUCT_DOMAIN === 'fontsensei.com' && <UmamiScript src="/um/script.js" websiteId="f2f83fe4-0d44-4f66-8a87-a2d278cc7b7d" />}
    </>
  )
};

export default Trackers;
