import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/users/Home'
import AdminHome from './pages/admin/Home';
import SuperHome from "./pages/superAdmin/Home"
import Signup from './commom/Signup'
import Login from './commom/Login'
import ForgetPassword from './commom/ForgetPassword'
import ResetPassword from './commom/ResetPassword'
import ChangePassword from './commom/ChangePassword'
import Products from './pages/users/ProductsPage'
import Singleproduct from './pages/users/Singleproduct'
import Cart from './pages/users/Cart'
import Orders from './pages/users/Orders'
import CheckoutPage from './pages/users/CheckoutPage'
import UserProfile from './pages/users/UserProfile'
import PageNotFound from './components/PageNotFound'
import About from './pages/users/About'


function App() {
  return (
    <>

      <Navbar />

      <Routes>

        {/* common route */}

        <Route path="/signup" element={<Signup />} ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/changePassword" element={<ChangePassword />}></Route>
        <Route path="/forgetPassword" element={<ForgetPassword />} ></Route>
        <Route path="/reset_password/token/:token" element={<ResetPassword />} ></Route>



        {/* Users route */}
        <Route path="/" element={<Home />} ></Route>
        <Route path="/products" element={<Products />} ></Route>
        <Route path="/products/:category" element={<Products />} ></Route>
        <Route path="/product/single/:id" element={<Singleproduct />} ></Route>
        <Route path="/cart" element={<Cart />} ></Route>
        <Route path="/wishlist" element={<Cart />} ></Route>
        <Route path="/orders" element={<Orders />} ></Route>
        <Route path="/checkout" element={<CheckoutPage />} ></Route>
        <Route path="/profile" element={<UserProfile />} ></Route>



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
