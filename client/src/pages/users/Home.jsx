import React from "react";

import SliderComponent from "../../components/SliderComponent";
import CategoriesSection from "./CategoriesSection";
import DocumentTitle from "../../components/Helmet";
import ProductCarousel from "../../components/ProductCarousel";
function Home() {
  return (
    <>
      <DocumentTitle pageTitle="| HOME" />
      <>
        <SliderComponent />
      </>

      <>
        <CategoriesSection />
      </>

      <div style={{ background: "lightgreen" }}>
        <hr />
        <ProductCarousel />
        <hr />
      </div>
    </>
  );
}

export default Home;
