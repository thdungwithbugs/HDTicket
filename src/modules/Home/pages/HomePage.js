import React, { lazy, useEffect } from "react";

const MovieShowing = lazy(() => import("../components/MovieShowing"));
const Footer = lazy(() => import("../layout/Footer/Footer"));
const Header = lazy(() => import("../layout/Header/Header"));
const HomeCarousel = lazy(() => import("../layout/HomeCarousel/HomeCarousel"));
const HomeMenu = lazy(() => import("../layout/HomeMenu/HomeMenu"));
const UngDung = lazy(() => import("../layout/UngDung/UngDung"));
const News = lazy(() => import("../layout/News/News"));

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <Header></Header>
      <HomeCarousel></HomeCarousel>
      <MovieShowing />
      <HomeMenu></HomeMenu>
      <News></News>
      <UngDung></UngDung>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
