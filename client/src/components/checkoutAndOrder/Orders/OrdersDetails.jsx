import React, { useEffect } from 'react'
import DocumentTitle from '../../Helmet/Helmet'
import styles from "./orderDetails.module.css"
import data from "./SingleObjData.json"
import getLoggedUserData from '../../../utils/LoggedUserData'
import { AiOutlineDownload } from "react-icons/ai"


function OrdersDetails() {
  const LoggedUser = getLoggedUserData()


    // getting complete url from browser
  const fullUrl = window.location.href;

  // split the url string by the "/" character
  const urlParts = fullUrl.split("/");

  // find the index of the "orderId" and "productId" strings
  const orderIdIndex = urlParts.indexOf("orderId") + 1;
  const productIdIndex = urlParts.indexOf("productId") + 1;

  // extract the orderId and productId from the url
  const orderId = urlParts[orderIdIndex];
  const productId = urlParts[productIdIndex];

  const fetchSingleOrderData=async(payload)=>{
    let res= await fetch(`http://localhost:8080/api/order/get/singleOrder`,{
      body:JSON.stringify({
        orderId:payload.orderId,
        productId:payload.productId
      }),
      headers:{
        'Content-Type':"application/json",
        token:payload.token
      }
    });

    let data= await res.json();

    console.log("data:",data);
  }

  useEffect(() => {
    const payload = {
      token: LoggedUser.token,
      orderId,
      productId
    }

    fetchSingleOrderData(payload)

  }, [LoggedUser.token, orderId, productId])



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
