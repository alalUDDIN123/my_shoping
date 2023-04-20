import React from 'react'
import styles from "../styles/confirm.module.css"
function Confirm() {
  return (
    <>
      
      <div className={styles.__checkout__confirm_}>
                <h2>Confirm your order</h2>
                <table>
                    <tr>
                        <th>Delivery Address : </th>
                        <td>State :</td>
                        <td><span>Assam</span></td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>Dist:</td>
                        <td><span>Morigaon</span></td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>Block:</td>
                        <td><span>Lahright</span></td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>Vill/Pin:</td>
                        <td><span>Kacharibory</span></td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>Phone:</td>
                        <td><span>+91 475475454</span></td>
                    </tr>
                    <tr>
                        <th>Payment Method : </th>
                        <td></td>
                        <td><span>Cashon</span></td>
                    </tr>
                    <tr>
                        <th>Total Amount : </th>
                        <td></td>
                        <td><span>60000</span></td>
                    </tr>
                </table>
                <button>Confirm Order</button>
            </div>
    </>
  )
}

export default Confirm
