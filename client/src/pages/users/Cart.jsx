import React from "react";
import styles from "../../styles/cart.module.css"
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { cartData } from "../../CartData";
import DocumentTitle from "../../components/Helmet";



const Cart = () => {


  return (
   <>
    <DocumentTitle pageTitle="| CART" />
    <section>
      <div className={styles._cart_container}>
        <h2>Shopping Cart</h2>
        <div className={styles._cart_continue}>
          <Link to="/products">&larr; Continue shopping</Link>
        </div>
        {1 === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div className={styles._cart_continue}>
              <Link to="/products">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
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
                {cartData.length === 0 ? "" :
                  cartData.map((el) => (
                    <CartItem key={el._id} {...el} />
                  ))}
              </tbody>
            </table>
            <div className={styles._cart_summary}>
              <button className={styles._cart_clear_cart}>
                Clear Cart
              </button>
              <div className={styles._cart_checkout}>
                <p>
                  Total Items: <strong>{cartData.length}</strong>
                </p>
                <p className={styles._cart_sub_total}>
                  <h4>Subtotal: <span> ₹ 4000</span> </h4>
                
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
