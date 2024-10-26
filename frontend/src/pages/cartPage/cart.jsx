import React, { useContext, useEffect, useState } from "react";
import "./cart.css";

import Link_box from '../../components/link_box.jsx'
import CartTable from "../../components/cartTable/cartTable.jsx";
import Cart_details from "../../components/cart_details/cart_details.jsx";
import { StoreContext } from "../../context/StoreContext.jsx";

const cart = () => {

  const{main_cart} = useContext(StoreContext)




  return (

    <div className="container">
      <div className="cart_link_container"><Link_box flag={false}/></div>
      <div className="main">
        <CartTable />
        <Cart_details />
      </div>
      <div className="footer_links">
        <p>Saved for later(0 Products)</p>
        <p>No products in the saved list</p>
      </div>
    </div>
  );
};

export default cart;
