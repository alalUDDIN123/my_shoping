import React from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import styles from '../styles/productCard.module.css';

const ProductCard = ({ image, name, brand, category, rating, price }) => {

  // console.log("rating::-", [...Array(rating)])
  return (
    <div className={styles.product_card}>
      <div className={styles.product_image_container}>
        <img src={image} alt={name} className={styles.product_image} />
      </div>
      <div className={styles.product_details}>
        <h3 className={styles.product_name}>{name}</h3>
        <p className={styles.product_brand}> <strong>Brand : -</strong> {brand}</p>
        <p className={styles.product_category}> <strong>Category : -</strong> {category}</p>


        <div className={styles.product_rating}>
          {Array(5).fill().map((_, i) => (

            // let's say rating 3
            // so over the each iteration i will check that currect i is less then rating
            // if yes then till to 3 star `star_active` will be added others 2 will not
            <span key={i} className={`${styles.star} ${i < rating ? styles.star_active : ''}`}>
              <FaStar />
            </span>
          ))}
        </div>


        <p className={styles.product_price}>${price}</p>
        <div className={styles.icons_container}>
          <button className={styles.icon_button_shop}>
            <FaShoppingCart />
          </button>
          <button className={styles.icon_button_heart}>
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
