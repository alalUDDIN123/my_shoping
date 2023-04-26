
import React, { useEffect, useState } from "react";
import React, { useEffect } from "react";

import DocumentTitle from "../Helmet/Helmet";
import { useDispatch, useSelector } from "react-redux"
import { GetWishListAction } from "../../redux/AppReducer/wishlist/actions";
import getLoggedUserData from "../../utils/LoggedUserData";
import Loader from "../loader/Loader";

import styles from './wishlist.module.css'
import EmptyWishlist from "./EmptyWishlist";
import WishlistCard from "./WishlistCard";


function Wishlist() {
  const loggedUser = getLoggedUserData()
  const dispatch = useDispatch()

  const { isError, data, isLoading } = useSelector(
    (store) => store.getWishListReducer
  )
  const [isComponentChange, setIsComponentChange] = useState(false)

  const handleIsComponentChange = () => {
    setIsComponentChange(!isComponentChange)
  }

  useEffect(() => {
    const payload = {
      token: loggedUser.token,
    }
    dispatch(GetWishListAction(payload))
  }, [dispatch, loggedUser.token,isComponentChange])


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


  
  // console.log("isError::-",isError);
  // console.log("data::-",data);
  if (!data || data.length === 0) {
    return <EmptyWishlist />;
  }


  if (isError) {
    if (isError === "Failed to fetch" || isError === "Server error") {
      return <h1 style={{ textAlign: "center" }}>Something went wrong</h1>
    }
  }


  return (
    <>
      <DocumentTitle pageTitle={'| MY WISHLIST'} />
      <div className={styles.__top__}>
        <h2>My Wishlist</h2>

        <p>Click on image to see details</p>
      </div>
      <div className={styles.__parent_container}>
        {data.length > 0 &&
          data.map((el) =>
            el.products.map((product) => (
              <WishlistCard
                key={product._id}
                {...product}
                handleIsComponentChange={handleIsComponentChange}

              />
            ))
          )}
      </div>

    </>
  )
}


export default Wishlist;