import React from "react";
import styles from "./wishlist.module.css";
import { useNavigate } from "react-router-dom";
import getLoggedUserData from "../../utils/LoggedUserData";
import { useDispatch } from "react-redux";
import { RemoveWishListAction } from "../../redux/AppReducer/wishlist/actions";
import { toast } from "react-toastify";
function WishlistCard(props) {

  // console.log("propsData:-",props);
  const navigate = useNavigate();
  const loggedUser = getLoggedUserData()
  const token = loggedUser.token
  const dispatch = useDispatch()

  const handleWishlistRemove = async () => {
    const payload = {
      productId: props.productId._id,
      token: token
    };

    try {
      let res = await dispatch(RemoveWishListAction(payload));
      // console.log("res:-", res);

      if (res === undefined) {
        throw new Error("Something went wrong", { autoClose: 2000 })
      }

      if (res && res.hint === "reSuc") {
        localStorage.removeItem(`product_${props.productId._id}`);
        toast.success(res.msg, { autoClose: 2000 })
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };




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
