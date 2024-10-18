import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/react"
import {PRODUCT_DOMAIN} from "../browser/productConstants";
import Head from "next/head";
import React from "react";

const getUmamiScript = (src: string, websiteId: string) => {
  /* avoid gtag removing trackers, recommended by https://umami.is/docs/guides/google-tag-manager */
  return (
/* language=javascript */
`(function () {
  var el = document.createElement('script');
  el.setAttribute('src', '${src}');
  el.setAttribute('data-website-id', '${websiteId}');
  document.body.appendChild(el);
})();`
  );
};

const Trackers = () => {
  return (<>
      <SpeedInsights/>
      <Analytics/>
      {PRODUCT_DOMAIN === 'fontsensei.com' && <Head>
        <script>{getUmamiScript('/um/script.js', 'f2f83fe4-0d44-4f66-8a87-a2d278cc7b7d')}</script>
      </Head>}
    </>
  )
};

export default Trackers;
