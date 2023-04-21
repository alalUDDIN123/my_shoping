import React, { useState } from "react";
import DocumentTitle from "../../components/Helmet";
import "../../styles/userSideBar.css";

// importing icon
import { CgProfile } from "react-icons/cg";
import { AiFillShopping, AiFillHeart } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import ProfileDetails from "../../components/ProfileDetails";
import ResetPassword from "../../commom/ResetPassword";

function UserProfile() {
  const [active, setActive] = useState("profile");

  const renderComponent = () => {
    switch (active) {
      case "profile": {
        return <ProfileDetails />;
      }

      case "Password": {
        return <ResetPassword />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <>
      <DocumentTitle pageTitle="| MY PROFILE" />
      {/* sidebar  */}
      <div style={{ display: "flex" }}>
        <div className="user_sidebar_main">
          <h1>Hi, Ravi</h1>
          <div
            className={active === "profile" ? "active" : ""}
            onClick={() => setActive("profile")}
          >
            <CgProfile className="user__icon__size" /> Profile
          </div>
          <div
            className={active === "order" ? "active" : ""}
            onClick={() => setActive("order")}
          >
            <AiFillShopping className="user__icon__size" />
            Order
          </div>
          <div
            className={active === "Whishlist" ? "active" : ""}
            onClick={() => setActive("Whishlist")}
          >
            <AiFillHeart className="user__icon__size" />
            Whishlist
          </div>
          <div
            className={active === "Password" ? "active" : ""}
            onClick={() => setActive("Password")}
          >
            <RiLockPasswordFill className="user__icon__size" />
            Change Password
          </div>
          <div
            className={active === "Log" ? "active" : ""}
            onClick={() => setActive("Log")}
          >
            <FiLogOut className="user__icon__size" />
            Log Out
          </div>
        </div>
        <div className="each_user_component">{renderComponent()}</div>
      </div>
    </>
  );
}

export default UserProfile;
