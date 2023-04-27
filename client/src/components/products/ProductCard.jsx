import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import styles from "./productCard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import DocumentTitle from "../../components/Helmet/Helmet";
import getLoggedUserData from "../../utils/LoggedUserData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddWishListAction } from "../../redux/AppReducer/wishlist/actions";
import {
  ADD_WISHLIST_REQUEST_FAILUE,
  ADD_WISHLIST_REQUEST_SUCESS,
} from "../../Constant/actionTypes";

const ProductCard = ({
  image,
  title,
  brand,
  category,
  ratings,
  discountPrice,
  _id,
}) => {
  const loggedUser = getLoggedUserData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isError, response } = useSelector(
    (store) => store.addWishListReducer
  );
  const [isHeartClicked, setIsHeartClicked] = useState(() => {
    const storedValue = localStorage.getItem(`product_${_id}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const handleProductDetails = () => {
    if (!isHeartClicked) {
      navigate(`/product/single/${_id}`);
    }
  };

  const handleHeartClick = () => {
    const payload = {
      token: loggedUser.token,
      productId: _id,
    };
    dispatch(AddWishListAction(payload));
    setIsHeartClicked(true);
    localStorage.setItem(`product_${_id}`, JSON.stringify(true));
  };

  const handleWishListAdd = () => {
    if (!loggedUser) {
      toast.error("Please login to add review");

      setTimeout(() => {
        navigate("/login", {
          state: { from: location.pathname },
          replace: true,
        });
      }, 2000);
      return;
    }

    handleHeartClick();
  };

  if (isError) {
    if (isError === "Product already in wishlist") {
      toast.error(isError, { autoClose: 2000 });
      dispatch({ type: ADD_WISHLIST_REQUEST_FAILUE, payload: null });
    } else {
      toast.error("Something went wrong", { autoClose: 2000 });
      dispatch({ type: ADD_WISHLIST_REQUEST_FAILUE, payload: null });
    }
  }

  if (response) {
    if (response === "Wishlist created") {
      toast.success("Added to wishlist success", { autoClose: 2000 });

      dispatch({ type: ADD_WISHLIST_REQUEST_SUCESS, payload: null });
    }
  }

  // console.log("response::-",response,"isError:-",isError);

  return (
    <>
      <DocumentTitle pageTitle="| PRODUCT-DETAILS" />
      <div className={styles.product_card} onClick={handleProductDetails}>
        <div className={styles.product_image_container}>
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
                  className={`${styles.star} ${
                    i < Math.floor(ratings) ? styles.star_active : ""
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
              className={`${styles.icon_button_heart} ${
                isHeartClicked ? styles.icon_button_heart_active : ""
              }`}
              onClick={handleWishListAdd}
            >
              <FaHeart style={{ color: isHeartClicked ? "#fff" : "#333" }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
