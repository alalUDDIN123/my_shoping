import React from "react";
import "./userSideBar.css";
import getLoggedUserData from "../utils/LoggedUserData";

const ProfileDetails = () => {
  const handleEditSubmit = (event) => {
    event.preventDefault();

    console.log("form");
  };

  const LoggedUser = getLoggedUserData();

  return (
    <div>
      {/* profile avtar  */}
      <div className="profile_avtar">
        <div className="img_profile_div">
          <img className="user_profile_img" src={LoggedUser.avator} alt="" />
        </div>
      </div>

      {/* profile details  */}

      <form
        action=""
        className="user_profile_form_details"
        onSubmit={handleEditSubmit}
      >
        <label htmlFor="">Name</label>
        <input type="text" name="name" />

        <label htmlFor="">Email</label>
        <input type="email" name="email" />

        <label htmlFor="">Mobile</label>
        <input type="number" name="mobile" />

        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default ProfileDetails;
