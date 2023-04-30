import React from 'react'
import DocumentTitle from '../../Helmet/Helmet'
import styles from "./orderDetails.module.css"
import data from "./SingleObjData.json"
import getLoggedUserData from '../../../utils/LoggedUserData'
import { AiOutlineDownload } from "react-icons/ai"


function OrdersDetails() {
  const LoggedUser = getLoggedUserData()



  const handleDownload = () => {
    alert("Download feature will be added")
  }
  return (
    <>
      <DocumentTitle pageTitle={"| ORDERS | DETAILS"} />

      <div className={styles.__orderDetails__info} >
        <div className={styles.__orderDetails__info_deliveryAddress} >
          <p>Delivery Address</p>
          <p>State: {data.deliveryAddress.state} </p>
          <p>District : {data.deliveryAddress.city} </p>
          <p>Block : {data.deliveryAddress.block}</p>
          <p>Postal Code : {data.deliveryAddress.postalCode}</p>
        </div>

        <div className={styles.__orderDetails_user_info} >
          <p>Your Info</p>
          <p>Name : {LoggedUser.name}</p>
          <p>Email : alal@gmail.com</p>
          <p>Phone : +91 60437574357</p>
        </div>

        <div className={styles.__orderDetails__info_download_invoice} >
          <p>Download Order Invoice</p>
          <button onClick={handleDownload}>Download <AiOutlineDownload /> </button>
        </div>
      </div>

      <div className={styles.__orderDetails__Order_info} >
        <div >
          <img src={data.products[0].productId.image} alt={data.products[0].productId.title} />
          <p>{data.products[0].productId.title}</p>
        </div>
        <div>
          <p>Payment method : {data.paymentMethod}</p>
          <p>Order Status : {data.orderStatus}</p>
          <p>Price : {data.products[0].productId.discountPrice}</p>
        </div>
        <div>
          <p>Seller: Mr. Ravi Shop </p>
          <p>Rate and review</p>
        </div>
      </div>

      <div className={styles.__orderDetails__info_download_invoice_mobile} >
          <p>Download Order Invoice</p>
          <button onClick={handleDownload}>Download <AiOutlineDownload /> </button>
        </div>

    </>
  )
}

export default OrdersDetails
