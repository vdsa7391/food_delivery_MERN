import userModel from '../models/model_user.js'


// add to cart
const addToCart= async (req,res)=>{

    try {
        
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }else{
            cartData[req.body.itemId]+=1;
        }

        await userModel.findOneAndUpdate({_id: req.body.userId}, {cartData})
        res.json({success:true, message:"Item Succesfully added", cartData: {cartData}})




    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error in adding item to cart"})
        
    }

}


// add to cart
const removeToCart= async (req,res)=>{

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        let index= req.body.itemId
        delete cartData[index]; 
     
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Item Succesfully removed", cartData: {cartData}})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error in removing item to cart"})
    }

}


// add to cart
const getCart= async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error in showing cart"})
    }

}



const update_cart = async(req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        cartData[req.body.itemId]= req.body.val
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success:true, cartData: {cartData}})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error in updating cart"})
    }
}


export {addToCart, removeToCart, getCart, update_cart};

