import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsBagCheck } from "react-icons/bs";
import { SiAdminer, SiMicrosoftaccess } from "react-icons/si";
import { GrList } from "react-icons/gr";
import styles from "../styles/navbar.module.css";
import { useMediaQuery } from "react-responsive";
import SearchInput from "./SearchInput";

function Navbar({ isLoggedIn = true, cartItemsCount = 2 }) {
  const role = "superAdmin"
  const loggedUser=["https://ravi-047.github.io/static/media/profile_ravi.7217ccd7c4968d31c2c2.png","Alal"]
  const [showRightSide, setShowRightSide] = useState(false);
  const navigate = useNavigate();

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

  const onLogout = () => { };

  return (
    <>
      <Desktop>
        {/* for default */}
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <h1 onClick={() => navigate("/")}>myShopping</h1>
          </div>
          <div className={styles.search}>
            <SearchInput />
          </div>
          <div className={styles._rightSide}>
            {isLoggedIn ? (
              <>
                <button onClick={() => navigate("/about")} style={{ fontSize: "20px" }} >About Us</button>
                <button onClick={onLogout} style={{ fontSize: "20px" }} >Logout</button>
                <div className={styles.more}>
                  {/* <CgMenuRound style={{
                    fontSize: "35px",
                    color: "#fca311"
                  }} /> */} 

                  <img src={loggedUser[0]} alt={[loggedUser[1]]} style={{
                    borderRadius:"50px",
                    width:"40px",
                    height:"40px"
                  }} />
                  <div className={styles.dropdown}>
                  <Link to="/profile">
                    <ImProfile style={{ marginRight: "10px", color: "white" }} />
                    My Profile
                  </Link>
                  <Link to="/orders">
                    <GrList style={{ marginRight: "10px", color: "white" }} />
                    Wishlist
                  </Link>
                  <Link to="/orders">
                    <BsBagCheck style={{ marginRight: "10px", color: "white" }} />
                    Orders
                  </Link>
                  {role === "admin" ? (
                    <Link to="/admin">
                      <SiAdminer style={{ marginRight: "10px", color: "white" }} />
                      Admin
                    </Link>
                  ) : role === "user" ? (
                    null
                  ) : (
                    <Link to="/super-admin">
                      <SiMicrosoftaccess style={{ marginRight: "10px", color: "white" }} />
                      SuperAdmin
                    </Link>
                  )}
                </div>

                </div>
                

                <div className={styles.cartIcon}>
                  <Link to="/cart">
                    <AiOutlineShoppingCart fontSize={"30px"} />
                    {cartItemsCount > 0 && <span>{cartItemsCount}</span>}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/about")}>About Us</button>
                <button onClick={() => navigate("/login")}>Signin</button>
                <button onClick={() => navigate("/signup")}>Signup</button>

              </>
            )}
          </div>
        </nav>
      </Desktop>

      {/* for tablet screen */}

      <Tablet>
        <nav className={styles._tablet_navbar}>
          <div className={styles._tablet_logo}>
            <h1 onClick={() => navigate("/")}>myShopping</h1>
          </div>
          <div className={styles._tablet_search}>
            <SearchInput />
          </div>

          <div
            className={`${styles._tablet_rightSide} ${showRightSide ? "showRightSide" : ""
              }`}
          >
            <div
              className={styles.hamburgerIcon}
              onClick={() => setShowRightSide(!showRightSide)}
            >
              {showRightSide ? <AiOutlineClose /> : <AiOutlineMenu />}
            </div>
            {showRightSide && (
              <div className={styles._tablet_rightSidebar}>
                {isLoggedIn ? (
                  <>
                    <ul>
                      <li>
                        <a href="/profile">
                          <ImProfile style={{ marginRight: "10px" }} />
                          Profile
                        </a>
                      </li>
                      <li>
                        <a href="/profile">
                          <GrList style={{ marginRight: "10px" }} />
                          Wishlist
                        </a>
                      </li>
                      <li>
                        <a href="/profile">
                          <AiOutlineShoppingCart
                            style={{ marginRight: "10px", fontSize: "25px" }}
                          />
                          {cartItemsCount > 0 && <span>{cartItemsCount}</span>}
                        </a>
                      </li>
                      <li>
                        <a href="/profile">
                          <BsBagCheck style={{ marginRight: "10px" }} />
                          Orders
                        </a>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul>
                      <li>
                        <a href="/signup">Signup</a>
                      </li>
                      <li>
                        <a href="/login">Login</a>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </Tablet>

      {/* for mobile */}

      <Mobile>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <h1 onClick={() => navigate("/")}>
              my<span>Shopping</span>
            </h1>
          </div>

          <div
            className={`${styles._tablet_rightSide} ${showRightSide ? "showRightSide" : ""
              }`}
          >
            <div
              className={styles.hamburgerIcon}
              onClick={() => setShowRightSide(!showRightSide)}
            >
              {showRightSide ? <AiOutlineClose /> : <AiOutlineMenu />}
            </div>
            {showRightSide && (
              <div className={styles._tablet_rightSidebar}>
                {isLoggedIn ? (
                  <>
                    <ul>
                      <li>
                        <a href="/profile">
                          <ImProfile style={{ marginRight: "10px" }} />
                          Profile
                        </a>
                      </li>
                      <li>
                        <a href="/profile">
                          <GrList style={{ marginRight: "10px" }} />
                          Wishlist
                        </a>
                      </li>
                      <li>
                        <a href="/profile">
                          <AiOutlineShoppingCart
                            style={{ marginRight: "10px", fontSize: "25px" }}
                          />
                          {cartItemsCount > 0 && <span>{cartItemsCount}</span>}
                        </a>
                      </li>
                      <li>
                        <a href="/profile">
                          <BsBagCheck style={{ marginRight: "10px" }} />
                          Orders
                        </a>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul>
                      <li>
                        <a href="/signup">Signup</a>
                      </li>
                      <li>
                        <a href="/login">Login</a>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </Mobile>
    </>
  );
}

export default Navbar;
