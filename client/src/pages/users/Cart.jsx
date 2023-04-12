import React from "react";
import styles from "../../styles/cart.module.css"

import { FaTrashAlt } from "react-icons/fa";
import { Link} from "react-router-dom";
import {product} from "./SingleObjetData"



const Cart = () => {
 

  return (
    <section>
      <div className={styles._cart_container}>
        <h2>Shopping Cart</h2>
        {1=== 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
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
              <tr key={product._id}>
                      <td>1</td>
                      <td>
                        
                        <img
                          src={product.image}
                          alt={product.title}
                        
                        />
                      </td>

                      <td>{product._id}</td>
                      <td>{product.discountPrice}</td>
                      <td>
                        <div className={styles._cart_inc_dec_qty}>
                          <button
                           className={styles._cart_inc_dec_btn}
                           
                          >
                            -
                          </button>
                          <p>
                            <b>2</b>
                          </p>
                          <button
                           className={styles._cart_inc_dec_btn}
                            
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{product.discountPrice}</td>
                      <td className={styles._cart_remove_item}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                       
                        />
                      </td>
                    </tr>
              </tbody>
            </table>
            <div className={styles._cart_summary}>
              <button className={styles._cart_clear_cart} >
                Clear Cart
              </button>
              <div className={styles._cart_checkout}>
                <div>
                  <Link to="/products">&larr; Continue shopping</Link>
                </div>
                <br />
                <div cardClass={styles._cart_checkout_div}>
                  <p>
                    <b>Cart item(s): 1</b>
                  </p>
                  <div className={styles._cart_sub_total}>
                    <h4>Subtotal:</h4>
                    <h3>200</h3>
                  </div>
                  <p>Tax an shipping calculated at checkout</p>
                  <button
                    className={styles._cart_checkout_btn}
                    
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
