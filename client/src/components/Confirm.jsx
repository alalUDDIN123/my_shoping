import React, { useEffect } from "react";
import styles from "../styles/confirm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadPaymentOption } from "../utils/PaymentOption";
import { AddOrderAction, getCartData } from "../redux/AppReducer/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import getLoggedUserData from "../utils/LoggedUserData";

function Confirm() {
  const logedUser = getLoggedUserData();
  let paymentOption = loadPaymentOption();
  const dispatch = useDispatch();
  const { response } = useSelector((store) => store.getCartDataReducer);
  const { deliveryAddress } = useSelector((state) => state.AddressReducer);
  const deliveryAddressId =
    localStorage.getItem("deliveryAddressId").replace(/"/g, "") || "";

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  const requestBody = {
    products: response.cartItems.map((item) => ({
      productId: item.product._id,
    })),
    paymentMethod: paymentOption,
    deliveryAddressId: deliveryAddressId,
    token: logedUser.token,
  };
  // console.log("response", response);
  // console.log("requestBody for order::-", requestBody);

  const handleConfirmOrder = async () => {
    try {
      let res = await dispatch(AddOrderAction(requestBody));

      if (res === undefined) {
        toast.error("Something went wrong");
      }

      if (res && res.hint === "orSucc") {
        toast.success(res.message);

        setTimeout(() => {
          navigate("/orders");
        }, 2000);
      }
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.__checkout__confirm_}>
        <p>Confirm your order</p>
        <table>
          <tbody>
            <tr>
              <th>Delivery Address :</th>
              <td>State :</td>
              <td>
                <span>{deliveryAddress.state}</span>
              </td>
            </tr>
            <tr>
              <th></th>
              <td>Dist:</td>
              <td>
                <span>{deliveryAddress.city}</span>
              </td>
            </tr>
            <tr>
              <th></th>
              <td>Block:</td>
              <td>
                <span>{deliveryAddress.block}</span>
              </td>
            </tr>
            <tr>
              <th></th>
              <td>Vill:</td>
              <td>
                <span>{deliveryAddress.address}</span>
              </td>
            </tr>

            <tr>
              <th>Payment Method :</th>
              <td></td>
              <td>
                <span>
                  {paymentOption
                    .replace(/([A-Z])/g, " $1")
                    .toLowerCase()
                    .replace(/^\w|\s\w/g, (c) => c.toUpperCase())}
                </span>
              </td>
            </tr>
            <tr>
              <th>Total Amount :</th>
              <td></td>
              <td>
                <span>₹ {response && response?.totalPrice + 45}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
    </>
  );
}

export default Confirm;
