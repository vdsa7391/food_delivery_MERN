import mongoose from "mongoose";


const foodSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String},
    price: {type:Number, required:true},
    image: {type:String},
    category:{type:String, required:true}


})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;