import mongoose from "mongoose";



const user_schema = new mongoose.Schema({
    user_id: {type:String, required:true},
    password: {type:String, required:true},
    dob: {type:String},
    cartData:{type:Object, default:{}},
    cartItem: {type:Object, default:{}}
    
},{minimize:false})

const userModel = mongoose.models.user_model  || mongoose.model("user_model", user_schema)

export default userModel;