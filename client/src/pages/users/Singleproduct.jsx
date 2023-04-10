import React from 'react'

import styles from "../../styles/details.module.css"
import { product } from './SingleObjetData'
import {  FaShoppingCart, FaStar } from 'react-icons/fa';
import {TiShoppingCart} from "react-icons/ti"
function Singleproduct() {

  return (
    <>
      <div className={styles._main_single_container}>

        {/* images  */}
        <div className={styles._main_single_images}>

          {/* column images div */}

          <div className={styles._main_single_column}>
            {product && product.images.map((image, index) => (
              <img key={index} src={image} alt={`Product ${index + 1}`} />
            ))}
          </div>


          {/* single image */}

          <div className={styles._main_single_img} >
            <img src={product.image} alt={`product-${product.title}`} style={{borderRadius:"5px"}} />

            <div className={styles._main_single_buttons}>
              <button className={styles.buyButton}>Buy Now <TiShoppingCart/></button>
              <button className={styles.cartButton}>Add to Cart <FaShoppingCart /></button>
            </div>
          </div>

        </div>


        {/* details about the product */}
        <div className={styles._main_single_details}>
          <h2>{product && product.title}</h2>

          <div className={styles._main_single_reviews}>
            <p>{product && product.ratings} stars</p>
            <p>{product && product.reviews.length} reviews</p>
          </div>

          <div className={styles._main_single_price}>
            <p className={styles.discountPrice}>${product && product.discountPrice}</p>
            <p className={styles.originalPrice}>${product && product.originalPrice}</p>
          </div>

          <div className={styles._main_single_stock}>
            <p>Availability: {product && product.Stock > 0 ? `In Stock (${product.Stock})` : "Out of Stock"}</p>
          </div>
          <div className={styles._main_single_category}>
            <p>Category: {product && product.category}</p>
          </div>
          <div className={styles._main_single_brand}>
            <p>Brand: {product && product.brand}</p>
          </div>

          <div className={styles._main_single_description} >
            <p>{product && product.description}</p>
          </div>


          {/* reviews */}
          <div className={styles._main_single_reviews}>
            {product && product.reviews.length === 0 ? (
              <h1>No Reviews</h1>
            ) : (
              product.reviews.map((rev) => (
                <>
                  <div className={styles._main_single_rating_name}>
                    <p className={styles._main_single_rating}>{rev.rating} <FaStar /> </p>
                    <p className={styles._main_single_rater}>{rev.name}</p>
                  </div>
                  <div className={styles._main_single_comment}>
                    <p className={styles._main_single_com}>{rev.comment}</p>
                  </div>
                </>
              ))
            )}
          </div>



        </div>
      </div>

      {/* recommaned */}
      <div className={styles._main_single_recommendations}>
        <h3>Recommended Products</h3>

      </div>
    </>
  )
}

export default Singleproduct
