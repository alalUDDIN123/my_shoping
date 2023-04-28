import React, { useState, useCallback } from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import styles from "./productCard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import getLoggedUserData from "../../utils/LoggedUserData";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AddWishListAction } from "../../redux/AppReducer/wishlist/actions";

import DocumentTitle from "../Helmet/Helmet";

const ProductCard = ({ image, title, brand, category, ratings, discountPrice, _id }) => {
  const loggedUser = getLoggedUserData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  const [isHeartClicked, setIsHeartClicked] = useState(() => {
    const storedValue = localStorage.getItem(`product_${_id}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const handleProductDetails = useCallback(() => {
    if (!isHeartClicked) {
      navigate(`/product/single/${_id}`);
    }
  }, [isHeartClicked, navigate, _id]);
  const handleHeartClick = useCallback(async () => {
    if (loggedUser && loggedUser.token) {
      const payload = {
        token: loggedUser.token,
        productId: _id,
      };

      try {
        const res = await dispatch(AddWishListAction(payload));
        // console.log("res:-", res);

        if (res === undefined) {
          throw new Error("Something went wrong",{autoClose:2000})
        }

        if( res && res==="Wishlist created"){
          toast.success("Product added to wish list success",{autoClose:2000})
        }else if(res==="Product already in wishlist"){
          toast.error(res,{autoClose:2000})
        }
        setIsHeartClicked(true);
        localStorage.setItem(`product_${_id}`, JSON.stringify(true));
      } catch (error) {
        toast.error(error.message,{autoClose:2000});
      }

    } else {
      toast.error("Please login to add product to wishlist", { autoClose: 2000 });
      navigate("/login", {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [dispatch, loggedUser, _id, navigate, location.pathname]);






  return (
    <>
      <DocumentTitle pageTitle={`| ${title}`} />
      <div className={styles.product_card}>
        <div
          className={styles.product_image_container}
          onClick={handleProductDetails}
        >
          <img src={image} alt={title} className={styles.product_image} />
        </div>
        <div className={styles.product_details}>
          <h3 className={styles.product_name}>{title.substr(0, 20)}</h3>
          <p className={styles.product_brand}>
            <strong>Brand : -</strong> {brand}
          </p>
          <p className={styles.product_category}>
            <strong>Category : -</strong> {category}
          </p>

          <div className={styles.product_rating}>
            {Array(5)
              .fill()
              .map((_, i) => (
                <span
                  key={i}
                  className={`${styles.star} ${i < Math.floor(ratings) ? styles.star_active : ""
                    }`}
                >
                  <FaStar />
                </span>
              ))}
          </div>

          <p className={styles.product_price}> ₹ {discountPrice}</p>
          <div className={styles.icons_container}>
            <button className={styles.icon_button_shop}>
              <FaShoppingCart />
            </button>

            <button
              className={`${styles.icon_button_heart} ${isHeartClicked ? styles.icon_button_heart_active : ""
                }`}
              onClick={handleHeartClick}
            >
              <FaHeart
                style={{ color: isHeartClicked ? "#fff" : "#333" }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
