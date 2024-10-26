import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

import Ifimage from "../ifimage";
import { Link } from "react-router-dom";


import { FaArrowLeft } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

import "./cartTable.css";

const cartTable = () => {
  const {
    update_cart,
    remove_directly_from_cart_store , 
    main_cart, 
  url, token,add_val, subtract_val, handleInputChange} = useContext(StoreContext);


  return (
    <div className="cart_table">
      <table className="table_span">
        <thead>
          <tr className="table-heading">
            <th>PRODOTTO</th>
            <th>PREZZO</th>
            <th>QUANTITA</th>
            <th>SUBTOTALE</th>
          </tr>
        </thead>
        <tbody>
          

        {
            Object.keys(main_cart).map((food_id, index) => {

            let count= main_cart[food_id]["count"];
            let price = main_cart[food_id]["count"]*main_cart[food_id]["price"];

            if ( count > 0) {
              return (
                <tr  key={index} >
                  <td style={{ paddingRight: "10px", paddingLeft: "0" }}>
                    <div className="box">
                      <div className="remove_item_from_cart">
                        <RxCrossCircled
                          onClick={() => remove_directly_from_cart_store(main_cart[food_id]["_id"])}
                        />
                      </div>
                      <div className="box_image">
                        <Ifimage item={main_cart[food_id]} flag={true} />
                      </div>
                      <div className="box_title">
                        <div className="heading">{main_cart[food_id]["title"]}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "0 10px 0 5px", width: "7em" }}>
                    {main_cart[food_id]["price"]}
                  </td>
                  <td>
                    <div className="quantity">
                      <input
                        className="quantity_btn"
                        type="button"
                        value={"-"}
                        id="minus"
                        onClick={() => subtract_val(main_cart[food_id])}
                      />
                      <input
                        className="quantity_btn count"
                        type="number" 
                        value={ /* !main_cart[food_id]["val"] ? main_cart[food_id]["count"] : */ main_cart[food_id]["val"]  }
                        id="counter_value"
                        placeholder={ main_cart[food_id]["val"]}
                        onChange={(e) => handleInputChange(main_cart[food_id], e.target.value)}
                      />
                      <input
                        className="quantity_btn"
                        type="button"
                        value={"+"}
                        id="plus"
                        onClick={() => add_val(main_cart[food_id])}
                      />
                    </div>
                  </td>
                  <td style={{ textAlign: "right" }}>{price} €</td>
                </tr>
              );
            }

        })
    
    }


         
        </tbody>
      </table>
      <div className="buttons">
        <button id="go_to_home">
          {" "}
          <Link to="/">
            <FaArrowLeft style={{ marginRight: "8px", fontSize: "15px" }} />
            Continua con gli acquisti
          </Link>
        </button>
        <button id="update_cart" onClick={() => update_cart()}>
          Aggiorna carrello
        </button>
      </div>
    </div>
  );
};

export default cartTable;
