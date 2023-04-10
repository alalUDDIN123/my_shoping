import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsBagCheck } from "react-icons/bs";
import { GrList } from "react-icons/gr";

import styles from "../styles/navbar.module.css";
import { useMediaQuery } from "react-responsive";
import SearchInput from "./SearchInput";

function Navbar({ isLoggedIn = true, cartItemsCount = 2 }) {
  // const [showMenu, setShowMenu] = useState(false);
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

  const onLogout = () => {};

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
                <button onClick={onLogout}>Admin</button>
                <button onClick={onLogout}>Logout</button>
                <div className={styles.more}>
                  <button>More...</button>
                  <div className={styles.dropdown}>
                    <Link to="/profile">
                      <ImProfile
                        style={{ marginRight: "10px", color: "white" }}
                      />
                      Profile
                    </Link>
                    <Link to="/orders">
                      <GrList style={{ marginRight: "10px", color: "white" }} />
                      Wishlist
                    </Link>
                    <Link to="/orders">
                      <BsBagCheck
                        style={{ marginRight: "10px", color: "white" }}
                      />
                      Orders
                    </Link>
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
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
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
            className={`${styles._tablet_rightSide} ${
              showRightSide ? "showRightSide" : ""
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
            className={`${styles._tablet_rightSide} ${
              showRightSide ? "showRightSide" : ""
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
