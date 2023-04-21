import React from "react";
import styles from "../../styles/cart.module.css"

import { FaTrashAlt } from "react-icons/fa";
import { Link} from "react-router-dom";
import {product} from "./SingleObjetData"



const Cart = () => {
 

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {1=== 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
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
                        <p>
                          <b>{product.title}</b>
                        </p>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{product.discountPrice}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                           
                          >
                            -
                          </button>
                          <p>
                            <b>2</b>
                          </p>
                          <button
                            className="--btn"
                            
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{product.discountPrice}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                       
                        />
                      </td>
                    </tr>
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" >
                Clear Cart
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continue shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b>Cart item(s): 1</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>200</h3>
                  </div>
                  <p>Tax an shipping calculated at checkout</p>
                  <button
                    className="--btn --btn-primary --btn-block"
                    
                  >
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
