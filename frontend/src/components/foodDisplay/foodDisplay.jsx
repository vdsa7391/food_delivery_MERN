import React, { useContext, useEffect, useState } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import Ifimage from "../ifimage";
import Details from "../details";

const foodDisplay = () => {
  const { food_items ,addToCart,
     price_calculator } = useContext(StoreContext);

    const [categories, setCategories] = useState([])

    
    async function items_selected(i) {
        console.log(i.i.title);
        await addToCart(i);
        
      }

    
  const create_groupByCategory = ()=>{
      
    for (let i=0; i<food_items.length; i++) {
        if(categories.includes(food_items[i].category)){
            i++;
        }else{
          categories.push(food_items[i].category)
        }
        
    } 
    console.log(categories)
    
}


create_groupByCategory();
console.log(food_items)

useEffect(()=>{
  price_calculator();
},[])

 


  return (
    <div className="food_display">

 
       {categories.map((cat, index)=>{
        
        return (
        
            <>

            <div key={index} className="menu_category">
              <h1 className="category_heading">{cat}</h1>
              <div className="category_options">
                
                {food_items.map((i, k) => {

                    const item_category= i.category;

                    if(item_category.localeCompare(cat)==0){
                        return (
                            <div
                              key={k}
                              className={item_category.localeCompare("BEVANDA")==0 ? "option bev": "option"}
                              onClick={() => items_selected({ i })}
                            >
                              <Ifimage item={i} flag={false} />
                              <Details item={i} />
                            </div>
                          );
                    }
                  
                })}
              </div>
            </div>
          </>
        
    )
      })} 

     
    </div>
  );
};

export default foodDisplay;
