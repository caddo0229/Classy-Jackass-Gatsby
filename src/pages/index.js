import React from "react";

import Seo from "../components/seo";
import Layout from "../components/layout";
import Hero from "../components/hero";
import About from "../components/about";
import Metrics from "../components/metrics";
import Signup from "../components/signup";
import Team from "../components/team";

const IndexPage = () => {
  return (
    <Layout>
      <Seo />
      <Hero />
      <About />
      <Metrics />
      <Team />
      <Signup />
    </Layout>
  );
};

export default IndexPage;
