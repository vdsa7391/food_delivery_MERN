import React, { useContext, useEffect, useState } from 'react'
import './verify.css'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {StoreContext} from '../../context/StoreContext.jsx'
import axios from 'axios'
import {toast} from 'react-toastify'



const verify = () => {

    const [searchParams, setSearchParams]= useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url, token} = useContext(StoreContext)
    const navigate = useNavigate();

    const verifyPayment = async() =>{
        const response= await axios.post(url+"/api/order/verify", {success, orderId});
        if(response.data.success){
            toast.success("order succefully placed")
            if(token){
                navigate("/myOrders");
            }else{
                navigate("/");
            }
            
        }else{
            navigate("/")
        }

    }

    useEffect(()=>{
        verifyPayment();
    },[])


  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default verify
