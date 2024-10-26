import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import {NavLink} from 'react-router-dom'
import "./sidebar.css"


const sidebar = () => {
  return (
    <div className="sidebar">
        < div className="sidebar_links">
        
            <NavLink to="/add"  className="link"><IoAddCircleOutline /> Add Item</NavLink>
        
        
            <NavLink to="/list" className="link"><FaRegCheckCircle /> List Items</NavLink>
        
        
            <NavLink to="/" className="link"><FaRegCheckCircle /> Orders</NavLink>
        
        </div>

    </div>
    
    
    
  )
}

export default sidebar