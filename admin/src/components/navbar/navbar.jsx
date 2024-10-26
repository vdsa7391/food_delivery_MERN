import React from 'react'
import {asset} from '../../assets/asset.js'
import "./navbar.css"

const navbar = () => {

    
  return (
    <>
    <div className='navbar'>
        <img src= {asset.logo} alt="" />
        <p style{{ color: "white"}}>Admin Panel</p>
    </div>
    
    </>
  )
}

export default navbar
