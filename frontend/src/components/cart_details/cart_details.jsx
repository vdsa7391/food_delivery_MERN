import React, { useContext, useEffect, useState } from 'react'
import './cart_details.css'
import { StoreContext } from '../../context/StoreContext';
import { LiaTimesSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';

const cart_details = () => {


 
 

  const {sub, main_cart} = useContext(StoreContext);
  const [delivery, setDelivery] = useState(false)
  const navigate = useNavigate()

  const [newTotal, setnewTotal] = useState(0)

  const onChangeDelivery = (e)=>{
    if(e.target.value==="true"){
      setDelivery(true)
    }else{
      setDelivery(false)
    }
   
  }

  useEffect(()=>{
    if(delivery && newTotal<=sub){
      setnewTotal(sub+5)
    }
    if(!delivery && newTotal>sub){
      setnewTotal(sub)
    }
  },[delivery])

  

  return (
    <>
        

      <div className="cart_details">
        <div className="cart_total break">Totale carrello</div>
        {Object.keys(main_cart).map((food_id, index) => {
                 return (
                  <div key={index} className="order_box1">
                    <div className="fp_title">
                      {main_cart[food_id]["title"]}<LiaTimesSolid /> {main_cart[food_id]["count"]}
                    </div>
                    <div>{main_cart[food_id]["count"] * main_cart[food_id]["price"] } €</div>
                  </div>
                );
              })}
        <div className="subtotal break">
            <div>Subtotale</div>
            <div className="total">{sub} €</div>
        </div>
        <div className="radio_btns">
          <h4>Spedizione</h4>
          <p><input type="radio" name="delivery" value={true} onChange={(e)=>onChangeDelivery(e)}/> Consegna (2,4 km): 5,00 €</p>
          <p><input type="radio" name="delivery" value={false} onChange={(e)=>onChangeDelivery(e)} /> Ritiro al locale (2,4 km)</p>
          <h4>Spedizione a MILANO.</h4>
          <h4>Modifica indirizzo</h4>
        </div>
        <div className="subtotal break">
            <div>Totale</div>
            <div className="total ">{newTotal!=0? newTotal : sub} €</div>
        </div>
        <button className='card_details_btn' onClick={()=>navigate('/checkout')} style={{color:"white", backgroundColor:"#d26e4b"}}>PROCEDI CON L'ORDINE</button>
        
      </div>

    </>
  )
}

export default cart_details