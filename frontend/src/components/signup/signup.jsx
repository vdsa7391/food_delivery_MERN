import React, { useContext, useEffect, useState } from "react";
import './signup.css'
import axios from 'axios'
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext"

const signup = ({setShowLogin}) => {
  const {url, token, setToken,user_ID, setUser_ID} = useContext(StoreContext)

  
  console.log("sign in")
  const [register_data, setRegister_data] = useState({
    user_id:"",
    password:"",
    DOB:""
  });

  const [login_data,setLogin_data] = useState({
    user_id:"",
    password:""

  })

  const onChangeHandler_login =(e)=>{
    const name = e.target.name;
    const value= e.target.value;
    setLogin_data(data => ({...data, [name]: value}))
  }

  const onChangeHandler_register =(e)=>{
    const name = e.target.name;
    const value= e.target.value;
    setRegister_data(data => ({...data, [name]: value}))
  }

  const onSubmitHandler_login = async (e)=>{
    e.preventDefault();
    console.log(login_data)
    const response = await axios.post(`${url}/api/users/login`,login_data)
    console.log(response.data)
    if(response.data.success){
      toast.success(response.data.msg)
      //store username
      setUser_ID(login_data.user_id)
      localStorage.setItem("username", login_data.user_id)

      setLogin_data({
        user_id:"",
        password:""
      })
      
      if(response.data.token){
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token);
        setShowLogin(false)
      }
      
    }else{
      toast.error(response.data.msg)
      
    }
  }

  const onSubmitHandler_register = async (e)=>{
    e.preventDefault();
    console.log(register_data)
    const response = await axios.post(`${url}/api/users/register`,register_data)
    console.log(response.data)
    if(response.data.success){
      toast.success("user succefully registered")
      
      if(response.data.token){
        setToken(response.data.token)
        setUser_ID(register_data.user_id)
        localStorage.setItem("username", register_data.user_id)
        localStorage.setItem("token", response.data.token);
        setShowLogin(false)
      }
      setRegister_data({
        user_id:"",
        password:"",
        DOB:""
      })
      
    }else{
      toast.error(response.data.msg)
      
    }
  }

  useEffect(()=>{
    console.log(register_data)
  },[register_data])



  return  (
    <div className="modal" id="modal">
      <div className="sec_container">
      <div className="cross"><button onClick={()=>setShowLogin(false)}>X</button></div>
      <form className="login col" onSubmit={onSubmitHandler_login}>
        <h4>ACCEDI</h4>

        <label htmlFor="userId">Nome utente o indirizzo email*</label>
        <input type="text" name="user_id" value={login_data.user_id} onChange={onChangeHandler_login} required />

        <label htmlFor="password">Password*</label>
        <input type="text" name="password" value={login_data.password} onChange={onChangeHandler_login}  required/>

        <span className="l">
          <input type="checkbox"  style={{marginRight:"10px"}} />
          Ricordami
        </span>
        
        
        <button className="signup_btns" type='submit'>ACCEDI</button>

        <a className="forget_pass" href="">Password dimenticata?</a>
      </form>

      <form className="register col" onSubmit={onSubmitHandler_register}>
        <h4>Registrati</h4>

        <label htmlFor="userID">Indirizzo email *</label>
        <input type="text" name="user_id" value={register_data.user_id} onChange={onChangeHandler_register} required />
        <p>Un link per impostare una nuova password verrà inviato al tuo indirizzo email.</p>

        <label htmlFor="password">Password*</label>
        <input type="text" name="password" value={register_data.password} onChange={onChangeHandler_register}  required/>


        <label htmlFor="DOB">Data di nascita</label>
        <input type="date" name="DOB" value={register_data.DOB} onChange={onChangeHandler_register} placeholder="GG/MM/AAAA" />

        
        <button className="signup_btns" type='submit'>REGISTRATI</button>

        
      </form>
      </div>
      
      
    </div>
  ) 
};

export default signup;
