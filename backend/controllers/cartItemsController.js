import userModel from '../models/model_user.js'
import foodModel from '../models/foodModel.js';


// add cart item

const add_cartItem = async(req,res)=>{
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartItem = await userData.cartItem;
        let f_item= await foodModel.findById(req.body.itemId);
   

        if(!cartItem[req.body.itemId]){
            
            cartItem[req.body.itemId]=f_item; 
           
        }
 
        await userModel.findOneAndUpdate({_id: req.body.userId}, {cartItem})  
        res.json({success:true, message:"Item Succesfully added", cartItem: cartItem})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error in adding cartItem"})
    }



}


const add_quantity = async(req,res)=>{
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartItem = await userData.cartItem;
        let cartData = await userData.cartData;

        let quantity = cartData[req.body.itemId];
        cartItem[req.body.itemId]["count"]= quantity;
        cartItem[req.body.itemId]["val"]= quantity;
        await userModel.findOneAndUpdate({_id: req.body.userId}, {cartItem})
        res.json({success:true, message:"count added", cartItem: cartItem})

        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error in adding count"})
        
    }

}



const add_val = async( req,res)=>{
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartItem = await userData.cartItem;
        let value = req.body.val;
        let food_id = req.body.itemId;
        cartItem[food_id]["val"]= value;

        await userModel.findOneAndUpdate({_id: req.body.userId}, {cartItem})
        res.json({success:true, message:"val added", cartItem: cartItem})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error in adding val"})
        
    }

}



const remove_cartItem = async(req,res)=>{
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartItem = await userData.cartItem;
        let cartData = await userData.cartData;
        let food_id = req.body.itemId;
        delete cartItem[food_id]
        delete cartData[food_id]
        await userModel.findOneAndUpdate({_id: req.body.userId}, {cartItem, cartData})
        
        res.json({success:true, message:"cartItem removed", cartItem: cartItem})
        
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error in deleting cartItem"})
    }


    
}


const update_cartItem = async(req,res)=>{
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartItem = await userData.cartItem;
        let cartData = await userData.cartData;
        Object.keys(cartItem).forEach( food_id  => {
            if(cartItem[food_id]["val"]){
                let count= cartItem[food_id]["val"];
                cartData[food_id]= count;
                cartItem[food_id]["count"]=count;
                //cartItem[food_id]["val"]=0;
                
            }
        })
        await userModel.findOneAndUpdate({_id: req.body.userId}, {cartItem, cartData})
        res.json({success:true, message:"cartItem and cart data updated", cartItem: cartItem})

        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error in updatating cartItem and cart data"})
        
    }

    
}


const calculate_price = async(req, res)=>{
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartItem = await userData.cartItem;
        let cartData = await userData.cartData;
        let price=0;
        let count=0;
        Object.keys(cartItem).forEach( food_id  => {
            price+= cartItem[food_id]["count"]*cartItem[food_id]["price"];
            count+=cartItem[food_id]["count"];
        });
        cartData['total']=price;
        cartData['quantity']=count;
        
        await userModel.findOneAndUpdate({_id: req.body.userId}, {cartData})
        res.json({success:true, message:"total calculated suceesully", cartData, cartItem})

        

    } catch (error) {
        console.log(error)
        res.json({success:false, message:"total can't calculated"+ price});
        
        
    }

}


const get_cartItem = async(req,res)=>{
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartItem = await userData.cartItem;
        res.json({success:true, message:"cartItem list", cartItem: cartItem})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error in getting cartItems"})
        
    }

}


export {add_cartItem, remove_cartItem, update_cartItem, add_quantity, add_val, calculate_price, get_cartItem};