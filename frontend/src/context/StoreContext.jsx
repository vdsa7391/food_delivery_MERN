


import { createContext, useEffect, useState } from "react";
import {menu_list,  drink_list, item,assets} from '../assets/asset.js'
import axios from 'axios'



export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    let [cartItems, setCartItems] = useState([])
    const [sub, setSub]= useState(0)
    const [main_cart, setMain_cart]= useState({})
    const [food_items, setFood_items] = useState([])
    const [cartData_copy, setCartData_copy] = useState([])
    const [cartDataFrontend, setCartDataFrontend] = useState({})

// user login
    const url= "http://localhost:4000";
    const [token, setToken] = useState("");
    const [user_ID, setUser_ID] = useState("");


// create menu from database

    

    const fetchFood_items = async()=>{
        const response= await axios.get(`${url}/api/food/list`)
        if(response.data.status){
            setFood_items(Object.values(response.data)[1]);
            console.log(Object.values(response.data)[1] )
            console.log(food_items)
        }else{
              console.log(response.data.msg)
        }


    } 


    const price_calculator = async()=>{

        if(token){
            const response= await axios.post(url+"/api/cartItem/total",{}, {headers: {token}});
            if(response.data.success){
                let price=response.data.cartData["total"];  
                let count= response.data.cartData["quantity"];  
                let p= document.getElementsByClassName("price_cart")
                let dot_btn= document.getElementsByClassName("cart-btn")
                p[0].innerHTML=price;
                if(count!=0){
                    
                    dot_btn[0].setAttribute("content",count)
                    dot_btn[0].classList.add("active") 
                } 
                else{
                    dot_btn[0].classList.remove("active") 
                }
                setSub(price)
                
            } 
        }else{
            let cart_total= 0;
            let cart_count=0;
            Object.keys(main_cart).map((item, index)=>{
                cart_total+= main_cart[item]["count"]* main_cart[item]["price"];
                cart_count+= main_cart[item]["count"];
            })

            let p= document.getElementsByClassName("price_cart")
            let dot_btn= document.getElementsByClassName("cart-btn")
            p[0].innerHTML=cart_total;
            if(cart_count!=0){
                    
                dot_btn[0].setAttribute("content",cart_count)
                dot_btn[0].classList.add("active") 
            } 
            else{
                dot_btn[0].classList.remove("active") 
            }
                setSub(cart_total)
            
        }

        
        

    }

    const loadCartData= async(Token)=>{
        const response= await axios.post(url+"/api/cart/get",{}, {headers: {Token}});
        if(response.data.success){
            setCartData_copy(Object.values(response.data)[1]);

        }else{
            console.log("error in fetching cart data object")
        }

        const res = await axios.post(url+"/api/cartItem/get",{}, {headers: {Token}})    
        if(res.data.success){
            setMain_cart(res.data.cartItem)
            price_calculator()
        }else{
            console.log("error in fetching cartItem object")
        }   
        
    }

    


    const addToCart = async (item) =>{
      
        // cartdata created
        if(cartDataFrontend.hasOwnProperty(item.i._id)){
            cartDataFrontend[item.i._id]+=1;
           
        }else{
            cartDataFrontend[item.i._id]=1;
        }

        console.log(cartDataFrontend)

        //cartItem created
        if(!main_cart.hasOwnProperty(item.i._id)){
            main_cart[item.i._id]= item.i;
           
        }
        //update the quantity
        let value = cartDataFrontend[item.i._id]
        main_cart[item.i._id]["count"]=value;
        main_cart[item.i._id]["val"]=value;
        console.log(main_cart)

        //update count and total
        price_calculator();


        if(token){
            const response= await axios.post(url+"/api/cart/add",{itemId: item.i._id}, {headers: {token}})
            if(response.data.success){
                console.log("cart_data after add_to cart: "+Object.values(response.data)[2]);
                const res = await axios.post(url+"/api/cartItem/add", {itemId: item.i._id}, {headers: {token}})
                if(res.data.success){
                    console.log("cart_item after add_to cart: "+Object.values(res.data)[2]);
                    const update_quanity_response = await axios.post(url+"/api/cartItem/quantity", {itemId: item.i._id}, {headers: {token}})
                    if(update_quanity_response.data.success){
                        console.log("cart_item count updated, then list: "+Object.values(update_quanity_response.data));
                        setMain_cart(update_quanity_response.data.cartItem)
                        price_calculator();
                    }
                }
            }
            

        }

        
    }




    // updatecart

    const update_cart = async ()=>{
        if(token){
            const response = await axios.post(url+"/api/cartItem/update", {},{headers: {token}}) 
            if(response.data.success){
                console.log("cart data +item is sucessfully updated");
                setMain_cart(response.data.cartItem)
                
            }else{
                console.log("error in updating cart from backend")
            }

        }else{
            console.log("update")
            Object.keys(main_cart).map((food_id, index)   => {
                if(main_cart[food_id]["val"]){
                    let count= main_cart[food_id]["val"];
                    
                    cartDataFrontend[food_id]= count;
                    main_cart[food_id]["count"]=count;
                    //main_cart[food_id]["val"]=0;
                }
            })
            setMain_cart(main_cart)
            console.log(main_cart)

        }
        price_calculator();
        
        
    }




    //remove_cart_item_completely

    async function remove_directly_from_cart_store(id) {
        if(token){
            const response = await axios.post(url+"/api/cartItem/remove", {itemId: id}, {headers: {token}} );
                if( response.data.success){
                    console.log("cartItem and cart data is succefully removed")
                    setMain_cart(response.data.cartItem)
                    price_calculator();
                }
                else{
                  console.log("error in removing cartitem")
                }  

        }else{
         
            delete cartDataFrontend[id]
            delete main_cart[id]
            setMain_cart(main_cart)
            price_calculator();
            
        }
            
      }



    /// modal

    const [popup, setPopup] = useState(false)


    //create cart_items


        const add_val = async(item) => {
            if(token){
                console.log("add");
                 /* if ( !item["val"]  || item["val"] == 0) {
                  const val_response = await axios.post(url+"/api/cartItem/val", {itemId: item["_id"], val: 1}, {headers: {token}} );
                  if( val_response.data.success){
                    setMain_cart(val_response.data.cartItem)
                    console.log("val is succefully added")
                    console.log(val_response.data.cartItem)
                  }
                  
                } 
                else {
                
                  let k = item["val"] + 1;
                  const val_response = await axios.post(url+"/api/cartItem/val", {itemId: item["_id"], val: k}, {headers: {token}} );
                  if( val_response.data.success){
                    setMain_cart(val_response.data.cartItem)
                    console.log("val is succefully added")
                    console.log(val_response.data.cartItem)
                  }   
                }  */

                    let v= item["val"] +1;
                  const val_response = await axios.post(url+"/api/cartItem/val", {itemId: item["_id"], val: v}, {headers: {token}} );
                  if( val_response.data.success){
                    setMain_cart(val_response.data.cartItem)
                    console.log("val is succefully added")
                    console.log(val_response.data.cartItem)
                  }


        
               
                
        
            }else{
              
              console.log("add");
            const updatedData = Object.assign({}, main_cart);
                item["val"]+=1

                console.log(updatedData)
            
                setMain_cart(updatedData);

              
              
               
        
            }
            
          };


          const handleInputChange = async (item, newQuantity) => {
    
            if(token){
               let k= parseInt(newQuantity);
                  const val_response = await axios.post(url+"/api/cartItem/val", {itemId: item["_id"], val: k}, {headers: {token}} );
                  if( val_response.data.success){
                      console.log("val is succefully changed")
                      setMain_cart(val_response.data.cartItem)
                  }
        
                  if (isNaN(k)) {
        
                    console.log("nan");
                    const val_response = await axios.post(url+"/api/cartItem/val", {itemId:item["_id"], val: 0}, {headers: {token}} );
                    if( val_response.data.success){
                        console.log("val is succefully changed")
                        setMain_cart(val_response.data.cartItem)
                    }
                  } 

                    
            
            
                }
                
            else{
                const updatedData = Object.assign({}, main_cart);
                console.log(newQuantity)
               
                if(newQuantity === '' || isNaN(newQuantity)){
                    item["val"]=0;
                   
        
                }else{
                    item["val"]=parseInt(newQuantity);
                  }
                console.log(updatedData)
                  
                setMain_cart(updatedData);
                  
            }
        
                  
            
            
          };
        
        
          
        
        
          const subtract_val = async(item) => {
                if(token){
                    console.log("sub");
        
                     if (item["val"] > 0) {
                      
                      let k= item["val"] - 1;
                      const val_response = await axios.post(url+"/api/cartItem/val", {itemId: item["_id"], val: k}, {headers: {token}} );
                      if( val_response.data.success){
                        console.log("val is succefully added"+ val_response.data)
                        setMain_cart(val_response.data.cartItem)
                      }
                    } 
                    
                    /* else {
                      const val_response = await axios.post(url+"/api/cartItem/val", {itemId: item["_id"], val: 0}, {headers: {token}} );
                      if( val_response.data.success){
                        console.log("val is succefully added"+ val_response.data)
                        setMain_cart(val_response.data.cartItem)
                      }
                    }  */
        
        
                }else{
                    const updatedData = Object.assign({}, main_cart);
                    item["val"]-=1
                
                    console.log(updatedData)
                  
                    setMain_cart(updatedData);
                }
            
          };
        
    

  

// function to excute whenever the web page is loaded

    useEffect(()=>{    
         async function loadData() {
            await fetchFood_items();

            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))  
            } 
        }

        loadData();
        
    },[])

    useEffect(()=>{
        price_calculator();
    },[main_cart])

    


    const contextValue = {
        menu_list,
        food_items,
        drink_list,
        item,
        assets,
        cartItems,
        setCartItems,
        addToCart,
        update_cart,
        sub,
       // update_each_item_price,
        popup,
        setPopup,
        remove_directly_from_cart_store,
        token, setToken,
        url,
        user_ID, setUser_ID,
        cartData_copy, setCartData_copy,
        price_calculator,
        main_cart, setMain_cart,
        setSub,
        add_val, subtract_val, handleInputChange,
        
       
        
       
        
        
       
    }


    

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider