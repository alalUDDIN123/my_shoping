import React, { useEffect } from "react";
import DocumentTitle from "../../Helmet/Helmet";
import styles from "./orders.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetOrderAction } from "../../../redux/AppReducer/orders/actions";
import getLoggedUserData from "../../../utils/LoggedUserData";
import Loader from "../../loader/Loader";
import ExpiredToken from "../../authentication/ExpiredToken";
function Orders() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const LoggedUser = getLoggedUserData()
  const {isLoading,isError,orders,status,orderId } = useSelector(store => store.OrdersReducer)


  // console.log(status);

  useEffect(() => {
    dispatch(GetOrderAction({ token: LoggedUser.token }));
  }, [dispatch, LoggedUser.token]);

  if (isLoading) {
    return <Loader />;
  }

  if(isError){
   if(isError.message==="Token expired"){
    return <ExpiredToken loginMess={"Login"} />
   }
  }
 

// console.log("orderId:",orderId[0]);

  return (
    <>
      <DocumentTitle pageTitle={"| MY ORDERS"} />

      <div className={styles.__orders__header}>
        <h2>My Orders</h2>
        <p>Click on orderId to see details of the order </p>
      </div>

      <table className={styles.__orders__table}>
        <thead>
          <tr>
            <th>S/n</th>
            <th>Product</th>
            <th>OrderID</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className={styles.__orders_table__body}>
          {orders?.map((el, index) => (
            <tr key={el._id}>
              <td>{index + 1}</td>
              <td>
                {" "}
                <img src={el.productId.image} alt={el._id} />{" "}
              </td>
              <td onClick={() => navigate(`/orders/details/${el._id}`)}>
                <p className={styles.__order__id__res}>{el._id}</p>
              </td>
              <td> <img src={el.productId.image} alt={el._id} /> </td>
              <td onClick={() => navigate(`/orders/details/orderId/${orderId[index]}/productId/${el.productId._id}`)} >{orderId[index]}</td>
              <td>₹ {el.productId.discountPrice} </td>
              <td> {status[index]} </td>
              <td>
                {" "}
                <FaTrashAlt size={19} color="red" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Orders;
