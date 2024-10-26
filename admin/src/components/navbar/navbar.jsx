import React from 'react'
import {asset} from '../../assets/asset.js'
import "./navbar.css"

const navbar = () => {

    
  return (
    <>
    <div className='navbar'>
        <img src= {asset.logo} alt="" />
        <h4 style{{ color: "white"}}>Admin Panel</h4>
    </div>
    
    </>
  )
}

export default navbar
