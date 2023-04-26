import React, { useEffect } from "react";
import DocumentTitle from "../Helmet/Helmet";
import { useDispatch, useSelector } from "react-redux"
import { GetWishListAction } from "../../redux/AppReducer/wishlist/actions";
import getLoggedUserData from "../../utils/LoggedUserData";
import Loader from "../loader/Loader";

function Wishlist() {
  const loggedUser = getLoggedUserData()
  const dispatch = useDispatch()
  const { isError, data, isLoading } = useSelector(store => store.getWishListReducer)

  useEffect(() => {
    const payload = {
      token: loggedUser.token
    }
    dispatch(GetWishListAction(payload))
  }, [dispatch, loggedUser.token])


  if (isLoading) {
    return <Loader />
  }

  if(isError){
    console.log("iserror::-",isError);
  }

  if(data){
    console.log("data:-",data);
  }

  return (
    <>
      <DocumentTitle pageTitle={"| MY WISHLIST"} />

    </>
  );
}

export default Wishlist;
