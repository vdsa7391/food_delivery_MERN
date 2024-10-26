import React from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import { LiaTimesSolid } from "react-icons/lia";
import './order_details.css'


const order_details = () => {
  const { cartItems, update_each_item_price, sub , uncheck} = useContext(StoreContext);

  return (
    <form className="order">
     
        <h4>Il tuo ordine</h4>

        <div className="order_box1 break">
          <h5>PRODOTTO</h5>
          <h5>SUBTOTALE</h5>
        </div>

        {cartItems.map((item, index) => {
          let price = update_each_item_price(item);

          return (
            <div key={index} className="order_box1">
              <div className="fp_title">
                {item.i.title}<LiaTimesSolid /> {item.i.count}
              </div>
              <div>{price} €</div>
            </div>
          );
        })}

        <div className="order_box1 break">
          <h5>Subtotale</h5>
          <div>{sub} €</div>
        </div>

        <div className="order_box2 break">
          <h5>Spedizione</h5>
          <span>
            <input type="radio" name="radio" onClick={(e)=>uncheck(e)} className="radioo"/>
            Consegna (2,4 km): 4,00 €
          </span>
          <span>
            <input type="radio" name="radio" className="radioo" />
            Ritiro al locale (2,4 km)
          </span>
        </div>

        <div className="order_box1 break">
          <h5>Totale</h5>
          <div>{sub}</div>
        </div>
       
      <hr/>

      
      <h4 style={{paddingTop:"25px"}}>Delivery Details</h4>

      <label htmlFor="date">Delivery Date *</label>
      <input type="date" name="date" />

      <label htmlFor="time_slots">Time Slot*</label>
        <select name="time_slots" placeholder="12:00 PM - 12:30 PM">
          <option value="1:00 PM - 1:30 PM">1:00 PM - 1:30 PM</option>
          <option value="1:30 PM - 2:00 PM">1:30 PM - 2:00 PM</option>
          <option value="7:00 PM - 7:30 PM">7:00 PM - 7:30 PM</option>
          <option value="7:30 PM - 8:00 PM">7:30 PM - 8:00 PM</option>
        </select>

        <span >
            <input type="radio" name="radio" className="radioo"  placeholder="Numero carta"/>
            Carta di Credito (Stripe)
        </span>

        <p>Paga con la tua carta di credito con Stripe</p>

        <label htmlFor="number">Carta di Credito o di Debito</label>
        <input type="number" name="number" className="card_link"/>

        <span>
            <input type="checkbox" name="checkbox" className="radioo"/>
            Ricorda informazioni di pagamento per gli ordini futuri.
        </span>

        <span>
            <input type="radio" name="radio" className="radioo"/>
            Pagamento alla consegna
        </span>

        <button className="order_detail_btn">Effettua ordine</button>


      



    </form>
  );
};

export default order_details;
