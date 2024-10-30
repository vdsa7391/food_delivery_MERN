import orderModel from "../models/orderModel.js";
import userModel from "../models/model_user.js";
import Stripe from "stripe"



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing user orser from frontend



const placeOrder = async(req,res)=>{

    const frontend_url = "https://food-delivery-mern-1-front.onrender.com" 

    try {
       
        const newOrder= new orderModel({
            //userId: req.body.userId,
            address: req.body.address,
            items: req.body.items,
            amount: req.body.amount
            
            
        })
        await newOrder.save();
        console.log(newOrder)
        //await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}} ) 
       
        let main_cart = req.body.items;
        const line_items= [];
        Object.keys(main_cart).map((item, index)=>{

            let entry= 
            {
                "price_data":{
                    "currency":"eur",
                    "product_data":{
                        "name": main_cart[item]["title"]
                    },
                    "unit_amount": main_cart[item]["price"]*100
                },
                "quantity": main_cart[item]["count"]
    
            }
            console.log(entry)
            line_items.push(entry)

        })
        console.log(line_items) 
            

           

        let delivery_flag= req.body.address["delivery_flag"];

        if(delivery_flag.localeCompare("true")){

            line_items.push({
                "price_data":{
                    "currency":"eur",
                    "product_data":{
                        "name":"Delivery_charges"
                    },
                    "unit_amount": 5*100
                },
                "quantity": 1
    
            }) 
        }  

         

 
        const session= await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        }) 
        
        res.json({success:true, session_url: session.url , newOrder })



    } catch (error) {
        console.log(error)
        res.json({success: false, message: "error in placing order"})
        
    }

}


const verifyOrder = async(req,res)=>{
    const {orderId, success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not paid"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"error in verifying"})
        
    }

}


// user orders for fronted

const userOrders = async(req,res)=>{

    try {
        const orders = await orderModel.find({userId: req.body.userId})
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error)
        res.json({success: true, message:"error in getting user orders"})
    }

}



// list orders for admin panel

const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "error in getting all orders"})
    }

}


// api for updating status

const updateStatus = async(req,res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "status updated"});
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "error in updating status"})
        
    }

}



const clear_cartData = async(req, res)=>{
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartItem = await userData.cartItem;
        let cartData = await userData.cartData;
        cartData= {};
        cartData["total"]=0;
        cartData["count"]=0;
        cartItem={};
        await userModel.findByIdAndUpdate(req.body.userId, {cartData, cartItem} ) 
        res.josn({success:true,message:"cartdata removed"})

        
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "error in deleting cartData"})
        
        
    }

}

export {placeOrder, verifyOrder,userOrders ,listOrders,updateStatus, clear_cartData }
