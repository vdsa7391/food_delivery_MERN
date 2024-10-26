import React, { useContext, useEffect } from "react";
import {Link} from 'react-router-dom'
import "./nav.css";


import { assets } from '../../assets/asset'
import { FaShoppingBag,FaEuroSign } from "react-icons/fa";


import { StoreContext } from "../../context/StoreContext";

const nav = () => {

    const {popup, setPopup, sub, price_calculator} = useContext(StoreContext)
    const mod_btn = document.getElementsByClassName("modal_btn")
    console.log(mod_btn[0])


    
    

  return (
    <div className="navbar">

      <div className="nav nav_left ">
        
          <Link to='/'>IL RESTORENTE</Link>

          <button className="modal_btn" onClick={() => setPopup(!popup)}>
            ACCEDI
          </button>
        
      </div>

      <div className="nav_logo_container">
        <img src={assets.logo} alt="logo" />
      </div>

      <div className="nav nav_right">
        
          <div className="cart-btn" content="">
            <Link
              to="/cart"
              style={{
                border: "2px solid white",
                borderRadius: "5px",
                padding: "8px 10px",
                fontWeight: "bolder",
              }}
            >
              <span className="price_cart">{sub}€</span>
              <FaEuroSign />
              <FaShoppingBag />
            </Link>
          </div>

          <div className="payment-btn">
            <Link
              to="/checkout"
              style={{
                backgroundColor: "orange",
                borderRadius: "20px",
                padding: "10px 15px",
                fontWeight: "600",
              }}
            >
              PAGAMENTO
            </Link>
          </div>
        <div/>
      </div>
    </div>
  );
};

export default nav;
