import React, { useEffect, useState } from "react";
import DocumentTitle from "../../Helmet/Helmet";
import styles from "./orderDetails.module.css";
import getLoggedUserData from "../../../utils/LoggedUserData";
import { AiOutlineDownload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSingleOrderAction,
  deleteOrderAtion,
} from "../../../redux/AppReducer/orders/actions";
import Loader from "../../loader/Loader";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import NoOrderFound from "./NoOrderFound";

function OrdersDetails() {
  const LoggedUser = getLoggedUserData();
  const [timer, setTimer] = useState(true);
  const dispatch = useDispatch();
  const storeData = useSelector((store) => store.GetSingleOrderReducer);
  const [userDetails, setUserDetails] = useState({});
  // getting complete url from browser
  const fullUrl = window.location.href;

  // split the url string by the "/" character
  const urlParts = fullUrl.split("/");

  // find the index of the "orderId" and "productId" strings
  const orderIdIndex = urlParts.indexOf("orderId") + 1;

  // extract the orderId and productId from the url
  const orderId = urlParts[orderIdIndex];

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
    };

    dispatch(GetSingleOrderAction(payload));
    getUserDetails(payload.token);
  }, [LoggedUser.token, orderId, dispatch]);

  // console.log("storedata from component:-", storeData);
  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 2000);
  }, []);

  if (timer) {
    return <Loader />;
  }
  if (
    storeData?.order?.message === "Order not found" ||
    storeData?.isError === undefined
  ) {
    return <NoOrderFound />;
  }

  const handleDownload = () => {
    alert("Download feature will be added");
  };

  /// handle delete order

  const handleOrderDelete = async (id) => {
    const payload = {
      orderId: orderId,
      productId: id,
      token: LoggedUser.token,
    };

    try {
      let responseFromBackend = await dispatch(deleteOrderAtion(payload));
      console.log(responseFromBackend, "response from backend");
      if (responseFromBackend === undefined) {
        throw new Error("Something went wrong");
      }

      if (responseFromBackend && responseFromBackend.hint === "orderRemoved") {
        toast.success(responseFromBackend.message, { autoClose: 1500 });
      } else if (responseFromBackend.hint === "productRe") {
        toast.success(responseFromBackend.message, { autoClose: 1500 });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 1500 });
    }
  };
  return (
    <>
      <DocumentTitle pageTitle={"| ORDERS | DETAILS"} />

      <div className={styles.__orderDetails__info}>
        <div className={styles.__orderDetails__info_deliveryAddress}>
          <p>Delivery Address</p>
          <p>State: {storeData?.order?.deliveryAddress?.state} </p>
          <p>District : {storeData?.order?.deliveryAddress?.city} </p>
          <p>Block : {storeData?.order?.deliveryAddress?.block}</p>
          <p>Postal Code : {storeData?.order?.deliveryAddress?.postalCode}</p>
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
        {storeData?.order?.products &&
          storeData.order.products.map((el, index) => (
            <div
              className={styles.__orderDetails__Order_Info_main_container}
              key={index}
            >
              <div>
                <img src={el.productId.image} alt={el.productId.title} />
                <p>{el.productId.title}</p>
              </div>

              <div>
                <p>Payment method : {storeData?.order?.paymentMethod}</p>
                <p>Order Status : {storeData?.order?.orderStatus}</p>
                <p>Price : ₹ {el.productId.discountPrice}</p>
              </div>

              <div>
                <FaTrashAlt
                  onClick={() => handleOrderDelete(el.productId._id)}
                />
              </div>
              <div>
                <p>Seller: Mr. Ravi Shop </p>
                <p>Rate and review</p>
              </div>
            </div>
          ))}
      </div>


      {/* <div className={styles.__orderDetails__info_download_invoice_mobile}>
        <p>Download Order Invoice</p>
        <button onClick={handleDownload}>
          Download <AiOutlineDownload />{" "}
        </button>
      </div> */}
    </>
  );
}

export default OrdersDetails;
