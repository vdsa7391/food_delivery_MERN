import React, { useContext, useEffect, useState } from 'react'
import './myOrders.css'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
import {assets} from '../../assets/data.js'
import { useNavigate } from 'react-router-dom'


const myOrders = () => {

    const{url, token , data, fetchOrders} = useContext(StoreContext)
 
    const navigate = useNavigate();

    
    
    

   useEffect(()=>{
       
            if(token){
                fetchOrders();
            }/* else{
                navigate('/')
            } */
   
        
    },[token]) 

    


    

  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order, index)=>{
                let orderItems_length= Object.keys(order["items"]).length;
                
                return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel} id='parcel_img' alt="" />
                        <p>{Object.keys(order["items"]).map((item, index)=>{
                            console.log(order["items"][item]["title"])
                            let title = order["items"][item]["title"];
                            let count = order["items"][item]["count"]
                            
                            
                            
                            if(index == orderItems_length-1){
                                return title +" x "+ count;
                            }
                            else{
                                return title +" x "+ count + ", ";
                            }
                            

                        })
                        }
                        </p>
                        <p>{order.amount}.00 €</p>
                        
                        <p>Items: {orderItems_length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={()=>fetchOrders()}>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default myOrders
