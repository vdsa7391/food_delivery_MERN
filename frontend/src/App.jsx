import React, { createContext, useContext, useState } from 'react'
import Navbar from './components/navbar/navbar.jsx'
import Home from './pages/home/home.jsx'
import Cart from './pages/cartPage/cart.jsx'
import Verify from './pages/verify/verify.jsx'
import MyOrders from './pages/myOrders/myOrders.jsx'
import Checkout from './pages/checkout_page/checkout.jsx'
import Footer from './components/Footer/footer.jsx'
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";
import { Route, Routes, Navigate } from 'react-router-dom'
import '../src/app.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom'




// signup

import Signup from './components/signup/signup.jsx'
import { StoreContext } from './context/StoreContext.jsx'



const App = () => {

  const [showLogin, setShowLogin]= useState(false)
 

  

    const {popup, setPopup} = useContext(StoreContext)

 
  return (
    <>
    <ToastContainer/>
      {showLogin? <Signup setShowLogin={setShowLogin}/> : <></>}
      
      <Navbar setShowLogin={setShowLogin}/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/myOrders' element={<MyOrders/>} />
          {/* <Route path="*" element={<Navigate to="/" />}/> */}

        </Routes>
      </div>
      <Footer/>
      <ScrollToTop smooth style={{backgroundColor:"transparent" , position:"fixed", right:"20px", bottom:"30px", 
        border: " 2px solid grey", width:"40px"}} component={<IoIosArrowUp  style={{backgroundColor:"transparent", color:"grey"}} />}  />
     

    </>
  )
}

export default App