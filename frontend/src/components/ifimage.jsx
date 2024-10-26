import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import './ifImage.css'



function ifimage(props){
    const {url} =useContext(StoreContext)
    const image= props.item.image
    const flag= props.flag
    if(image  && !flag){
        return <img className='if-image' src={url+"/images/"+props.item.image} alt="" /* style={{width:"150px", height:"150px"}} */ />  
    }else if(image && flag){
        return <img className='if-image-2' src={url+"/images/"+props.item.image} alt="" /* style={{width:"80px", height:"80px"}}  *//>  
    }else{
        return;

    }
 
}

export default ifimage