import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from "./components/navbar/navbar.jsx"
import Sidebar from "./components/sidebar/sidebar.jsx"
import AddPage from "./pages/addPage/addPage.jsx"
import ListItem from "./pages/List_items/listItems.jsx"

import OrderPage from "./pages/Orders/order.jsx"


//toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const App = () => {

  const url = "https://food-delivery-mern-y99l.onrender.com";
  
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <hr/>
    <div className="main">
      <Sidebar/>
      <Routes>
        <Route path='/add' element={<AddPage url={url} />} />
        <Route path='/list' element={<ListItem  url={url}/>} />
        <Route path='/' element={<OrderPage  url={url}/>} />
      </Routes>

    </div>
    </>
  )
}

export default App
