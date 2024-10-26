import React, { useEffect, useState } from 'react'
import "./listItems.css"
import {toast} from 'react-toastify'
import axios from 'axios'

const listItems = ({url}) => {

  const [list, setList] = useState([]);
  


  const fetchList= async ()=>{
    const response= await axios.get(`${url}/api/food/list`);
    
    if(response.data.status){
      setList(response.data.food_item);
      console.log(response.data)
    }else{
      toast.error(response.data.msg)
    }
  }



  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id: foodId})
    await fetchList();
    if(response.data.status){
      toast.success(response.data.msg);
      
    }else{
      toast.error(response.data.msg)

    }

  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list_table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Title</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.title}</p>
              <p>{item.price} €</p>
              <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
            </div>
          )
        })}
      </div>
      </div>
  )
}

export default listItems