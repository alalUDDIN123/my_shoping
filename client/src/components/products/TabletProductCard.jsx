import React from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import styles from './tablet.card.module.css'; 
import { useNavigate } from 'react-router-dom';

const TabletProductCard = ({ thumbnail, title, brand, category, rating, price,_id }) => {
 const navigate=useNavigate()
  return (
    <div className={styles._tablet_product_card} onClick={()=>navigate(`/product/single/${_id}`)} >
      <div className={styles._tablet_product_image_container}>
        <img src={thumbnail} alt={title} className={styles._tablet_product_image} />
      </div>
      <div className={styles._tablet_product_details}>
        <h3 className={styles._tablet_product_name}>{title.substr(0,20)}</h3>
        <p className={styles._tablet_product_brand}> <strong>Brand : -</strong> {brand}</p>
        <p className={styles._tablet_product_category}> <strong>Category : -</strong> {category}</p>


        <div className={styles._tablet_product_rating}>
          {Array(5).fill().map((_, i) => (
            <span key={i} className={`${styles._tablet_star} ${i < Math.floor(rating )? styles._tablet_star_active : ''}`}>
              <FaStar />
            </span>
          ))}
        </div>


        <p className={styles._tablet_product_price}>${price}</p>
        <div className={styles._tablet_icons_container}>
          <button className={styles._tablet_icon_button_shop}>
            <FaShoppingCart />
          </button>
          <button className={styles._tablet_icon_button_heart}>
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabletProductCard;
