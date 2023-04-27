import React, { useEffect } from "react";
import styles from "./wishlist.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getLoggedUserData from "../../utils/LoggedUserData";
import { RemoveWishListAction } from "../../redux/AppReducer/wishlist/actions";
import { toast } from "react-toastify";
import { REMOVE_WISHLIST_REQUEST_SUCESS } from "../../Constant/actionTypes";
function WishlistCard(props) {
  // console.log("props productId id:;-",props.productId._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, response } = useSelector(
    (store) => store.removeWishListReducer
  );
  const loggedUser = getLoggedUserData();

  const handleWishlistRemove = () => {
    const payload = {
      token: loggedUser.token,
      productId: props.productId._id,
    };

    dispatch(RemoveWishListAction(payload));

    //  console.log("payload:-",payload,"props:-",props);
  };
  useEffect(() => {
    if (isError) {
      if (isError) {
        return <h1 style={{ textAlign: "center" }}>Something went wrong</h1>;
      }
    }

    if (response) {
      if (response === "reSuc") {
        toast.success("Product Remove From Wish List Success", {
          autoClose: 2000,
        });
        props.setIsComponentChange((prevState) => !prevState);
        dispatch({ type: REMOVE_WISHLIST_REQUEST_SUCESS, payload: null });
      }
    }
  }, [isError, response, dispatch, props]);

  return (
    <>
      <div className={styles.__child_container} key={props.productId._id}>
        <div
          className={styles.__image__}
          onClick={() => navigate(`/product/single/${props.productId._id}`)}
        >
          <img src={props?.productId?.image} alt={props.productId?.title} />
        </div>
        <p>{props?.productId?.title}</p>
        <div className={styles.__buttons__div}>
          <button>BUY NOW</button>
          <button onClick={handleWishlistRemove}>REMOVE</button>
        </div>
      </div>
    </>
  );
}

export default WishlistCard;
