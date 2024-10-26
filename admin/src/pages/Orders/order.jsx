import React from 'react'
import "./order.css"
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import {asset} from '../../assets/asset.js'

const order = ({url}) => {

  const [orders, setOrders] = useState([]);


  const fetchAllOrders = async () =>{
    const response = await axios.get(url+"/api/order/list")
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data)
    }
    else{
      toast.error("error in getting the orders")
    }
  }


  const statusHandler = async(event, orderId)=>{
    const response = await axios.post(url+"/api/order/status", {orderId, status: event.target.value });
    if(response.data.success){
      await fetchAllOrders();
    }

  }

  useEffect(()=>{
    fetchAllOrders();
  },[])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index)=>{
           let orderItems_length= Object.keys(order["items"]).length;

          return(
          <div key={index} className="order-item">
            <img src={asset.parcel} alt="" />
            <div >
              <p className="order-item-food">
              {Object.keys(order["items"]).map((item, index)=>{
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
              <p className="order-item-name">{order["address"]["firstName"] +" "+ order["address"]["lastName"]}</p>
              <div className="order-item-address">
                <p>{order["address"]["street"]+","}</p>
                <p>{order["address"]["city"]+", "+order["address"]["provience"]+", "+order["address"]["zipcode"]}</p>
              </div>
              <p className="order-item-phone">{order["address"]["phone"]}</p>
            </div>
            <p>Items : {orderItems_length}</p>
            <p>{order.amount} €</p>
            <select value={order.status} onChange={(event)=>statusHandler(event,order._id )}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ) })}
      </div>
    </div>
  )
}

export default order