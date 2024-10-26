import React, { useContext } from 'react'
import { assets } from '../../assets/asset'
import { FaShoppingBag,FaEuroSign } from "react-icons/fa";
import { useState, useEffect } from 'react';
import './navbar.css'

import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { FaUser } from "react-icons/fa";




const navbar = ({setShowLogin}) => {

    const{ token, setToken,setUser_ID} = useContext(StoreContext)
    const navigate = useNavigate()
    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        setToken("") ; setUser_ID("")
        navigate("/")
        

    }

  

   



  return (
    <div className= "navbar">
        <div className="nav_left">
            <ul className='nav_menu'>
                <li style={{border:"2px solid white", padding:"7px 15px", fontWeight:"bolder"}}><Link to='./'>IL RESTORENTE</Link></li>
                {!token? ( <li><button  className='modal_btn' onClick={ ()=>setShowLogin(true) } >ACCEDI </button></li>) : (
                    <div className="navbar-profile">
                        <p>{localStorage.getItem("username")}</p>
                        <FaUser />
                        <ul className="navbar-profile-dropdown">
                            <li onClick={()=>navigate('/myOrders')}><a href="">Ordini</a></li>
                            <li onClick={logout}><a href="">disconnettersi</a></li>
                        </ul>
                    </div>
                )}
                
            </ul> 
        </div>
        <div className="nav_logo_container">
             <img src={assets.logo} alt="logo" />
        </div>
        <div className="nav_right">
            <ul  className='nav_menu'>
                <li className='cart-btn' content="">
                    <Link to='/cart' style={{border:"2px solid white", borderRadius:"5px", padding:"8px 10px",fontWeight:"bolder"}}>
                        <span className='price_cart'>0.00</span>
                        <FaEuroSign/>
                        <FaShoppingBag />
                    </Link>
                </li>
                
                <li className='payment-btn'>
                   <Link to='/checkout' style={{backgroundColor:"orange", borderRadius:"20px", padding:"10px 15px",fontWeight:"600" }}>PAGAMENTO</Link>
                </li>
            </ul>
        </div>

    </div>
  )
}

export default navbar