import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from "./components/Footer/Footer"
import AdminHome from "./admin/Home"
import SuperHome from "./superAdmin/Home"
import PageNotFound from './components/pageNotfound/PageNotFound'
import ReqAuth from './components/authentication/ReqAuth'
import ForgetPassword from './components/authentication/ForgetPassword'
import ResetPassword from "./components/authentication/ResetPassword"
import ChangePassword from './components/authentication/ChangePassword'
import ProductsPage from './components/products/ProductsPage';
import Singleproduct from './components/products/Singleproduct';
import Home from './home/Home';
import UserProfile from './userProfile/UserProfile';
import Wishlist from './components/products/Wishlist';
import CheckoutPage from './components/checkoutAndOrder/CheckoutPage';
import Orders from './components/checkoutAndOrder/Orders';
import Login from './components/authentication/Login';
import Cart from "./components/cart/Cart"
import Signup from './components/authentication/Signup';
import Navbar from './components/navbar/Navbar';
import About from './About/About'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>

      <Navbar />

      <ToastContainer />

      <Routes>

        {/* common route */}
        <Route path="/cart" element={<ReqAuth><Cart /></ReqAuth>} ></Route>
        <Route path="/signup" element={<Signup />} ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/changePassword" element={<ChangePassword />}></Route>
        <Route path="/forgetPassword" element={<ForgetPassword />} ></Route>
        <Route path="/reset_password/token/:token" element={<ResetPassword />} ></Route>



        {/* Users route */}
        <Route path="/" element={<Home />} ></Route>
        <Route path="/products" element={<ProductsPage />} ></Route>
        <Route path="/product/single/:id" element={<Singleproduct />} ></Route>
        <Route path="/cart" element={<ReqAuth><Cart /></ReqAuth>} ></Route>
        <Route path="/wishlist" element={<ReqAuth><Wishlist /></ReqAuth>} ></Route>
        <Route path="/orders" element={<ReqAuth><Orders /></ReqAuth>} ></Route>
        <Route path="/profile" element={<ReqAuth><UserProfile /></ReqAuth>} ></Route>
        <Route path="/checkout" element={<ReqAuth><CheckoutPage /></ReqAuth>} ></Route>

        {/* Admin Route */}
        <Route path='/admin' element={<AdminHome />}></Route>



        {/* Super Admin Route */}
        <Route path="/superAdmin" element={<SuperHome />} ></Route>


        {/* Not found route */}

        <Route path="*" element={<PageNotFound />} ></Route>


      </Routes>

      <Footer />
    </>
  )
}

export default App
