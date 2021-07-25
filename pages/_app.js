import "../styles/result.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/globals.scss";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { AnimateSharedLayout } from "framer-motion";
import Head from "next/head";

const progress = new ProgressBar({
  size: 3,
  color: "#fc9803",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />

        <title>Fikra Food</title>

        <meta name="theme-color" content="red" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="apple-mobile-web-app-title" content="Application Title" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <meta name="msapplication-navbutton-color" content="red" />
        <meta name="msapplication-TileColor" content="red" />
        <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
        <meta name="msapplication-config" content="browserconfig.xml" />

        <meta name="application-name" content="Application Name" />
        <meta name="msapplication-tooltip" content="Tooltip Text" />
        <meta name="msapplication-starturl" content="/" />

        <meta name="msapplication-tap-highlight" content="no" />

        <meta name="full-screen" content="yes" />
        <meta name="browsermode" content="application" />

        <meta name="nightmode" content="enable/disable" />

        <meta name="viewport" content="uc-fitscreen=yes" />

        <meta name="layoutmode" content="fitscreen/standard" />

        <meta name="imagemode" content="force" />

        <meta name="screen-orientation" content="portrait" />
      </Head>
      <AnimateSharedLayout>
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </>
  );
}

export default MyApp;
