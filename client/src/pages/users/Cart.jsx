
import React, { useEffect } from "react";
import styles from "../../styles/cart.module.css";
import CartItem from "../../components/CartItem";
import DocumentTitle from "../../components/Helmet";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "../../redux/AppReducer/actions";
import Loader from "../../components/Loader";
import getLoggedUserData from "../../utils/LoggedUserData";
import { Link } from "react-router-dom";


const Cart = () => {
  const loggedUser = getLoggedUserData();
  const { response, isLoading } = useSelector(store => store.getCartDataReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData(loggedUser.token));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  // console.log("cartdata:-", response);

  return (
    <><DocumentTitle pageTitle="| CART" />
      <section>
        <div className={styles._cart_container}>
          <h2>Shopping Cart</h2>
          <div className={styles._cart_continue}>
            <Link to="/products">&larr; Continue shopping</Link>
          </div>
          {response?.cartItems?.length === 0 ? (
            <>
              <p>Your cart is currently empty.</p>
              <br />
              <div className={styles._cart_continue}>
                <Link to="/products">&larr; Continue shopping</Link>
              </div>
            </>
          ) : response?.cartItems && (
            <>
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Product</th>
                    <th>Id</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {response?.cartItems?.map((item, ind) => (
                    <CartItem key={item.product._id} {...item.product} ind={ind} />
                  ))}
                </tbody>
              </table>
              <div className={styles._cart_summary}>
                <button className={styles._cart_clear_cart}>Clear Cart</button>
                <div className={styles._cart_checkout}>
                  <p>
                    Total Items: <strong>{response?.cartItems?.length}</strong>
                  </p>
                  <p className={styles._cart_sub_total}>
                    <h4>
                      Subtotal: <span> ₹ {response?.totalPrice}</span>
                    </h4>
                  </p>
                  <p>Tax will be calculated at order time</p>
                  <button className={styles._cart_checkout_btn}>
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

    </>
  );
};

export default Cart;
