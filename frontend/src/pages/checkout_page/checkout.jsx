import React, { useContext, useEffect, useState } from "react";
import Link_box from "../../components/link_box";
import Checkout_form from "../../components/checkout_form";
import { IoMdLock } from "react-icons/io";
import Order_details from "../../components/order_details/order_details.jsx";
import { StoreContext } from "../../context/StoreContext.jsx"
import { LiaTimesSolid } from "react-icons/lia";
import axios from "axios"
import  {toast} from 'react-toastify'



import "./checkout.css";
import { useNavigate } from "react-router-dom";

const checkout = () => {


  const {food_items , token, url,cartItems, update_each_item_price, sub , uncheck,
     main_cart,setSub
  } = useContext(StoreContext);

  const [delivery, setDelivery] = useState(false)
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
  
  

  const [data, setData]= useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    houseNumber:"",
    provience:"",
    zipcode:"",
    phone:"",
    DOB:"",
    time_slot:"",
    delivery_date:"",
    delivery_flag:"false",
    credit_card:"false",
    shippment_address_change:"false",
    remember_payment:"false",
    cash_on_delivery:"false"


  })

  const onChangeHandler=(e)=>{
    const name = e.target.name;
    const value= e.target.value;
    if(name === "delivery_flag"){
      onChangeDelivery(e)
    }

    setData(data => ({...data, [name]: value}))
  }



  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    

    /* if(data.delivery_flag.localeCompare("true")==0){
      setSub(prev => prev+5)
      data["delivery_flag"]="false"
    } */



   
    let orderData = {
      address: data, 
      items:main_cart,
      amount: newTotal

    }

    let res = await axios.post(url+"/api/order/placeOrder", orderData, {headers : {token}})
    if( res.data.success){
      const {session_url} = res.data;
      if(token){
        const r= await axios.post(url+"/api/order/clearCartData", {},{headers: {token}});
        if(r.data.success){
          console.log("user cart is succefully emptied");
        }
        else{
          console.log("error in deleting user cart after placing order");
        }
      }
      window.location.replace(session_url);
    }
    else{
      console.log(res.data)
      
    }
    

  }

  const navigate= useNavigate();

  useEffect(()=>{

   if (Object.keys(main_cart).length===0) {
    navigate('/cart')
   }
     
  },[token])

useEffect(()=>{
  console.log(data)
},[data])





  return (

    
    <div className="chekout_container">
      <div className="header">
        <IoMdLock className="icon" />
        <Link_box flag={true} />
      </div>

      {/* <div className="paragraphs">
        <p>
          Sei già un cliente?
          <span>
            <a href=""> Fai clic qui per accedere</a>
          </span>
        </p>
        <p>
          Hai un codice promozionale?{" "}
          <span>
            <a href=""> Fai clic qui per inserire il tuo codice promozionale</a>
          </span>
        </p>
      </div> */}

      <div className="">

      <form onSubmit={onSubmitHandler} className="order_delivery_details">
        
        
        <div id="form_1">

        
        <h3>Dettagli di fatturazione</h3>
        <label htmlFor="email">Indirizzo email *</label>
        <input type="email" name="email" value={data.email} onChange={onChangeHandler} required />

        <div className="name_surname">
          <div className="name_div">
            <label htmlFor="name">Nome*</label>
            <input type="text" name="firstName" value={data.firstName} onChange={onChangeHandler} required />
          </div>
          <div className="surname_div">
            <label htmlFor="surname">Cognome*</label>
            <input type="text" name="lastName" value={data.lastName}onChange={onChangeHandler} required />
          </div>
        </div>

        <label htmlFor="">Paese/regione *</label>
        <label>Italia</label>

        <label htmlFor="phone">Via e numero *</label>
        <div className="address">
          <input type="text" placeholder="Via/Piazza e Numero Civico"  name='street' onChange={onChangeHandler} value={data.street} required/>
          <input
            type="text"
            placeholder="Appartamento, suite, unità, ecc. (opzionale)"
            name='houseNumber'  value={data.houseNumber}
            onChange={onChangeHandler}
          />
        </div>

        <label htmlFor="cap">C.A.P*</label>
        <input type="text" name="zipcode" value={data.zipcode} onChange={onChangeHandler} required />

        <label htmlFor="city">Citta*</label>
        <input type="text" name="city"  value={data.city} onChange={onChangeHandler} required />

        <label htmlFor="provience">Provincia*</label>
        <select name="provience" placeholder="Milano" value={data.provience} onChange={onChangeHandler} required>
          <option value="Milan">Milan</option>
          <option value="Torino">Torino</option>
          <option value="Genova">Genova</option>
          <option value="Asti">Asti</option>
        </select>

        <label htmlFor="telephone">Telefono*</label>
        <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{3}" name="phone" value={data.phone} onChange={onChangeHandler} placeholder="333-22-45-678" required/>

        <label htmlFor="date">Data di nascita (opzionale)</label>
        <input type="date" name="DOB" value={data.DOB} onChange={onChangeHandler} />

        <span><input type="radio" name="shippment_address_change" value={true} onChange={onChangeHandler} />Spedire ad un indirizzo differente?</span>

        <label htmlFor="text">Note sull'ordine (opzionale)</label>
        <textarea id="text" name="text" rows="4" cols="50" placeholder="Note sull'ordine, ad esempio" ></textarea>
        </div>


        <div className="order" id="form_2">

             <h4>Il tuo ordine</h4>

              <div className="order_box1 break">
                <h5>PRODOTTO</h5>
                <h5>SUBTOTALE</h5>
              </div>

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

           

              <div className="order_box1 break">
                <h5>Subtotale</h5>
                <div>{sub} €</div>
              </div>

              <div className="order_box2 break">
                <h5>Spedizione</h5>
                <span>
                  <input type="radio" name="delivery_flag" value={true} onChange={onChangeHandler} className="radioo"/>
                  Consegna (2,4 km): 5,00 €
                </span>
                <span>
                  <input type="radio" name="delivery_flag" className="radioo" onChange={onChangeHandler}  value={false} />
                  Ritiro al locale (2,4 km)
                </span>
              </div>

              <div className="order_box1 break">
                <h5>Totale</h5>
                <div>{newTotal!=0? newTotal : sub} €</div>
              </div>

              <hr/>


              <h4 style={{paddingTop:"25px"}}>Delivery Details</h4>

              <label htmlFor="date">Delivery Date *</label>
              <input type="date" name="delivery_date" value={data.delivery_date} onChange={onChangeHandler}/>

              <label htmlFor="time_slots">Time Slot*</label>
              <select name="time_slot" placeholder="12:00 PM - 12:30 PM" value={data.time_slot} onChange={onChangeHandler}>
                <option value="1:00 PM - 1:30 PM">1:00 PM - 1:30 PM</option>
                <option value="1:30 PM - 2:00 PM">1:30 PM - 2:00 PM</option>
                <option value="7:00 PM - 7:30 PM">7:00 PM - 7:30 PM</option>
                <option value="7:30 PM - 8:00 PM">7:30 PM - 8:00 PM</option>
              </select>

              <span >
                  <input type="radio" name="credit_card" className="radioo" value={true} onChange={onChangeHandler}  placeholder="Numero carta"/>
                  Carta di Credito (Stripe)
              </span>

              <p>Paga con la tua carta di credito con Stripe</p>

            
              <div className="span-container">
              <div>  <span>
                  <input type="checkbox" name="remember_payment" value={true}  onChange={onChangeHandler} className="radioo"/>
                  Ricorda informazioni di pagamento per gli ordini futuri.
              </span></div>
              <div>
              <span>
                  <input type="radio" name="cash_on_delivery" value={true} onChange={onChangeHandler} className="radioo"/>
                  Pagamento alla consegna
              </span>
              </div>
              </div>

              <button type="submit" className="order_detail_btn">Effettua ordine</button>



        </div>


      </form>


      </div>
    </div>
  );
};

export default checkout;
