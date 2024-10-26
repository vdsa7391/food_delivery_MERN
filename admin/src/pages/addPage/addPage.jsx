import React, { useEffect, useState } from 'react'
import {asset} from '../../assets/asset.js'
import "./addPage.css"
import axios from "axios"
import { toast } from 'react-toastify'

const addPage = ({url}) => {

  const [image, setImage] = useState(null)
  const [data, setData] = useState({
    title:"",
    description:"",
    price:"",
    category:""
  })
  

  const onChangeHandler= (e)=>{
    const name = e.target.name;
    const value= e.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("category", data.category)
    formData.append("price", Number(data.price))
    formData.append("image", image)
    const response = await axios.post(`${url}/api/food/add`,formData)
    if(response.data.status){
      setData({
        title:"",
        description:"",
        price:"",
        category:""
      })
      setImage(null)
      toast.success(response.data.msg)
    }else{
      toast.error(response.data.msg)
      
    }
  }


  /* useEffect( ()=>{
    console.log(data)

  },[data]) */



  return (
    <div className='add'>
      <form className="flex_col" onSubmit={onSubmitHandler}>
        <div className="add_img_upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image!=null? URL.createObjectURL(image) : asset.upload_image} alt="upload_here" className='upload_image' />
          </label>
          <input onChange={(e)=> setImage(e.target.files[0])} type="file" id="image" />
        </div>
        <div className="add_product_name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.title} type="text" name="title" placeholder='Type here' />
        </div>
        <div className="add_product_description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Content here'></textarea>
        </div>
        <div className="add_product_name flex-col">
          <p>Product Category</p>
          <input onChange={onChangeHandler} value={data.category} type="text"  name='category' placeholder='Dolce'/>
        </div>

        <div className="add_category_price flex-col">
          <p>Product Price</p>
          <input onChange={onChangeHandler} value={data.price} type="number"  name='price' placeholder='20€'/>
        </div>
        <button className="add_btn" type='submit'>ADD</button>
      </form>

    </div>
  )
}

export default addPage