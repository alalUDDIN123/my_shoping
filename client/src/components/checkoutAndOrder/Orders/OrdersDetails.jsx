import React, { useEffect, useState } from "react";
import DocumentTitle from "../../Helmet/Helmet";
import styles from "./orderDetails.module.css";
import getLoggedUserData from "../../../utils/LoggedUserData";
import { AiOutlineDownload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleOrderAction } from "../../../redux/AppReducer/orders/actions";
import Loader from "../../loader/Loader";

function OrdersDetails() {
  const LoggedUser = getLoggedUserData();
  const dispatch = useDispatch();
  const storeData = useSelector((store) => store.GetSingleOrderReducer);
  const [userDetails, setUserDetails] = useState({});
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

  const getUserDetails = async (userToken) => {
    let res = await fetch("http://localhost:8080/api/users/get/user", {
      headers: {
        "Content-Type": "application/json",
        token: userToken,
      },
    });

    const data = await res.json();
    // console.log("user data:",data);
    if (data?.user?._id) {
      setUserDetails(data?.user);
    }
  };
  useEffect(() => {
    const payload = {
      token: LoggedUser.token,
      orderId,
      productId,
    };

    dispatch(GetSingleOrderAction(payload));
    getUserDetails(payload.token);
  }, [LoggedUser.token, orderId, productId, dispatch]);

  // console.log("storedata from component:-", storeData);

  if (storeData?.isLoading) {
    return <Loader />;
  }
  if (storeData?.isError === undefined) {
    return (
      <h1 style={{ textAlign: "center" }}>
        Probably, You haven't ordered anything. Please contact us
      </h1>
    );
  }

  const handleDownload = () => {
    alert("Download feature will be added");
  };
  return (
    <>
      <DocumentTitle pageTitle={"| ORDERS | DETAILS"} />

      <div className={styles.__orderDetails__info}>
        <div className={styles.__orderDetails__info_deliveryAddress}>
          <p>Delivery Address</p>
          <p>State: {storeData?.deliveryAddress?.state} </p>
          <p>District : {storeData?.deliveryAddress?.city} </p>
          <p>Block : {storeData?.deliveryAddress?.block}</p>
          <p>Postal Code : {storeData?.deliveryAddress?.postalCode}</p>
        </div>

        <div className={styles.__orderDetails_user_info}>
          <p>Your Info</p>
          <p>Name : {LoggedUser.name}</p>
          <p>Email : {userDetails.email}</p>
          <p>Phone : +91 {userDetails.mobile}</p>
        </div>

        <div className={styles.__orderDetails__info_download_invoice}>
          <p>Download Order Invoice</p>
          <button onClick={handleDownload}>
            Download <AiOutlineDownload />{" "}
          </button>
        </div>
      </div>

      <div className={styles.__orderDetails__Order_info}>
        <div>
          <img src={storeData?.order.image} alt={storeData?.order.title} />
          <p>{storeData?.order.title}</p>
        </div>
        <div>
          <p>Payment method : {storeData?.payMethod}</p>
          <p>Order Status : {storeData?.status}</p>
          <p>Price : ₹ {storeData?.order.discountPrice}</p>
        </div>
        <div>
          <p>Seller: Mr. Ravi Shop </p>
          <p>Rate and review</p>
        </div>
      </div>

      <div className={styles.__orderDetails__info_download_invoice_mobile}>
        <p>Download Order Invoice</p>
        <button onClick={handleDownload}>
          Download <AiOutlineDownload />{" "}
        </button>
      </div>
    </>
  );
}

export default OrdersDetails;
