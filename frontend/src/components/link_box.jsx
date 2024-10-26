import React from 'react'

import '../pages/cartPage/cart.css'
import { IoMdLock } from "react-icons/io";
import { Link } from 'react-router-dom';

export const link_box = (props) => {



    

  return (
    <div className="links_list">
       
        <div className="link">
        <Link to='/cart'>
            Carrello{" >"}
            
          </Link>
        </div>
        <div className="link">
          <Link to='/checkout'>
         Dettagli Checkout{" > "}
          </Link>
        </div>
        <div className="link">
          <Link to={'/'} >Ordine Completato </Link>
        </div>
      </div>
  )
}
 



export default link_box