import React, { useState } from 'react'
import styles from "./styles/home.module.css"
import { AiOutlineLogin, AiOutlineStock, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { BiMessageAltDots } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { BsBoxFill } from "react-icons/bs";
import Dashboard from './Dashboard';
import Products from './Products';
import Stock from './Stock';
import Message from './Message';
import Setting from './Setting';


function Home() {
  const [activeComponent, setActiveComponent] = useState("dashboard")

  const showActiveComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />

      case "products":
        return <Products />

      case "stock":
        return <Stock />

      case "message":
        return <Message />

      case "setting":
        return <Setting />

      default: return null;
    }
  }


  return (
    <>
      <div className={styles.__admin__home} >

        {/* sidebar */}
        <div className={styles.__admin__sidebar}>
          <div className={styles.__admin__logoDetails}>
            <div className={styles.__admin_head} >
              <AiOutlineUser />
              <span className={styles.__admin__logoName}>Alal Uddin</span>
            </div>
          </div>
          <ul className={styles.__admin__navLinks}>

            <div className={styles.__admin_tab_link} >
              <div className={activeComponent === "dashboard" ? "activeTab" : ""} >
                <li onClick={() => setActiveComponent("dashboard")} >
                  <RxDashboard />
                  <span className={styles.__admin__linksName}>Dashboard</span>
                </li>
              </div>

              <div className={activeComponent === "products" ? "activeTab" : ""}>
                <li onClick={() => setActiveComponent("products")} >
                  <BsBoxFill />
                  <span className={styles.__admin__linksName}>Product</span>
                </li>
              </div>

              <div className={activeComponent === "stock" ? "activeTab" : ""}>
                <li onClick={() => setActiveComponent("stock")} >
                  <AiOutlineStock />
                  <span className={styles.__admin__linksName}>Stock</span>
                </li>
              </div>

              <div className={activeComponent === "message" ? "activeTab" : ""}>
                <li onClick={() => setActiveComponent("message")} >
                  <BiMessageAltDots />
                  <span className={styles.__admin__linksName}>Messages</span>
                </li>
              </div>

              <div className={activeComponent === "setting" ? "activeTab" : ""}>
                <li onClick={() => setActiveComponent("setting")} >
                  <AiOutlineSetting />
                  <span className={styles.__admin__linksName}>Setting</span>
                </li>
              </div>

              <div>
                <li className={styles.__admin__logOut}>
                  <AiOutlineLogin />
                  <span className={styles.__admin__linksName}>Log out</span>
                </li>

              </div>
            </div>

          </ul>
        </div>

        {/* main content */}
        <div>
          {showActiveComponent()}
        </div>
      </div>
    </>
  )
}

export default Home
