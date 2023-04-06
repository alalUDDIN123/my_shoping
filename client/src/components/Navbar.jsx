import { useState } from "react";
import { Link } from "react-router-dom";

// React Icons
import { FaBars, FaTimes, FaHeart, FaUserAlt } from "react-icons/fa";
import { AiFillHome, AiFillPhone } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
import { BsInfoCircleFill } from "react-icons/bs";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClicked = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div>
        <Link to="/">
          <p>MY</p>
          <p>
            <span>SHOPPING</span>
          </p>
        </Link>
      </div>

      {/* ALL ROUTES */}
      <div id="nav" className={clicked ? "#nav active" : "#nav"}>
        {/* Home */}
        <Link to="/" className="active">
          <AiFillHome />
          HOME
        </Link>

        {/* About Us */}
        <Link to="/about-us">
          <BsInfoCircleFill />
          ABOUT US
        </Link>

        {/* Contact Us */}
        <Link to="/contact-us">
          <AiFillPhone />
          CONTACT US
        </Link>

        {/* Wishlist */}

        <Link to="/wishlist">
          <FaHeart />
          WISHLIST
        </Link>

        {/* Cart */}

        <Link to="/cart">
          <IoMdCart />
          CART
        </Link>

        {/* User Profile */}

        <Link to="/profile">
          <FaUserAlt />
          PROFILE
        </Link>
      </div>

      {/* For Mobile Screen */}
      <div>
        <span onClick={handleClicked}>
          {clicked ? <FaTimes /> : <FaBars />}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
