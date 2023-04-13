import React, { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

import "../styles/ProductCarousel.css";

const ProductCarousel = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 425 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 320, min: 0 },
      items: 1.5,
    },
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/products/get")
      .then((res) => res.json())
      .then((data) => {
        const productdata = data.products;
        setProductData(productdata);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const product = productData?.map((item,ind) => (
    <Link to="" key={ind} className="__each__link__">
      <div className="__each__Product__">
        <div className="__each__imgage__">
          <img src={item.image} alt="product" />
        </div>
        <p className="__each__name__">{item.title}</p>
        <div className="__each__price_and_seemore__">
          <p className="__each__price__">
            <span>₹ {item.discountPrice}</span>
          </p>
          <button>See more</button>
        </div>
      </div>
    </Link>
  ));

  if (loading) {
    return (
      <div>
        <h1
          style={{
            textAlign: "center",
            fontSize: "25px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          Loading...
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="__outer_div_carousel__">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            infinite={true}
            itemClass="carousel-item-padding-40-px"
          >
            {product}
          </Carousel>
        </div>
      </div>
    );
  }
};

export default ProductCarousel;
