import "../styles/result.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/globals.scss";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { AnimateSharedLayout } from "framer-motion";

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
      <AnimateSharedLayout>
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </>
  );
}

export default MyApp;
