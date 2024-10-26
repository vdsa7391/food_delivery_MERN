import React, { useContext, useEffect } from 'react'
import './home.css'
import Discount from '../../components/discount.jsx'

import FoodDisplay from '../../components/foodDisplay/foodDisplay.jsx'






const home = () => {



  return (
    <div>
        <Discount/>
        
        <FoodDisplay/>

        
        
    </div>
  )
}

export default home