import React, { useContext, useEffect, useState } from 'react'
import '../pages/checkout_page/checkout.css'

import { StoreContext } from "../context/StoreContext"

const checkout_form = () => {

  const {food_list, token, url} = useContext(StoreContext);
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
    DOB:""

  })

  const onChangeHandler=(e)=>{
    const name = e.target.name;
    const value= e.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault();

  }

  useEffect(()=>{
    console.log(data)
  },[data])



  return (
    <>
    <form onSubmit={onSubmitHandler}>
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

        <span><input type="radio" name="radio"  />Spedire ad un indirizzo differente?</span>

        <label htmlFor="text">Note sull'ordine (opzionale)</label>
        <textarea id="text" name="text" rows="4" cols="50" placeholder="Note sull'ordine, ad esempio" ></textarea>

      </form>
    
    </>
  )
}

export default checkout_form