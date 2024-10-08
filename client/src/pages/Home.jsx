import React from "react";
import {
  Header,
  Hero,
  LimBooks,
  LimMembers,
  ScrollToTop,
  Footer,
} from "../components/index";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <LimBooks />
      <LimMembers />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
